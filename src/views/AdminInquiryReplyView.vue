<template>
    <div class="container common_mt160 admin_wrap">
        <admin-sub-menu></admin-sub-menu>
        <div class="admin_content">
            <h1 class="mb-4">| 문의답변등록</h1>

             <!-- 입력 영역 -->
             <div class="admin_reply_wrap my-5">
                <table class="table">
                    <tr>
                        <th style="width:150px">문의등록일</th>
                        <td>2023/04/05 23:22</td>
                        <th>문의처리상태</th>
                        <td>처리중</td>
                    </tr>
                    <tr>
                        <th>문의제목</th>
                        <td colspan="3">
                            구매관련해서 문의드립니다
                        </td>
                    </tr>
                    <tr>
                        <th>문의내용</th>
                        <td colspan="3">
                            배송일이 궁금해요
                            배송일이 궁금해요
                            배송일이 궁금해요
                            배송일이 궁금해요
                            배송일이 궁금해요
                            배송일이 궁금해요
                            배송일이 궁금해요
                        </td>
                    </tr>
                </table>

                <div class="mb-4">
                    <label class="form-label fs-5">| 답변내용</label>
                    <div class="px-2">
                        <textarea class="form-control" placeholder="답변내용입력" style="height: 300px"></textarea>
                    </div>
                </div>



             </div>

            <!-- 버튼 영역 -->
            <div class="d-flex justify-content-center mt-3">
                <button class="btn btn-success btn-lg d-flex justify-content-end me-2">답변등록</button>
                <button class="btn btn-success btn-lg d-flex justify-content-start ms-2" @click="moveInquiryList()">목록으로</button>
            </div>

        </div>

    </div>
</template>

<script>
import AdminSubMenu from '@/components/AdminSubMenu.vue'
import { useRouter } from 'vue-router';

export default {
    name: 'SubMenu',
    components: {
        AdminSubMenu
    },
    setup () {
        // 페이지 이동 라우트
        const router = useRouter();
        
        const moveInquiryList = () =>{
            router.push({path:'/admin/inquiry/list'});
            //query:{no : code}
        }

        return {
            moveInquiryList
        }
    }
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";

.admin_reply_wrap {
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
}


</style>