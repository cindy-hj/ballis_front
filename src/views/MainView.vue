<template>
    <div class="common_mt160">
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img src="../assets/image/mainSlide01.jpg" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                <img src="../assets/image/mainSlide02.jpg" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                <img src="../assets/image/mainSlide03.jpg" class="d-block w-100" alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        <div class="main_body">
            <div class="shortcut_list">
                <img src="../assets/image/mainSlide01.jpg" class="shortcut_item">
                <img src="../assets/image/mainSlide02.jpg" class="shortcut_item">
                <img src="../assets/image/mainSlide03.jpg" class="shortcut_item">
                <img src="../assets/image/mainSlide01.jpg" class="shortcut_item">
                <img src="../assets/image/mainSlide01.jpg" class="shortcut_item">
            </div>
            <hr />

            <div class="sec_new">
                <div class="new_item_title">
                    <h4 style="font-weight: bold;">Just Dropped</h4>
                    <h5 style="color: #aeaeae;">발매 상품</h5>
                </div>
                <div class="new_item_list">
                    <div class="new_item" v-for="(tmp, i) in state.displayedNewItems" :key="i" @click="handleProductOne(tmp.id)">
                        <img :src="tmp.imagePath" class="new_item_img">
                        <p style="font-weight: bold;">{{ tmp.brandName }}</p>
                        <p>{{ tmp.productEngName }}</p>
                        <div v-for="(fast, j) in state.newFast" :key="j">
                            <p class="fast_small" v-if="fast.id === tmp.id && fast.hasStorage">빠른배송</p>
                        </div>
                        <p>&nbsp;</p>
                        <div v-if="tmp.wishPrice">
                            <p style="font-weight: bold; font-size: large;">{{ tmp.wishPrice }}원</p>
                            <p style="color: #aeaeae;">즉시 구매가</p>
                        </div>
                        <div v-else>
                            <p style="font-weight: bold; font-size: large;">-</p>
                        </div> 
                    </div>
                </div>
                <div class="button">
                    <button @click="showMoreNew()">더보기</button>
                </div>
            </div>
            <hr />

            <div class="sec_pop">
                <div class="pop_item_title">
                    <h4 style="font-weight: bold;">Most Popular</h4>
                    <h5 style="color: #aeaeae;">인기 상품</h5>
                </div>
                
                <div class="pop_item_list">
                    <div class="pop_item" v-for="(tmp, i) in state.displayedPopItems" :key="i" @click="handleProductOne(tmp.id)">
                        <img :src="tmp.imagePath" class="pop_item_img">
                        <p style="font-weight: bold;">{{ tmp.brandName }}</p>
                        <p>{{ tmp.productEngName }}</p>
                        <div v-for="(fast, j) in state.popFast" :key="j">
                            <p class="fast_small" v-if="fast.id === tmp.id && fast.hasStorage">빠른배송</p>
                        </div>
                        <p>&nbsp;</p>
                        <div v-if="tmp.wishPrice">
                            <p style="font-weight: bold; font-size: large;">{{ tmp.wishPrice }}원</p>
                            <p style="color: #aeaeae;">즉시 구매가</p>
                        </div>
                        <div v-else>
                            <p style="font-weight: bold; font-size: large;">-</p>
                        </div>      
                    </div>
                </div>
                <div class="button">
                    <button @click="showMorePop()">더보기</button>
                </div>
               
            </div>
            <hr /> 
            <div class="sec_review">
                <div class="review_title">
                    <h4 style="font-weight: bold;">Review</h4>
                    <h5 style="color: #aeaeae;">후기</h5>
                </div>
                <div class="review_list">
                    <div class="review_main" v-for="(tmp, i) in state.reviewRows" :key="i">
                        <img v-if="tmp.mainImageDiv === 1" 
                            @click="showModal = true; 
                            state.reviewid=tmp.reviewId; 
                            state.productid=tmp.productId" 
                            :src="tmp.imagePath" class="review_main_img"
                        >
                    </div>
                </div>      
                <!-- 모달 영역 -->  
                <review-modal v-if="showModal" 
                    :review-id="state.reviewid" 
                    :product-id="state.productid" 
                    @close="showModal = false" 
                />
            </div>
        </div>
    </div>

