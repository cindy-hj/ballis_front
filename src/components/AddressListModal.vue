<template>
    <div class="black_bg_box">
        <div class="white_bg_box">
            <button type="button" class="btn-close" id="close_btn" aria-label="Close" @click="$emit('close')"></button>
            <div style="text-align: center;">
                <h4>주소록</h4>
            </div>
   
            <div style="text-align: center;">
                <div class="addressList" v-for="(tmp, i) in state.addressList" :key="i">
                    <div @click="$emit('select',tmp), $emit('close')">
                        <div v-if="tmp.defaultAddress === 1">기본배송지</div>
                        <p>{{ tmp.name }}</p>
                        <p>{{ tmp.phoneNumber }}</p>
                        <p>({{ tmp.zipCode }}) {{ tmp.address }} {{ tmp.subAddress }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { reactive } from 'vue';

export default {
    props: {
        addressList: {
            type: Array,
            required: true
        }
    },
    setup(props) {
        const state = reactive({
            memberNumber : 1, // 로그인 구현 후 수정
            addressList : props.addressList
        })

        return { 
            state
        };
    }
    
}
   
</script>
<style lang="css" scoped>
#close_btn{
    position: relative;
    left: 800px;
}
.black_bg_box{
    width:100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    z-index: 9999;
    top:0;
    left: 0;
}

.white_bg_box{
    width: 50%;
    margin: 80px auto;
    background: white;
    border-radius: 10px;
    padding: 20px 0;
}

.addressList {
    border: 1px solid #cccccc
}
</style>