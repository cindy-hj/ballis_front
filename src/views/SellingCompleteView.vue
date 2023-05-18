<template>
    <div class="common_mt160">
        <!-- 즉시판매 -->
        <div v-if="state.type === 'normal'" class="container" id="wrap">
            <div class="top d-flex flex-column align-items-center justify-content-center">
                <div class="top_info">
                    <h3>즉시 판매가 완료되었습니다.</h3>
                    <p>일요일, 공휴일 제외 2일 이내에 아래 주소로 상품을 발송한 후,</p>
                    <p>'MY>판매 내역>진행 중'에서 발송정보를 입력하세요.</p>                
                </div>
                <div>
                    <img :src="state.item.imagePath" class="top_img" />
                </div>
                <div class="top_btn">
                    <button>판매내역 상세보기</button>
                    <a href="/product/list"><button>SHOP 바로가기</button></a>
                </div>
                <div>
                    <p>즉시 판매는 취소가 불가능합니다.</p>
                </div>
            </div>
            <div class="bottom">
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

                <h5>보내실 곳</h5>
                <p>부산광역시 부산진구 동성직업전문학교 A1프라자 6층</p>
            </div>
        </div>
        <!-- 판매입찰 -->
        <div v-if="state.type === 'bid' && state.row[0] " class="container" id="wrap">
            <div class="top d-flex flex-column align-items-center justify-content-center">
                <div class="top_info">
                    <h3>판매 입찰이 완료되었습니다.</h3>
                    <p>거래가 체결되고 상품이 검수에 합격한 후,</p>
                    <p>등록한 계좌로 정산이 진행됩니다.</p>
                </div>
                <div>
                    <img :src="state.row[0].imagePath" class="top_img" />
                </div>
                <div class="top_btn">
                    <button>판매내역 상세보기</button>
                    <a href="/product/list"><button>SHOP 바로가기</button></a>
                </div>
                <div>
                    <p>'판매내역>입찰 중'상태일 때는 입찰 지우기가 가능합니다.</p>
                </div>
            </div>
            <div class="bottom">
                <h5>총 정산 금액</h5>
                <div>
                    <h5>{{ Math.floor(state.bidPrice - state.bidPrice*0.02) }}원</h5>
                    <hr />
                    <p>판매 희망가</p>
                    <p>{{ state.bidPrice }}</p>
                    <p>검수비</p>
                    <p>무료</p>
                    <p>수수료</p>
                    <p>{{ -Math.floor(state.bidPrice*0.02) }}</p>
                    <p>배송비</p>
                    <p>선불, 판매자 부담</p>                   
                    <hr />
                    <p>입찰 마감 기한</p>
                    <p>{{ state.bidDays }}일 - {{ state.bidFormattedDate }} 까지</p>
                </div>
                <hr />
            </div>
        </div>
        <!-- 보관판매 -->
        <div v-if="state.type === 'keep' && state.row[0]" class="container" id="wrap">
            <div class="top d-flex flex-column align-items-center justify-content-center">
                <div class="top_info">
                    <h3>보관 신청이 완료되었습니다.</h3>
                    <p>일요일, 공휴일 제외 2일 이내에 아래 주소로 상품을 발송한 후,</p>
                    <p>'MY>보관 판매 내역>신청'에서 발송정보를 입력하세요.</p>                    
                </div>
                <div>
                    <img :src="state.row[0].imagePath" class="top_img" />
                </div>
                <div class="top_btn">
                    <button>발송요청 목록 보기</button>
                    <a href="/product/list"><button>SHOP 바로가기</button></a>
                </div>
                <div>
                    <p>신청일시 기준 1시간 이후 취소 시 결제금액이 환불되지 않습니다.</p>
                </div>
            </div>
            <div class="bottom">
                <h5>총 정산 금액</h5>
                <div>
                    <h5>{{ Math.floor(state.bidPrice - state.bidPrice*0.02) }}원</h5>
                    <hr />
                    <p>판매 희망가</p>
                    <p>{{ state.bidPrice }}</p>
                    <p>검수비</p>
                    <p>무료</p>
                    <p>수수료</p>
                    <p>{{ -Math.floor(state.bidPrice*0.02) }}원</p>
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
                    <p>30일마다 3000원/건 자동 결제</p>
                    <p>검수비</p>
                    <p>무료</p>
                    <p>배송비</p>
                    <p>선불, 판매자 부담</p>
                    <p>보관 기한</p>
                    <p>{{ state.bidDays }}일 - {{ state.bidFormattedDate }} 까지</p>
                    <hr />       
                </div> 

                <h5>보내실 곳</h5>
                <p>부산광역시 부산진구 동성직업전문학교 A1프라자 6층</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { onMounted, reactive, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {
    setup () {
        const route = useRoute();
        const store = useStore();
        
        const state = reactive({
            productid: Number(route.query.productid),
            type : route.query.type,

            item : '',
            row : [],

            bidPrice : 0,
            bidFormattedDate : '',
            bidDays : ''


        })

        watchEffect(() => {
            state.item = store.getters.getSelectedItem;
            state.bidPrice = Number(store.getters.getSelectedPrice);
            state.bidFormattedDate = store.getters.getSelectedFormattedDate;
            state.bidDays = store.getters.getSelectedDays;
        });
        
        // 판매입찰, 보관판매 시 데이터 필요
        if(state.type === 'bid' || state.type === 'keep') {
            const handleData = async() => {
                try {
                    const res = await axios.get(`/api/get/product/one?productid=${state.productid}`);
                    state.row = res.data;
                    console.log("판매입찰 또는 보관판매", state.row)
                } catch (err) {
                    console.error(err);
                }
            }

            onMounted(()=>{
                handleData();
            })
        }
        
        return {
            state
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
.top_info{
    text-align: center;
    margin: 20px;
}
.top_img{
    width: 300px;
    height: 300px;
    margin: 5px;
    border-radius: 10px;
}
.top p{
    margin: 1px 8px;
}
.top_btn {
    margin: 10px;
}

</style>