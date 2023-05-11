<template>
    <!-- 모달영역 -->
    <delivery-modal v-if="showModal" @close="showModal = false"/>
    <div class="common_mt160">
        <div class="container" id="wrap" v-if="state.row.length > 0">
            <div class="head d-flex align-items-center">
                <img :src="state.row[0].imagePath" class="head_img">
                <div class="d-flex flex-column ml-3">
                    <p style="font-weight: bold;">{{ state.row[0].modelNumber }}</p>
                    <p>{{ state.row[0].productEngName }}</p>
                    <p style="color: #aeaeae;">{{ state.row[0].productKorName }}</p>
                    <p>{{ state.size }}</p>
                    <p v-if="state.row[0].inventoryDiv === 1"><button class="fast_small">빠른배송</button></p>
                </div>
            </div>

            <h4>배송 주소</h4>
            <p><button @click="showModal = true">주소 추가</button></p>
            <hr />

            

            <h4>배송 방법</h4>
            <div v-if="state.type === 'fast'">
                <p>빠른배송</p>
            </div>
            <div v-else>
                <p>일반배송</p>
            </div>
            <hr />
            
            <h4>최종 주문 정보</h4>
            <h5>총 결제 금액</h5>
            <div v-if="state.type === 'fast'">
                <h5>{{ state.sellPrice + state.sellPrice*0.015 + 5000 }}원</h5>
                <hr />
                <p>구매가</p>
                <p>{{ state.sellPrice }}</p>
                <p>검수비</p>
                <p>무료</p>
                <p>수수료</p>
                <p>{{ state.sellPrice*0.015 }}</p>
                <p>배송비</p>
                <p>5,000원</p>
            </div>
            <div v-if="state.type === 'normal'">
                <h5>{{ state.sellPrice + state.sellPrice*0.015 + 3000 }}원</h5>
                <hr />
                <p>즉시 구매가</p>
                <p>{{ state.sellPrice }}</p>
                <p>검수비</p>
                <p>무료</p>
                <p>수수료</p>
                <p>{{ state.sellPrice*0.015 }}</p>
                <p>배송비</p>
                <p>3,000원</p>
            </div>
            <div v-if="state.type === 'bid'">
                <h5 >{{ state.sellPrice + state.sellPrice*0.03 + 3000 }}원</h5>
                <hr />
                <p>구매 희망가</p>
                <p>{{ state.bidPrice }}</p>
                <p>검수비</p>
                <p>무료</p>
                <p>수수료</p>
                <p>{{ state.bidPrice*0.03 }}</p>
                <p>배송비</p>
                <p>3,000원</p>
                <hr />
                <p>입찰 마감 기한</p>
                <p>{{ state.bidDays }}일 - {{ state.bidFormattedDate }} 까지</p>
            </div> 
            <hr />

            <h4>결제 방법</h4>
            <hr />
            
            <h4>구매 조건 확인</h4>
            <button v-if="state.type === 'bid'" @click="handleNext">구매 입찰하기</button>
            <button v-else @click="handleNext">결제하기</button>
        </div>
    </div>
    
    

</template>

<script>
import DeliveryModal from '@/components/DeliveryModal.vue';
import axios from 'axios';
import { onMounted, reactive, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    components: {
        DeliveryModal
    },
    setup () {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();

        const showModal = ref(false);

        const state = reactive({
            productid: Number(route.query.productid),
            size : Number(route.query.size),
            type : route.query.type,
            
            row : [],
            sellPrice : 0,
            onlyBid : false,
            
            bidPrice : 0,
            bidDate : '',
            bidFormattedDate : '',
            bidDays : '',

        })

        watchEffect(() => {
            state.bidPrice = store.getters.getSelectedPrice;
            state.bidDate = store.getters.getSelectedDate;
            state.bidFormattedDate = store.getters.getSelectedFormattedDate;
            state.bidDays = store.getters.getSelectedDays;
        });

        const handleNext = async() => {
            // 유효성 검사 통과 > 구매 조건 확인 all check
            // if(state.errorMessage.length === 0) { 
    
                try {
                    const url = `/api/post/buy`;
                    const headers = {"Content-Type":"application/json"};
                    const body = {
                        memberId : 1, // 로그인 구현 후 수정
                        productId : state.productid,
                        productSize : state.size,
                        wishPrice : state.bidPrice,
                        expiryDate : new Date(state.bidDate).toISOString()
                    }
                    const res = await axios.post(url, body, {headers});
                    console.log("보냄", res);
                } catch(err) {
                    console.error(err);
                }
                    
                router.push({
                    path : '/buying/complete',
                    query : {
                        productid: state.productid,
                        type : state.type
                    }
                })
            // }
        }

        const handleData = async() => {
            try {
                const res = await axios.get(`/api/get/product/buy?productid=${state.productid}`);
                const filteredData = res.data.filter(item => item.sellProductSize === state.size);
                
                if(filteredData.length > 0) { // query와 일치하는 사이즈 데이터 존재 -> 즉시 구매
                    state.row = filteredData;
                    state.sellPrice = filteredData[0].sellWishPrice
                    console.log("빠른,즉시", state.row)
                } else { // else -> 구매입찰
                    state.row = res.data;
                    state.onlyBid = true;
                    console.log("구매입찰", state.row)
                }

            } catch (err) {
                console.error(err);
            }
        }

        onMounted(()=>{
            handleData();
        })

        return {
            state,
            showModal,
            handleNext
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

</style>