</template>

<script>
import ReviewModal from '@/components/ReviewModal.vue'
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    components: {
        ReviewModal
    },
    setup() {
        // const route = useRoute();
        const router = useRouter();

        const showModal = ref(false);

        const state = reactive({
            newRows: [],
            newFast: [],
            displayedNewItems: [],
            visibleNewCount: 4,

            popRows: [],
            popFast: [],
            displayedPopItems: [],
            visiblePopCount: 4,

            reviewRows: [],
            reviewid: "",
            productid: ""
        });    

        const handleProductOne = (id) => {
            router.push({
                path: '/product/one',
                query: { productid: id }
            });
        }


        
        const showMoreNew = () => {
            state.visibleNewCount += 4;
            state.displayedNewItems = state.newRows.slice(0, state.visibleNewCount);
        }

        const showMorePop = () => {
            state.visiblePopCount += 4;
            state.displayedPopItems = state.popRows.slice(0, state.visiblePopCount);
        }

        
        const handleDataNew = () => {
            const url = `/api/get/product/new`;
            const headers = { "Content-Type" : "application/json" };
            axios.get(url, { headers })
                .then(res => {
                    // console.log('신상품', res.data);
                    state.newRows = res.data.lists;
                    // 빠른배송 여부
                    state.newFast = res.data.storage;
                    // console.log("빠른배송", res.data.storage)
                    // 4개씩 출력
                    state.displayedNewItems = state.newRows.slice(0, state.visibleNewCount);
                })
                .catch(error => {
                    console.error('API 호출 오류', error);
                });
        }

        const handleDataPop = () => {
            const url = `/api/get/product/pop`;
            const headers = { "Content-Type" : "application/json" };
            axios.get(url, { headers })
                .then(res => {
                    // console.log('인기상품', res.data);
                    state.popRows = res.data.lists;
                    // 빠른배송 여부
                    state.popFast = res.data.storage;
                    // 4개씩 출력
                    state.displayedPopItems = state.popRows.slice(0, state.visiblePopCount);
                })
                .catch(error => {
                    console.error('API 호출 오류', error);
                });
        }

        const handleDataReview = () => {
            const url = `/api/get/review/all`;
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

        onMounted(()=>{
            handleDataNew();
            handleDataPop();
            handleDataReview();
        })

        return {
            state,
            showMoreNew,
            showMorePop,
            showModal,
            handleProductOne
        }
    }
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";
.carousel-item {
    height: 480px;
}
.carousel-item img {
    height: 100%;
    object-fit: cover;
}
.main_body{
    position: relative;
    /* background-color: blueviolet; */
    margin: 0 100px;
    width: 1100px;
    left: 50%;
    margin-left: -550px;
}
.shortcut_list{
    text-align: center;
}
.shortcut_item{
    width: 200px;
    height: 100px;
    margin: 50px 8px;
    border-radius: 10px;
}
.sec_new, .sec_pop, .sec_review{
    margin-bottom: 50px;
}
.new_item_list, .pop_item_list{
    width: 1100px;
    padding: 0 5px; 
    /* background-color: yellow; */
    display: flex;
    position: relative;
    left: 50%;
    margin-left: -550px;
    flex-wrap : wrap;
}
.new_item_title, .pop_item_title, .review_title{
    margin: 50px 0 0 0;
    padding: 0 22px;
}
.new_item, .pop_item{
    width: 250px;
    margin: 10px;
}
.new_item_img, .pop_item_img{
    width: 250px;
    height: 250px;
    margin: 5px;
    border-radius: 10px;
}
.new_item p, .pop_item p{
    margin: 1px 8px;
}
.button{
    position: relative;
    left: 50%;
    margin-left: -50px;
    margin-top: 20px;
}
.button button{
    width: 120px;
    height: 50px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    background-color: #ffffff;
}
hr{
    width: 1060px;
    margin: 0 auto;
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
.fast_small{
    width: 70px;
    height: 30px;
    font-size: 12px;
    color: rgb(54, 186, 94);
    background-color: rgb(239, 255, 250);
    border: none;
}
</style>