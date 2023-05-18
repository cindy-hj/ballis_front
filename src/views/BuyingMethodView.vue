<template>
    <div class="common_mt160">
        <div class="container" id="wrap" v-if="state.row.length > 0">
            <div class="head d-flex align-items-center">
                <img :src="state.row[0].imagePath" class="head_img">
                <div class="d-flex flex-column ml-3">
                    <p style="font-weight: bold;">{{ state.row[0].modelNumber }}</p>
                    <p>{{ state.row[0].productEngName }}</p>
                    <p style="color: #aeaeae;">{{ state.row[0].productKorName }}</p>
                    <p>{{ state.size }}</p>
                </div>
                <hr />
            </div>
            <div class="body">
                <p>즉시 구매가</p>
                <p v-if="state.row[0].sellWishPrice">{{ state.row[0].sellWishPrice }}원</p>
                <p v-else>- 원</p> 
                <p>즉시 판매가</p>
                <p v-if="state.row[0].buyWishPrice">{{ state.row[0].buyWishPrice }}원</p>
                <p v-else>- 원</p> 
                <button @click="state.type = 'bid'">구매 입찰</button>
                <button :disabled="state.onlyBid" @click="state.type = 'normal'">즉시 구매</button>
                
                <!-- 즉시 구매 -->
                <div v-show="state.type === 'normal'">
                    <p>즉시 구매가</p>
                    <p>{{ state.row[0].sellWishPrice }}원</p>
                    <p>총 결제금액은 다음 화면에서 계산됩니다.</p> 
                    <hr />
                    <p>총 결제 금액</p>
                    <p>다음 화면에서 확인</p>
                    <p><button @click="handleNext('normal')">즉시 구매 계속</button></p>
                </div>      

                <!-- 구매 입찰 -->
                <div v-show="state.type === 'bid'">
                    <p>구매 희망가</p>
                    <div>
                        <input type="text" v-model="state.inputValue" @input="handleInput" />
                        <p v-if="state.errorMessage">{{ state.errorMessage }}</p>
                    </div>

                    <p>총 결제금액은 다음 화면에서 계산됩니다.</p> 
                    <hr />
                    <p>입찰 마감기한</p>
                    <p>
                        {{ state.days }}일 ({{ state.formattedDate }}마감)
                        <button @click="handleDate(1)">1일</button>
                        <button @click="handleDate(3)">3일</button>
                        <button @click="handleDate(7)">7일</button>
                        <button @click="handleDate(30)">30일</button>
                        <button @click="handleDate(60)">60일</button>
                    </p>
                    <hr />
                    <p>총 결제 금액</p>
                    <p>다음 화면에서 확인</p>
                    <p><button :disabled="!state.inputValue || state.errorMessage.length > 0"
                        @click="handleNext('bid')">구매 입찰 계속</button></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { onMounted, reactive, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    setup () {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();

        const state = reactive({
            productid: Number(route.query.productid),
            size : Number(route.query.size),
            type : route.query.type,
            row : [],
            onlyBid : false,

            inputValue : '',
            errorMessage : '',
            
            days : 30,
            date : null,
            formattedDate : null,

            // item : ''
        })

        watchEffect(() => {
            // state.item = store.getters.getSelectedItem;
            if(state.type === "normal") {
                state.inputValue = '';
                state.errorMessage = '';
            }
        });
        
        const handleDate = (days) => {
            state.days = days;
            const now = new Date();
            const dateAfterDays = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
            state.date = dateAfterDays;

            const yyyy = state.date.getFullYear();
            const mm = String(state.date.getMonth() + 1).padStart(2, '0');
            const dd = String(state.date.getDate()).padStart(2, '0');
            state.formattedDate = `${yyyy}/${mm}/${dd}`;
        };

        const handleInput = (event) => {
            const input = event.target.value;
            const regex = /^[0-9]*$/;

            if (regex.test(input)) {
                state.inputValue = input;
                
                if (state.inputValue< 30000) {
                    state.errorMessage = '3만원 이상 입력 가능합니다.';
                } else if (state.inputValue % 1000 !== 0) {
                    state.errorMessage = '1000 단위로 입력 가능합니다.';
                } else {
                    state.errorMessage = '';
                }

            } else {
                state.inputValue = input.replace(/[^\d]/g, '')
                state.errorMessage = '숫자만 입력 가능합니다.';
            }

        };


        const handleNext = (type) => {
            // 유효성 검사 통과
            if(state.errorMessage.length === 0) {
                // store에 구매입찰 가격, 마감기한 보관
                store.commit('setSelectedPrice', state.inputValue)
                store.commit('setSelectedDate', state.date)
                store.commit('setSelectedFormattedDate', state.formattedDate)
                store.commit('setSelectedDays', state.days)
                
                router.push({
                    path : '/buying/payment',
                    query : {
                        productid: state.productid,
                        size : state.size,
                        type : type
                    }
                })
            }
        }

        const handleData = async() => {
            try {
                const res = await axios.get(`/api/get/product/method?productid=${state.productid}&size=${state.size}`);
                const filteredData = res.data.filter(item => item.sellProductSize === state.size);
                
                if(filteredData.length > 0) { // query와 일치하는 사이즈 데이터 존재 -> 즉시 구매
                    state.row = filteredData;
                    console.log("즉시구매", state.row)
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
            handleDate(30);
        })

        return {
            state,
            handleNext,
            handleInput,
            handleDate,
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