<template>
    <!-- 모달영역 -->
    <delivery-modal v-if="showModal" @close="showModal = false"/>
    <address-list-modal v-if="showAddressList" :addressList="state.addressList" @close="showAddressList = false" @select="selectAdd"/>
    <div class="common_mt160">
        <!-- 빠른배송, 즉시구매 -->
        <div class="container" id="wrap" v-if="state.type === 'fast' || state.type === 'normal'">
            <div class="head d-flex align-items-center">
                <img :src="state.item.imagePath" class="head_img">
                <div class="d-flex flex-column ml-3">
                    <p style="font-weight: bold;">{{ state.item.modelNumber }}</p>
                    <p>{{ state.item.productEngName }}</p>
                    <p style="color: #aeaeae;">{{ state.item.productKorName }}</p>
                    <p>{{ state.item.sellProductSize }}</p>
                    <p v-if="state.item.inventoryDiv === 1"><button class="fast_small">빠른배송</button></p>    
                </div>
            </div>

            <h4>배송 주소</h4>
            <p><button @click="showModal = true">주소 추가</button></p>
            <p><button @click="showAddressList = true">+</button></p>
            <div v-if="!state.addressList">
                <p>주소를 추가하세요</p>
            </div>
            <div v-if="state.selectedAddress">
                <p>{{ state.selectedAddress.name }}</p>
                <p>{{ state.selectedAddress.phoneNumber }}</p>
                <p>{{ state.selectedAddress.address }} {{ state.selectedAddress.subAddress }}</p>
            </div>
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
                <h5>{{ Math.floor(state.item.sellWishPrice + state.item.sellWishPrice*0.015 + 5000) }}원</h5>
                <hr />
                <p>구매가</p>
                <p>{{ state.item.sellWishPrice }}</p>
                <p>검수비</p>
                <p>무료</p>
                <p>수수료</p>
                <p>{{ Math.floor(state.item.sellWishPrice*0.015) }}</p>
                <p>배송비</p>
                <p>5,000원</p>
            </div>
            <div v-if="state.type === 'normal'">
                <h5>{{ Math.floor(state.item.sellWishPrice + state.item.sellWishPrice*0.015 + 3000) }}원</h5>
                <hr />
                <p>즉시 구매가</p>
                <p>{{ state.item.sellWishPrice }}</p>
                <p>검수비</p>
                <p>무료</p>
                <p>수수료</p>
                <p>{{ Math.floor(state.item.sellWishPrice*0.015) }}</p>
                <p>배송비</p>
                <p>3,000원</p>
            </div>
            <hr />

            <h4>결제 방법</h4>
            <hr />
            
            <h4>구매 조건 확인</h4>
            <!-- 결제 컴포넌트 -->
            <payment-component :address="state.selectedAddress" :type="state.type" :contractDto="state.contractDto"/>
        </div>

        <!-- 구매입찰 -->
        <div class="container" id="wrap" v-if="state.row[0]">
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
            <div>
                <p>일반배송</p>
            </div>
            <hr />
            
            <h4>최종 주문 정보</h4>
            <h5>총 결제 금액</h5>
            <div>
                <h5 >{{ Math.floor(state.bidPrice + state.bidPrice*0.03 + 3000) }}원</h5>
                <hr />
                <p>구매 희망가</p>
                <p>{{ state.bidPrice }}</p>
                <p>검수비</p>
                <p>무료</p>
                <p>수수료</p>
                <p>{{ Math.floor(state.bidPrice*0.03) }}</p>
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
            <button @click="handleBid">구매 입찰하기</button>
        </div>
    </div>
</template>

<script>
import DeliveryModal from '@/components/DeliveryModal';
import PaymentComponent from '@/components/PaymentComponent';
import AddressListModal from '@/components/AddressListModal';
import axios from 'axios';
import { onMounted, reactive, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    components: {
        DeliveryModal,
        PaymentComponent,
        AddressListModal
    },
    setup () {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();

        const showModal = ref(false);
        const showAddressList = ref(false);

        const state = reactive({
            productid: Number(route.query.productid),
            size : Number(route.query.size),
            type : route.query.type,
            item : '',
            addressList : [],
            selectedAddress : {},
            memberNumber : 1, // 로그인 구현 후 수정
            
            row : [],
            sellingStatus : null,
            buyingStatus : null,
            
            bidPrice : 0,
            bidDate : '',
            bidFormattedDate : '',
            bidDays : '',

            contractDto : {}
        })
        

        watchEffect(() => {
            state.item = store.getters.getSelectedItem;
            state.bidPrice = Number(store.getters.getSelectedPrice);
            state.bidDate = store.getters.getSelectedDate;
            state.bidFormattedDate = store.getters.getSelectedFormattedDate;
            state.bidDays = store.getters.getSelectedDays;
        });


        // 주소 리스트
        const handleAddressList = async() => {
            try {
                const res = await axios.get(`/api/get/address?member=${state.memberNumber}`)
                console.log("주소목록", res.data)
                state.addressList = res.data
                const defaultAddress = state.addressList.find(address => address.defaultAddress === 1)
                if(defaultAddress) {
                    state.selectedAddress = defaultAddress
                }
            } catch(err) {
                console.error(err);
            }
        }

        const selectAdd = (selectedAddress) => {
            state.selectedAddress = selectedAddress;
            console.log("선택주소",selectedAddress)
        }

        // 빠른배송, 즉시구매 시 결제창에 데이터 전달
        if(state.type === 'fast' || state.type === 'normal') {
            state.contractDto = {
                productId : state.productid,
                buyingId : null,
                sellingId : state.item.sellingId,
                buyerNumber : state.memberNumber,
                sellerNumber : state.item.sellerNumber,
                price : state.item.sellWishPrice,
                productSize : state.size
            }
            console.log("전달되니컨트랙트", state.contractDto)
        }
            

        // 구매입찰
        const handleBid = async() => {
            // 유효성 검사 통과 > 구매 조건 확인 all check
            // if(state.errorMessage.length === 0) { 
    
                try {
                    const url = `/api/post/buy`;
                    const headers = {"Content-Type":"application/json"};
                    const body = {
                        memberNumber : state.memberNumber,
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

        onMounted(()=>{
            handleAddressList();
        })

        return {
            state,
            showModal,
            showAddressList,
            selectAdd,
            handleBid,
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