<template>
    <div>
        <button @click="requestPay">결제하기</button>
    </div>
</template>

<script>
import { reactive, watchEffect, onMounted } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    props : {
        address : {
            type : Object,
            required : true
        },
        type : {
            type : String,
            required : true
        },
        contractDto : {
            type : Object,
            default : null
        },
        sellingDto : {
            type : Object,
            default : null
        }
    },
    setup (props) {

        const store = useStore();
        const router = useRouter();
        
        const state = reactive({
            item : "",
            address : {},
            message : "", 

            merchantUid: "", // 주문번호
            
            type : "",
            contract : {}, 
            selling : {},
            
            memberNumber : 1, // 로그인 구현후 수정
            buyer_email: 'gildong@gmail.com',
            buyer_name: '홍길동',
            buyer_tel: '01042424242',
            
            paymentType : 3, // 1:카드 간편결제 2:일반카드 3:카카오페이 4:네이버페이

        })

        watchEffect(() => {
            state.item = store.getters.getSelectedItem;
            state.address = props.address;
            state.type = props.type;
            state.contract = props.contractDto;
            state.selling = props.sellingDto;
            console.log("셀링받아왔나", state.selling);
            console.log("콘트랙트받아왔나", state.contract);
            console.log("아이템 정보", state.item)
        });

        // 주문번호 생성
        const setMerchantUid = () => {
            const timestamp = Date.now();
            state.merchantUid = `${timestamp}_${state.memberNumber}`;
        }

        // 빠른배송 구매 and 즉시구매->거래체결 테이블에 저장, 보관판매->거래체결 테이블에 저장x
        const contractDto = state.type === 'keep' ? null : state.contract;
        const sellingDto = state.type === 'keep' ? state.selling : null;

        // 구매시 최종가격
        const finalPrice = state.type === 'fast' ? 
        Math.floor(state.item.sellWishPrice + state.item.sellWishPrice*0.015 + 5000) // 빠른배송
        : Math.floor(state.item.sellWishPrice + state.item.sellWishPrice*0.015 + 3000); // 즉시구매


        const IMP = window.IMP; 
        IMP.init("imp26282104"); // 상점id

        const requestPay = () => {
            if(state.type === 'fast' || state.type === 'normal') {// 구매-빠른배송, 즉시구매
                IMP.request_pay(
                    {
                        pg: 'kakaopay',
                        pay_method: 'card',
                        merchant_uid: state.merchantUid,
                        name: state.item.productKorName, // 상품명
                        amount: finalPrice, // 결제가격
                        buyer_email: state.buyer_email, 
                        buyer_name: state.buyer_name,  
                        buyer_tel: state.buyer_tel, 
                        buyer_addr: state.address.address + state.address.subAddress,
                        buyer_postcode: state.address.zipCode,
                    },

                    async (rsp) => {
                        console.log("알에스피", rsp);
                        if (rsp.success) {
                            const url = `/api/add/payment/test?type=${state.type}`;
                            const headers = { "Content-Type": "application/json" };
                            const data = {
                                contractDto,
                                sellingDto,
                                paymentDto : {        
                                    impUid: rsp.imp_uid, // 결제번호
                                    merchantUid: rsp.merchant_uid, // 주문번호
                                    contractId : null,
                                    sellingId : state.item.sellingId,
                                    memberNumber : state.memberNumber,
                                    name : state.address.name, 
                                    address : state.address.address,
                                    subAddress : state.address.subAddress,
                                    zipCode : state.address.zipCode,
                                    phoneNumber : state.address.phoneNumber, 
                                    message : state.message, 
                                    paymentType : state.paymentType,
                                    price : finalPrice
                                }
                            }
                            console.log("바디",data);
                            const res = await axios.post(url, data, {headers});
                            console.log("결제 완료", res);
                            if(res.status === 200) {
                                router.push({
                                    path : '/buying/complete',
                                    query : {
                                        productid: state.item.id,
                                        type : state.type
                                    }
                                })
                            }
                            
                        } else {
                            alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
                        }
                    } 
                )
            } else if (state.type ==='keep') { // 판매-보관판매
                IMP.request_pay(
                    {
                        pg: 'kakaopay',
                        pay_method: 'card',
                        merchant_uid: state.merchantUid,
                        name: '창고 이용료', // 상품명
                        amount: 3000, // 창고이용료 
                        buyer_email: state.buyer_email, 
                        buyer_name: state.buyer_name,  
                        buyer_tel: state.buyer_tel, 
                        buyer_addr: state.address.address + state.address.subAddress,
                        buyer_postcode: state.address.zipCode,
                    },

                    async (rsp) => {
                        console.log("알에스피", rsp);
                        if (rsp.success) {
                            const url = `/api/add/payment/test?type=${state.type}`;
                            const headers = { "Content-Type": "application/json" };
                            const data = {
                                contractDto,
                                sellingDto,
                                paymentDto : {        
                                    impUid: rsp.imp_uid, // 결제번호
                                    merchantUid: rsp.merchant_uid, // 주문번호
                                    contractId : null,
                                    sellingId : null,
                                    memberNumber : state.memberNumber,
                                    name : state.address.name, 
                                    address : state.address.address,
                                    subAddress : state.address.subAddress,
                                    zipCode : state.address.zipCode,
                                    phoneNumber : state.address.phoneNumber, 
                                    message : state.message, 
                                    paymentType : state.paymentType,
                                    price : 3000
                                }
                            }
                            console.log("바디",data);
                            const res = await axios.post(url, data, {headers});
                            console.log("결제 완료", res);
                            if(res.status === 200) {
                                router.push({
                                    path : '/selling/complete',
                                    query : {
                                        productid: state.selling.productId,
                                        type : state.type
                                    }
                                })
                            }
                            
                        } else {
                            alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
                        }
                    } 
                )
            }
            
        }




        onMounted(()=>{
            setMerchantUid();
        })

        return {
            state,
            requestPay,
        }
    }
}
</script>

<style lang="scss" scoped>

</style>