<template>
    <div>
        <button @click="requestPay">결제하기!!!!</button>
    </div>
</template>

<script>
import { reactive, watchEffect, onMounted } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

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
            required : true
        }
    },
    setup (props) {
        // 빠른배송 구매 and 즉시구매->거래체결 테이블에 저장, 보관판매(3000원)->거래체결 테이블에 저장x
        const store = useStore();
        
        const state = reactive({
            item : "",
            address : {},
            message : "", 

            merchantUid: "", 
            
            type : "",
            contract : {}, 
            
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
            console.log("콘트랙트받아왔나", state.contract);
        });


        const setMerchantUid = () => {
            const timestamp = Date.now();
            state.merchantUid = `${timestamp}_${state.memberNumber}`;
        }


        const IMP = window.IMP; 
        IMP.init("imp26282104"); 


        const requestPay = () => {
            // console.log("스토어 아이템", state.item)
            IMP.request_pay(
                {
                    pg: 'kakaopay',
                    pay_method: 'card',
                    merchant_uid: state.merchantUid,
                    name: state.item.productKorName, // 상품명
                    amount: Number(state.item.sellWishPrice), // 상품가격
                    buyer_email: state.buyer_email,
                    buyer_name: state.buyer_name, // 받는사람 이름이랑 다를수있자너..
                    buyer_tel: state.buyer_tel, // 받는사람 전화번호랑 다를수있짜너..
                    buyer_addr: state.address.address + state.address.subAddress,
                    buyer_postcode: state.address.zipCode,
                },

                async (rsp) => {
                    console.log("알에스피", rsp);
                    if (rsp.success) {
                        const url = `/api/add/payment/test?type=${state.type}`;
                        const headers = { "Content-Type": "application/json" };
                        const data = {
                            contractDto : {
                                productId : state.contract.productId,
                                buyingId : null,
                                sellingId : state.contract.sellingId,
                                buyerNumber : state.memberNumber,
                                sellerNumber : state.contract.sellerNumber,
                                price : state.contract.price,
                                productSize : state.contract.productSize	
                            },
                            paymentDto : {        
                                impUid: rsp.imp_uid, // 결제번호
                                merchantUid: rsp.merchant_uid, // 주문번호
                                sellingId : state.item.sellingId,
                                contractId : null,
                                memberNumber : state.memberNumber,
                                name : state.address.name, 
                                address : state.address.address,
                                subAddress : state.address.subAddress,
                                zipCode : state.address.zipCode,
                                phoneNumber : state.address.phoneNumber, 
                                message : state.message, 
                                paymentType : state.paymentType,
                                price : state.item.sellWishPrice
                            }
                        }
                        // console.log("바디",data);
                        const res = await axios.post(url, data, {headers});
                        console.log("결제 완료", res);
                    } else {
                        alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
                    }
                } 
            )
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