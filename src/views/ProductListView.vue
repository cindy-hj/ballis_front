<template>
    <div class="common_mt160">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3 " id="side_bar">
            <li class="nav-item">
                <a class="nav-link active fs-5">필터</a>
            </li>{{ state.inventoryDivList }}
            <li><button class="fast_big" @click="handleInventoryDivList">빠른배송</button></li>

            <li class="nav-item">
                <a class="nav-link fs-5" 
                    data-bs-toggle="collapse" 
                    href="#collapse1" 
                    aria-expanded="false"
                    aria-controls="collapse1"
                > 카테고리
                </a>
            </li>
            <div class="collapse" id="collapse1">
                {{ state.categoryList }}
                <div class="card card-body">
                    <label>
                        <input type="checkbox" name="category" value="1" v-model="state.categoryList"> 스니커즈
                    </label>
                    <label>
                        <input type="checkbox" name="category" value="2" v-model="state.categoryList"> 플랫
                    </label>
                    <label>
                        <input type="checkbox" name="category" value="3" v-model="state.categoryList"> 로퍼
                    </label>
                    <label>
                        <input type="checkbox" name="category" value="4" v-model="state.categoryList"> 더비/레이스업
                    </label>
                    <label>
                        <input type="checkbox" name="category" value="5" v-model="state.categoryList"> 샌들/슬리퍼
                    </label>
                    <label>
                        <input type="checkbox" name="category" value="6" v-model="state.categoryList"> 힐/펌프스/부츠/기타
                    </label>
                </div>
            </div>
            <hr />

            <li class="nav-item">
                <a class="nav-link fs-5" 
                    data-bs-toggle="collapse" 
                    href="#collapse2" 
                    aria-expanded="false"
                    aria-controls="collapse2"
                > 성별
                </a>
            </li>
            <div class="collapse" id="collapse2">
                {{ state.genderList }}
                <div class="card card-body">
                    <label>
                        <input type="checkbox" name="gender" value="1" v-model="state.genderList" @change="handleGenderList"> 여성
                    </label>
                    <label>
                        <input type="checkbox" name="gender" value="2" v-model="state.genderList" @change="handleGenderList"> 남성
                    </label>
                </div>
            </div>
            <hr />

            <li class="nav-item">
                <a class="nav-link fs-5" 
                    data-bs-toggle="collapse" 
                    href="#collapse3" 
                    aria-expanded="false"
                    aria-controls="collapse3"
                > 브랜드
                </a>
            </li>
            <div class="collapse" id="collapse3">
                {{ state.brandIdList }}
                <div class="card card-body">
                    <label v-for="(tmp, i) in state.brandRows" :key="i">
                        <input  type="checkbox" name="brand" 
                            :value="tmp.brandId" 
                            @click="handleBrandIdList(tmp.brandId)"
                        > {{ tmp.brandName }} 
                    </label>
                </div>
            </div>
            <hr />
            <li class="nav-item">
                <a class="nav-link fs-5" 
                    data-bs-toggle="collapse" 
                    href="#collapse4" 
                    aria-expanded="false"
                    aria-controls="collapse4"
                > 사이즈
                </a>
            </li>
            <div class="collapse" id="collapse4">
                {{ state.sizeList }}
                <div class="card card-body" id="collapse_size">
                    <button class="button_size" v-for="size in state.sizes" :key="size" @click="handleSizeList(size)">{{ size }}</button>
                </div>
            </div>
            <hr />
            
            <li class="nav-item">
                <a class="nav-link fs-5" 
                    data-bs-toggle="collapse" 
                    href="#collapse5" 
                    aria-expanded="false"
                    aria-controls="collapse5"
                > 가격
                </a>
            </li>
            <div class="collapse" id="collapse5">
                {{ state.wishPriceList }}
                <div class="card card-body">
                    <label v-for="price in prices" :key="price.id">
                        <input type="checkbox" :id="price.id" @change="handleWishPriceList(price)"> {{ price.label }}
                    </label>
                </div>
            </div>
            <hr />
        </ul>

        <div class="dropdown" id="sorting">
            <div class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">{{ sortText }}</div>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" @click="selectSort(1)">인기순</a></li>
                <li><a class="dropdown-item" @click="selectSort(2)">관심순</a></li>
                <li><a class="dropdown-item" @click="selectSort(3)">발매일순</a></li>
                <li><a class="dropdown-item" @click="selectSort(4)">리뷰순</a></li>
            </ul>
        </div>

        <div class="all_item_list">
            <div class="all_item" v-for="(tmp, i) in state.rows" :key="i" @click="handleProductOne(tmp.id)">
                <img :src="tmp.imagePath" class="all_item_img">
                <p style="font-weight: bold;">{{ tmp.brandName }}</p>
                <p>{{ tmp.productEngName }}</p>
                <p style="color: #aeaeae;">{{ tmp.productKorName }}</p>
                <p v-if="tmp.inventoryDiv === 1"><button class="fast_small">빠른배송</button></p>
                <p>&nbsp;</p>
                <p style="font-weight: bold; font-size: large;">{{ tmp.wishPrice }}원</p>
                <p v-if="tmp.wishPrice" style="color: #aeaeae;">즉시 구매가</p>
                <p><span>wish {{ tmp.wishCnt }} &nbsp;</span>
                <span>Review {{ tmp.reviewCnt }}</span></p>       
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { computed, onMounted, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';

export default {

    setup () {
        const router = useRouter();

        const state = reactive({
            sizes : [],
            rows : [],
            brandRows : [],
            sort : 1,
            categoryList : [],
            genderList : [],
            brandIdList : [],
            inventoryDivList : [],
            sizeList : [],
            wishPriceList : [],
            isChecked : false,
        })

        // 가격대 나열
        const prices = [
            { id: 'price1', range: [0, 100000], label: '10만원 이하' },
            { id: 'price2', range: [100001, 300000], label: '10-30만원' },
            { id: 'price3', range: [300001, 500000], label: '30-50만원' },
            { id: 'price4', range: [500001, 1000000], label: '50-100만원' },
            { id: 'price5', range: [1000001, 3000000], label: '100-300만원' },
            { id: 'price6', range: [3000001, 2147483647], label: '300만원 이상' },
        ];

        // 정렬 기준 나열
        const sortText = computed(() => {
            switch (state.sort) {
                case 1:
                    return '인기순';
                case 2:
                    return '관심순';
                case 3:
                    return '발매일순';
                case 4:
                    return '리뷰순';
                default:
                    return '인기순';
            }
        });

        // 정렬
        const selectSort = (sortValue) => {
            state.sort = sortValue;
            handleData();
        };

        // 빠른배송 여부
        const handleInventoryDivList = () => {
            if (!state.inventoryDivList.length) {
                state.inventoryDivList.push(1);
            } else {
                state.inventoryDivList = [];
            }
            handleData();
        }

        // 성별 
        const handleGenderList = () => {
            if (state.genderList.includes("1") && !state.genderList.includes("3")) {
                state.genderList.push("3");
            } else if (state.genderList.includes("2") && !state.genderList.includes("3")) {
                state.genderList.push("3");
            } else {
                state.genderList = [];
            }
            handleData();
        }

        // 브랜드 
        const handleBrandIdList = (brandId) => {
            const index = state.brandIdList.indexOf(brandId);
            const newArray = [...state.brandIdList]; 
            if (index >= 0) {
                newArray.splice(index, 1); 
            } else {
                newArray.push(brandId); 
            }
            state.brandIdList = newArray; 
        }

        // 사이즈
        const handleSizeList = (size) => {
            const index = state.sizeList.indexOf(size);
            const newArray = [...state.sizeList]; 
            if (index >= 0) {
                newArray.splice(index, 1); 
            } else {
                newArray.push(size); 
            }
            state.sizeList = newArray; 
        }

        // 가격대
        const handleWishPriceList = (price) => {
            const newPriceList = [...state.wishPriceList];
            const foundPrices = newPriceList.filter((p) => p === price.range[0] || p === price.range[1]);

            if (foundPrices.length > 0) {
                foundPrices.forEach((p) => {
                    const index = newPriceList.indexOf(p);
                    newPriceList.splice(index, 1);
                });
            } else {
                newPriceList.push(price.range[0], price.range[1]);
            }

            state.wishPriceList = newPriceList;
        };

        // 사이즈 생성
        const generateSizes = () => {
            for(let i = 215; i <= 330; i += 5) {
                state.sizes.push(i);
            }
        }
        
        //브랜드 목록 생성
        const handleDataBrand = async () => {
            const res = await axios.get(`/api/get/brand/list`);
            // console.log("브랜드리스트", res.data);
            state.brandRows = res.data;
                        
        }

        const handleData = async () => {
            try {
                const url = `/api/get/product/all?sort=${state.sort}`;
                const headers = {"Content-Type":"application/json"};
                const body = {
                    categoryList : state.categoryList,
                    genderList : state.genderList,
                    brandIdList : state.brandIdList,
                    inventoryDivList : state.inventoryDivList,
                    sizeList : state.sizeList,
                    wishPriceList : state.wishPriceList       
                }
                const res = await axios.post(url, body, {headers});
                
                console.log('상품전체리스트', res.data.productAllList);
                state.rows = res.data.productAllList;
            
            } catch (err) {
                console.error(err);
            }
        }

        const handleProductOne = (id) => {
            router.push({
                path: '/product/one',
                query: { productid: id }
            });
        }

        watch([ 
            () => state.categoryList, 
            () => state.brandIdList, 
            () => state.wishPriceList, 
            () => state.sizeList
        ], () => {
            handleData();
        });


        onMounted(()=>{
            handleData();
            handleDataBrand();
            generateSizes();
        })

        return {
            state,
            prices,
            sortText,
            selectSort,
            handleInventoryDivList,
            handleBrandIdList,
            handleGenderList,
            handleSizeList,
            handleWishPriceList,
            handleProductOne,
        }
    }
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";
#side_bar{
    float: left;
    width: 300px;
    margin: 30px;
    /* border: 1px solid #cccccc; */
}
label{
    margin: 3px;
}
#collapse_size{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.button_size{
    /* flex: auto; */
    width: 78px;
    height: 40px;
    border: 1px solid #cccccc;
    background-color: #ffffff;
    margin: 2px;
}
.all_item_list{
    width: 1100px;
    padding: 0 5px; 
    /* background-color: yellow; */
    display: flex;
    position: relative;
    /* left: 50%;
    margin-left: -550px; */
    flex-wrap : wrap;
}
.all_item{
    width: 250px;
    margin: 10px;
}
.all_item_img{
    width: 250px;
    height: 250px;
    margin: 5px;
    border-radius: 10px;
}
.all_item p{
    margin: 1px 8px;
}
.fast_big{
    width: 100px;
    height: 40px;
    background-color: white;
    border: 1px solid #cccccc;
    border-radius: 20px;

}
.fast_small{
    width: 70px;
    height: 30px;
    font-size: 12px;
    color: rgb(54, 186, 94);
    background-color: rgb(239, 255, 250);
    border: none;
}
#sorting {
    float: right;
    margin-right: 250px;
}

</style>