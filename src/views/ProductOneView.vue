<template>
    <div class="common_mt160">
        <div class="container">
            <div class="row">
                <div class="col" v-for="(tmp, i) in state.row" :key="i">
                    <img :src="tmp.imagePath" class="img-fluid">
                </div>
                <div class="col" v-for="(tmp, i) in state.row" :key="i">
                    <h4 style="font-weight: bold; text-decoration : underline;">{{ tmp.brandName }}</h4>
                    <h4>{{ tmp.productEngName }}</h4>
                    <p style="color: #aeaeae;">{{ tmp.productKorName }}</p>

                    <div class="product" id="product_size">
                        <span>사이즈</span>
                        <span style="float: right; font-size: 20px; font-weight: bold;">모든 사이즈</span>
                        <hr />
                    </div>
                    
                    <div class="product" id="product_price" v-if="tmp.price">
                        <span>최근거래가</span>
                        <span style="float: right; font-size: 25px; font-weight: bold;">{{ tmp.price }}원</span>
                    </div>
                    
                    <div class="product d-flex align-items-center justify-content-around gap-2 col-6 mx-auto " id="product_wish_price">
                        <button class="btn btn-primary btn-lg " type="button" id="wish_price_button" @click="handleBuying(state.productid)">
                            <span>구매</span>
                            <span v-if="tmp.sellWishPrice">
                                {{ tmp.sellWishPrice }}원
                                <p style="font-size: 15px;">즉시 구매가</p>
                            </span>
                        </button>
                        <button class="btn btn-secondary btn-lg" type="button" id="wish_price_button" @click="handleSelling(state.productid)">
                            <span>판매</span>
                            <span v-if="tmp.buyWishPrice">
                                {{ tmp.buyWishPrice }}원
                                <p style="font-size: 15px;">즉시 판매가</p>
                            </span>
                        </button>
                    </div>

                    <div class="product d-grid gap-2 col-13" id="product_wish">
                        <button type="button" class="btn btn-outline-success btn-lg">관심 상품</button>
                    </div>

                    <div class="product" id="product_info">
                        <h4>상품 정보</h4>
                        <hr />
                        <div class="product_info_body">
                            <div class="info_box">
                                <p>모델번호</p>
                                <p>{{ tmp.modelNumber }}</p>
                            </div>
                            <div class="info_box">
                                <p>출시일</p>
                                <p v-if="tmp.launchingDate">{{ tmp.launchingDate }}</p>
                                <p v-else>-</p>
                            </div>
                            <div class="info_box">
                                <p>컬러</p>
                                <p>{{ tmp.color }}</p>
                            </div>
                            <div class="info_box">
                                <p>발매가</p>
                                <p>{{ tmp.launchingPrice }}원</p>
                            </div>
                        </div>
                        <hr />
                    </div>

                    <div class="product" id="product_delivery">
                        <p>배송 정보</p>
                        <div v-if="tmp.inventoryDiv === 1">
                            <p>빠른배송 5,000원</p>
                            <p>지금 결제시 내일 __ 도착 예정</p>
                        </div>
                        <hr />
                        <p>일반배송 3,000원</p>
                        <p>검수 후 배송 ・ 5-7일 내 도착 예정</p>
                        <hr />
                        <p>창고보관 첫 30일 무료</p>
                        <p>배송 없이 창고에 보관 ・ 빠르게 판매 가능</p>
                        <hr />
                    </div>
                    
                    <div class="product" id="product_chart">
                        <h4>시세</h4>
                        <line-chart :product-id="state.productid"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="sec_review">
            <div class="review_title">
                <h4 style="font-weight: bold;">Review</h4>
                <h5 style="color: #aeaeae;">후기</h5>
            </div>
            <div class="review_list">
                <div class="review_main" v-for="(tmp, i) in state.reviewRows" :key="i">
                    <img v-if="tmp.mainImageDiv === 1" 
                        @click="state.showModal = true; 
                        state.reviewid=tmp.reviewId; 
                        state.productid=tmp.productId" 
                        :src="tmp.imagePath" class="review_main_img"
                    >
                </div>
            </div>      
            <!-- 모달 영역 -->  
            <review-modal v-if="state.showModal" 
                :review-id="state.reviewid" 
                :product-id="state.productid" 
                @close="state.showModal = false" 
            />
        </div>
    </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue'
import ReviewModal from '@/components/ReviewModal.vue'
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
    components: {
        LineChart,
        ReviewModal
    },
    setup () {
        
        const route = useRoute();
        const router = useRouter();

        const state = reactive({
            productid : Number(route.query.productid),
            row : [],
            showModal : false
        })

        const handleBuying = (id) => {
            router.push({path:"/buying/size", query:{productid:id}})
        }

        const handleSelling = (id) => {
            router.push({path:"/selling/size", query:{productid:id}})
        }

        
        const handleDataReview = () => {
            const url = `/api/get/review/product?productid=${state.productid}`;
            const headers = { "Content-Type" : "application/json" };
            axios.get(url, { headers })
                .then(res => {
                    console.log('리뷰', res.data);
                    state.reviewRows = res.data;
                })
                .catch(error => {
                    console.error('API 호출 오류', error);
                });
        }


        const handleData = () => {
            axios.get(`/api/get/product/one?productid=${state.productid}`).then((res)=> {
                console.log("한개", res.data);
                state.row = res.data;
            }).catch((err)=>{
                console.log(err);
            })
        }

        onMounted(()=>{
            handleDataReview();
            handleData();
        })

        return {
            state,
            handleBuying,
            handleSelling
        }
    }
}
</script>

<style lang="css" scoped>
.wrap {
    display: flex;
}
.container{
    border: 1px solid #cccccc;
}
.col{
    border: 1px solid #cccccc;
}
.product {
    margin: 10px;
}
/* #product_wish_price{
    display: flex;
    flex-direction: row;
} */

#wish_price_button{
    height: 70px;
}
.product_info_body{
    display: flex;
}
.info_box{
    margin-right: 10px;
    flex: 1;
}

.review_list{
    display: flex;
    flex-wrap : wrap;
}
.review_main_img{
    width: 160px;
    height: 160px;
    margin: 5px;
    border-radius: 10px;
}


</style>