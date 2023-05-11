<template>
    <div class="review_blackBg">
        <div class="review_whiteBg">
            <div class="modal-header">
                <h3 class="modal-title"></h3>
                <button type="button" class="btn-close" id="close_btn" aria-label="Close" @click="$emit('close')"></button>
            </div>
            <div class="modal_body">
                <div class="left_wrap">
                    <div id="carouselExampleIndicators1" class="carousel slide" data-bs-ride="false">
                        <div class="carousel-indicators">
                            <button v-for="(tmp, i) in state.reviewRows" :key="i" type="button" data-bs-target="#carouselExampleIndicators1" 
                                :data-bs-slide-to="i" :class="{ active: i === 0 }" :aria-current="i === 0" :aria-label="'Slide ' + (i+1)">
                            </button>
                        </div>
                        <div class="carousel-inner">
                            <div v-for="(tmp, i) in state.reviewRows" :key="i" :class="['carousel-item', { active: i === 0 }]">
                                <img :src="tmp.imagePath" class="d-block w-100" alt="...">
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div class="right_wrap">
                    <div class="content_head" v-if="state.reviewRows.length">
                        {{ state.reviewRows[0].content }}
                    </div>
                    <div class="content_body" v-if="state.productRows.length" @click="handleProductOne(state.productRows[0].id)">
                        <img :src="state.productRows[0].imagePath" class="img-thumbnail">
                        <p>&nbsp;</p>
                        <p>{{ state.productRows[0].productEngName }}</p>
                        <p style="font-weight: bold;">{{ state.productRows[0].sellWishPrice }}원</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="outter_btn">
            <img src="@/assets/image/arrow-trans.png" class="outter_right"/>
            <img src="@/assets/image/arrow-trans.png" class="outter_left"/>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    props: {
        reviewId: {
            type: Number,
            required: true,
        },
        productId: {
            type: Number,
            required: true,
        },
    },
    setup(props) {
        const router = useRouter(); 

        const state = reactive({
            reviewRows: [],
            productRows: [],
        });

        const handleProductOne = (id) => {
            router.push({
                path: '/product/one',
                query: { productid: id }
            });
        }

        const receiveReview = async () => {
            try {
                const res = await axios.get(`/api/get/review/one?reviewid=${props.reviewId}`);
                state.reviewRows = res.data;
                console.log('1개리뷰', res.data);
            } catch (err) {
                console.error(err);
            }
        };

        const handleData = async () => {
            try {
                const res = await axios.get(`/api/get/product/one?productid=${props.productId}`);
                console.log('리뷰내 한개상품', res.data);
                state.productRows = res.data;
            } catch (err) {
                console.error(err);
            }
        };

        onMounted(() => {
            receiveReview();
            handleData();
        });

        return {
            state,
            handleProductOne
        };
    },
};

</script>

<style lang="css" scoped>
@import "../assets/css/common.css";
#close_btn {
    margin-bottom: 10px;
}
.modal_body {
    display: flex;
    flex: 1;
}
.left_wrap {
    flex-basis: 65%;
    /* border: 1px solid #cccccc; */
}
.right_wrap {
    position: relative;
    flex-basis: 35%;
    flex-direction: column;
    overflow: hidden;
    padding: 20px;
    /* border: 1px solid #cccccc; */
}
.visually-hidden {
    z-index:1;
}
.content_head {
    margin-bottom: auto; 
}
.content_body {
    position: absolute; 
    bottom: 20px; 
    margin-right: 20px;
}
.content_body p {
    margin: 0;
}
.outter_btn{
    position: relative;
}
.outter_btn:hover{
    cursor: pointer;
}
.outter_right{
    width: 50px;
    position: absolute;
    right: 350px;
    bottom: 400px;
}
.outter_left{
    transform: scaleX(-1);
    width: 50px;
    position: absolute;
    left: 350px;
    bottom: 400px;
}
</style>