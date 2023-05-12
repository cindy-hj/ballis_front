<template>
    <div class="common_mt160">
        <div class="container" id="wrap" v-if="state.forInfo">
            <div class="head d-flex align-items-center">
                <img :src="state.forInfo.imagePath" class="head_img">
                <div class="d-flex flex-column ml-3">
                    <p style="font-weight: bold;">{{ state.forInfo.modelNumber }}</p>
                    <p>{{ state.forInfo.productEngName }}</p>
                    <p style="color: #aeaeae;">{{ state.forInfo.productKorName }}</p>
                    <p v-if="state.rowFast.length > 0"><button class="fast_small">빠른배송</button></p>
                </div>
            </div>
            <hr />
            <div class="body">
                <div class="size_list">
                    <button class="button_size" v-for="size in state.sizes" :key="size" @click="handleMethod(size)">
                        <div class="button_size_body1">{{ size }}</div>
                        <div v-for="(tmp, i) in state.rowFast" :key="i">
                            <div v-if="tmp.sellProductSize === size" class="button_size_body2">
                                <button id="fast_small_icon">빠</button>
                            </div>
                        </div>
                        <div v-for="(tmp, i) in state.rowCheaper" :key="i">
                            <div v-if="tmp.sellProductSize === size">
                                <div class="button_size_body3">{{ tmp.sellWishPrice }}</div>
                            </div>
                        </div> 
                    </button>
                </div>

                <div class="shipping_method" v-show="state.showMethod">
                    <hr />

                    <div class="shipping_method_body" v-show="state.methodSelect === 1">
                        <div v-for="(tmp, i) in state.rowFast" :key="i">
                            <button v-if="tmp.sellProductSize === state.size" @click="handleFast(state.size, tmp)">
                                <p>{{ tmp.sellWishPrice }}</p>
                                <p>빠른배송</p>
                            </button>
                        </div>  
                        <div v-for="(tmp, i) in state.rowNormal" :key="i">
                            <button v-if="tmp.sellProductSize === state.size" @click="handleType(state.size, 'normal', tmp)">
                                <p>{{ tmp.sellWishPrice }}</p>
                                <p>일반배송</p>
                            </button>
                        </div>
                    </div>

                    <div class="shipping_method_body" v-show="state.methodSelect === 2">
                        <div v-for="(tmp, i) in state.rowFast" :key="i">
                            <button v-if="tmp.sellProductSize === state.size" @click="handleFast(state.size, tmp)">
                                <p>{{ tmp.sellWishPrice }}</p>
                                <p>빠른배송</p>
                            </button>
                        </div>
                    </div>
                    <div class="shipping_method_body" v-show="state.methodSelect === 3">
                        <div v-for="(tmp, i) in state.rowNormal" :key="i">
                            <button v-if="tmp.sellProductSize === state.size" @click="handleType(state.size, 'normal', tmp)">
                                <p>{{ tmp.sellWishPrice }}</p>
                                <p>일반배송</p>
                            </button>
                        </div>
                    </div>
                    <div class="shipping_method_body" v-show="state.methodSelect === 4">
                        <button @click="handleType(state.size, 'bid')">
                            <p>구매입찰</p>
                        </button>                        
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
    setup () {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();

        const state = reactive({
            productid : Number(route.query.productid),
            rowFast : [],
            rowNormal : [],
            rowBoth : [],
            rowCheaper : [],
            forInfo : '',

            sizes : [],
            showMethod : false,
            methodSelect : 0,
            size : 0,
        })


        const handleFast = (size, tmp) => {
            store.commit('setSelectedItem', tmp)
            router.push({
                path : '/buying/payment',
                query : {
                    productid: state.productid,
                    size : size,
                    type : 'fast'
                }
            })
        }

        const handleType = (size, type, tmp) => {
            store.commit('setSelectedItem', tmp)
            router.push({
                path : '/buying/method',
                query : {
                    productid: state.productid,
                    size : size,
                    type : type
                }
            })
        }


        const handleData = async() => {
            try {
                const res = await axios.get(`/api/get/product/buy?productid=${state.productid}`);
                console.log('상품한개', res.data);
                state.rowFast = res.data.fast; // 빠른배송
                state.rowNormal = res.data.normal; // 일반배송
                state.rowBoth = res.data.both; // 둘 중 더 저렴한 데이터
                state.rowCheaper = res.data.cheaper; // 둘 중 더 저렴한 데이터, 둘 중 하나만 존재시 그 데이터
                console.log("빠른배송", state.rowFast)
                console.log("일반배송", state.rowNormal)
                console.log("둘중 저렴", state.rowBoth)
                console.log("사이즈별 가장 저렴", state.rowCheaper)

                state.forInfo = state.rowCheaper[0] // 항상 존재 -> 대표 정보 출력
                // console.log("인포용",state.forInfo);
                
                
                // 전체 사이즈 나열
                for(let i = state.forInfo.sizeMin; i <= state.forInfo.sizeMax; i += state.forInfo.sizeUnit) {
                    state.sizes.push(i);
                }

            } catch (err) {
                console.error(err);
            }
        }

        
        const handleMethod = (size) => {
            let hasMatchingSize = false;

            // 빠른배송, 일반배송 모두 존재
            if(state.rowBoth) {                
                for (let i = 0; i < state.rowBoth.length; i++) {
                    if (state.rowBoth[i].sellProductSize === size) {
                        state.size = size;
                        state.methodSelect = 1;
                        hasMatchingSize = true;
                        break;
                    }
                }
            }

            // 빠른배송만 존재
            if (!hasMatchingSize) {
                for (let i = 0; i < state.rowFast.length; i++) {
                    if (state.rowFast[i].sellProductSize === size) {                        
                        state.size = size;
                        state.methodSelect = 2;
                        hasMatchingSize = true;
                        break;
                    }
                }
            }

            // 일반배송만 존재
            if (!hasMatchingSize) {
                for (let i = 0; i < state.rowNormal.length; i++) {
                    if (state.rowNormal[i].sellProductSize === size) {
                        state.size = size;
                        state.methodSelect = 3;
                        hasMatchingSize = true;
                        break;
                    }
                }
            }

            // 판매상품 존재 x -> 구매입찰
            if (!hasMatchingSize) {
                state.size = size;
                state.methodSelect = 4;
            }
            
            state.showMethod = true;
        }

        onMounted (()=> {
            handleData();
        })

        return {
            state,
            handleMethod,
            handleFast,
            handleType
        }
    }
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";
#wrap {
    border: 1px solid #cccccc;
    width: 800px;
}

.head_img{
    width: 150px;
    height: 150px;
    margin: 5px;
    border-radius: 10px;
}
.head p{
    margin: 1px 8px;
}
.fast_small{
    width: 70px;
    height: 30px;
    font-size: 12px;
    color: rgb(54, 186, 94);
    background-color: rgb(239, 255, 250);
    border: none;
}

.size_list{
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
}
.button_size{
    width: 230px;
    height: 70px;
    border: 1px solid #cccccc;
    border-radius: 10px;
    background-color: #ffffff;
    margin: 7px;
}
.button_size_body2{
    display: inline-block;
    margin: 0 5px;
}
.button_size_body3{
    display: inline-block;
}
#fast_small_icon{
    width: 30px;
    height: 30px;
    font-size: 12px;
    color: rgb(54, 186, 94);
    background-color: rgb(239, 255, 250);
    border: none;
}
</style>