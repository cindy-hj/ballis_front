<template>
    <!-- 모달영역 -->
    <delivery-modal v-if="showModal" @close="showModal = false"/>
    <div class="common_mt160">
        <!-- 즉시판매 -->
        <div class="container" id="wrap" v-if="state.type === 'normal'">
            <div class="head d-flex align-items-center">
                <img :src="state.item.imagePath" class="head_img">
                <div class="d-flex flex-column ml-3">
                    <p style="font-weight: bold;">{{ state.item.modelNumber }}</p>
                    <p>{{ state.item.productEngName }}</p>
                    <p style="color: #aeaeae;">{{ state.item.productKorName }}</p>
                    <p>{{ state.size }}</p>  
                </div>
            </div>
            <h4>판매 정산 계좌</h4>
            <p><button @click="showModal = true">계좌 추가</button></p>
            <hr />
            <h4>반송 주소</h4>
            <p><button @click="showModal = true">주소 추가</button></p>
            <hr />
            <h4>발송 방법</h4>
            <div>
                <p>택배발송 선불</p>
            </div>
            <hr />
            <h4>최종 주문 정보</h4>
            <h5>총 정산 금액</h5>
            <div>
                <h5>{{ Math.floor(Number(state.item.buyWishPrice) - Number(state.item.buyWishPrice*0.02)) }}원</h5>
                <hr />
                <p>즉시 판매가</p>
                <p>{{ Number(state.item.buyWishPrice) }}원</p>
                <p>검수비</p>
                <p>무료</p>
                <p>수수료</p>
                <p>{{ -Math.floor(Number(state.item.buyWishPrice*0.02)) }}원</p>
                <p>배송비</p>
                <p>선불, 판매자 부담</p>
            </div>
            <hr />
            <h4>결제 방법</h4>
            <hr />
            <h4>현금영수증 정보?</h4>
            <hr />
            <h4>판매 조건 확인</h4>
            <button @click="handleSellNow">즉시 판매하기</button>
        </div>

        <!-- 판매입찰, 보관판매 -->
        <div class="container" id="wrap" v-if="state.row[0]">
            <div class="head d-flex align-items-center">
                <img :src="state.row[0].imagePath" class="head_img">
                <div class="d-flex flex-column ml-3">
                    <p style="font-weight: bold;">{{ state.row[0].modelNumber }}</p>
                    <p>{{ state.row[0].productEngName }}</p>
                    <p style="color: #aeaeae;">{{ state.row[0].productKorName }}</p>
                    <p>{{ state.size }}</p>
                </div>
            </div>
            <div v-if="state.type === 'bid'">
                <h4>판매 정산 계좌</h4>
                <p><button @click="showModal = true">계좌 추가</button></p>
                <hr />
                <h4>반송 주소</h4>
                <p><button @click="showModal = true">주소 추가</button></p>
                <hr />
                <h4>발송 방법</h4>
                <div>
                    <p>택배발송 선불</p>
                </div>
                <hr />
                <h4>최종 주문 정보</h4>
                <h5>총 정산 금액</h5>
                <div>
                    <h5>{{ Math.floor(state.bidPrice - state.bidPrice*0.02) }}원</h5>
                    <hr />
                    <p>판매 희망가</p>
                    <p>{{ state.bidPrice }}</p>
                    <p>검수비</p>
                    <p>무료</p>
                    <p>수수료</p>
                    <p>{{ -Math.floor(state.bidPrice*0.02) }}원인데 최대 30만원이로구만...</p>
                    <p>배송비</p>
                    <p>선불, 판매자 부담</p>
                    <hr />
                    <p>입찰 마감 기한</p>
                    <p>{{ state.bidDays }}일 - {{ state.bidFormattedDate }} 까지</p>
                </div>
                <hr />
                <h4>결제 방법</h4>
                <hr />
                <h4>현금영수증 정보?</h4>
                <hr />
                <h4>판매 조건 확인</h4>
                <button @click="handleSellLater">판매 입찰하기</button>
            </div>
            <div v-if="state.type ==='keep'">
                <h4>판매 정산 계좌</h4>
                <p><button @click="showModal = true">계좌 추가</button></p>
                <hr />
                <h4>반송/회수 주소</h4>
                <p><button @click="showModal = true">주소 추가</button></p>
                <hr />
                <h4>발송 방법</h4>
                <div>
                    <p>택배발송 선불</p>
                </div>
                <hr />
                <h4>페널티 기준 금액</h4>
                <div>
                    <p>신청 직전월의 평균 거래가</p>
                </div>
                <hr />
                
                <h4>최종 신청 정보</h4>
                <h5>총 정산 금액</h5>
                <div>
                    <h5>{{ Math.floor(state.bidPrice - state.bidPrice*0.02) }}원</h5>
                    <hr />
                    <p>판매 희망가</p>
                    <p>{{ state.bidPrice }}</p>
                    <p>검수비</p>
                    <p>무료</p>
                    <p>수수료</p>
                    <p>{{ -Math.floor(state.bidPrice*0.02) }}원인데 최대 30만원이로구만...</p>
                    <p>배송비</p>
                    <p>선불, 판매자 부담</p>
                    <hr />
                </div>
                <h5>총 결제 금액</h5>
                <div>
                    <h5 >3000원</h5>
                    <hr />
                    <p>창고 이용료</p>
                    <p>3000원</p>
                    <p>30일마다 월 3000원/건 자동 결제</p>
                    <p>보관 기한</p>
                    <p>{{ state.bidDays }}일 - {{ state.bidFormattedDate }} 까지</p>
                </div> 
                <hr />
                <h4>결제 방법</h4>
                <hr />
                <h4>보관판매 조건 확인</h4>
                <button @click="handleSellLater">결제하기</button>
            </div>
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
            item : '',
            
            row : [],
            sellingStatus : null,
            buyingStatus : null,
            
            bidPrice : 0,
            bidDate : '',
            bidFormattedDate : '',
            bidDays : '',

        })
        

        watchEffect(() => {
            state.item = store.getters.getSelectedItem;
            state.bidPrice = Number(store.getters.getSelectedPrice);
            state.bidDate = store.getters.getSelectedDate;
            state.bidFormattedDate = store.getters.getSelectedFormattedDate;
            state.bidDays = store.getters.getSelectedDays;
        });

        // 즉시판매 - 결제테이블
        const handleSellNow = async() => {
            // 유효성 검사 통과 > 구매 조건 확인 all check
            // if(state.errorMessage.length === 0) { 
                try {
                    const url = `/api/post/contract/buy?type=${state.type}`;
                    const headers = {"Content-Type":"application/json"};
                    const body = {
                        productId : state.productid,
                        buyingId : state.item.buyingId,
                        sellingId : null,
                        buyerNumber : state.item.buyerNumber, 
                        sellerNumber : 1, // 로그인 구현 후 수정
                        price : state.item.buyWishPrice,
                        productSize : state.size	
                    }
                    const res = await axios.post(url, body, {headers});
                    console.log("보냄", res);
 
                } catch(err) {
                    console.error(err);
                }
                    
                router.push({
                    path : '/selling/complete',
                    query : {
                        productid: state.productid,
                        type : state.type
                    }
                })
            // }
        }


        // 판매입찰, 보관판매 - 판매테이블
        const handleSellLater = async() => {
            // 유효성 검사 통과 > 구매 조건 확인 all check
            // if(state.errorMessage.length === 0) { 
    
                try {
                    const url = `/api/post/sell?type=${state.type}`;
                    const headers = {"Content-Type":"application/json"};
                    const body = {
                        memberNumber : 1, // 로그인 구현 후 수정
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
                    path : '/selling/complete',
                    query : {
                        productid: state.productid,
                        type : state.type
                    }
                })
            // }
        }


        // 판매 입찰, 보관 판매 시 데이터 필요
        if(state.type === 'bid' || state.type === 'keep') {
            const handleData = async() => {
                try {
                    const res = await axios.get(`/api/get/product/one?productid=${state.productid}`);
                    state.row = res.data;
                    console.log("판매입찰이나 보관판매", state.row)
                } catch (err) {
                    console.error(err);
                }
            }

            onMounted(()=>{
                handleData();
            })
        }



        return {
            state,
            showModal,
            handleSellNow,
            handleSellLater,
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