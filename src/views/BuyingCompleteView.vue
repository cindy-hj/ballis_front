<template>
    <div class="common_mt160">
        <div v-if="state.type === 'fast'" class="container" id="wrap">
            <div class="top d-flex flex-column align-items-center justify-content-center">
                <div class="top_info">
                    <h3>구매가 완료되었습니다.</h3>
                    <p>구매한 상품은 자정전까지 결제한건에 대하여</p>
                    <p>다음날 즉시 출고될 예정입니다.</p>                
                </div>
                <div>
                    <img :src="state.item.imagePath" class="top_img" />
                </div>
                <div class="top_btn">
                    <button>내역 상세보기</button>
                    <a href="/product/list"><button>SHOP 바로가기</button></a>
                </div>
                <div>
                    <p>구매는 취소가 불가능합니다.</p>
                </div>
            </div>
            <div class="bottom">
                <h5>총 결제 금액</h5>
                <div>
                    <h5>{{ state.item.sellWishPrice + state.item.sellWishPrice*0.015 + 5000 }}원</h5>
                    <hr />
                    <p>구매가</p>
                    <p>{{ state.item.sellWishPrice }}</p>
                    <p>검수비</p>
                    <p>무료</p>
                    <p>수수료</p>
                    <p>{{ state.item.sellWishPrice*0.015 }}</p>
                    <p>배송비</p>
                    <p>5,000원</p>
                </div>
                <hr />
            </div>
        </div>
        <div v-if="state.type === 'normal'" class="container" id="wrap">
            <div class="top d-flex flex-column align-items-center justify-content-center">
                <div class="top_info">
                    <h3>즉시 구매가 완료되었습니다.</h3>
                    <p>구매한 상품은 전문가의 검수 완료 후,</p>
                    <p>안전하게 배송될 예정입니다.</p>
                </div>
                <div>
                    <img :src="state.item.imagePath" class="top_img" />
                </div>
                <div class="top_btn">
                    <button>내역 상세보기</button>
                    <a href="/product/list"><button>SHOP 바로가기</button></a>
                </div>
                <div>
                    <p>즉시 구매는 취소가 불가능합니다.</p>
                </div>
            </div>
            <div class="bottom">
                <h5>총 결제 금액</h5>
                <div>
                    <h5>{{ state.item.sellWishPrice + state.item.sellWishPrice*0.015 + 3000 }}원</h5>
                    <hr />
                    <p>즉시 구매가</p>
                    <p>{{ state.item.sellWishPrice }}</p>
                    <p>검수비</p>
                    <p>무료</p>
                    <p>수수료</p>
                    <p>{{ state.item.sellWishPrice*0.015 }}</p>
                    <p>배송비</p>
                    <p>3,000원</p>
                </div>
                <hr />
            </div>
        </div>
        <div v-if="state.type === 'bid' && state.row[0]" class="container" id="wrap">
            <div class="top d-flex flex-column align-items-center justify-content-center">
                <div class="top_info">
                    <h3>구매 입찰이 완료되었습니다.</h3>
                    <p>결제는 거래가 성사되는 시점에</p>
                    <p>등록하신 결제 정보로 자동 처리 됩니다.</p>                    
                </div>
                <div>
                    <img :src="state.row[0].imagePath" class="top_img" />
                </div>
                <div class="top_btn">
                    <button>내역 상세보기</button>
                    <a href="/product/list"><button>SHOP 바로가기</button></a>
                </div>
                <div>
                    <p>'구매내역>입찰 중'상태일 때는 입찰 지우기가 가능합니다.</p>
                </div>
            </div>
            <div class="bottom">
                <h5>총 결제 금액</h5>
                <div>
                    <h5 >{{ state.bidPrice + state.bidPrice*0.03 + 3000 }}원</h5>
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
        
        // 구매 입찰 시 데이터 필요
        if(state.type === 'bid') {
            const handleData = async() => {
                try {
                    const res = await axios.get(`/api/get/product/one?productid=${state.productid}`);
                    state.row = res.data;
                    console.log("구매입찰", state.row)
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