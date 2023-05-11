<template>
    <div class="container common_mt160 admin_wrap">
        <admin-sub-menu></admin-sub-menu>
        <div class="admin_content">
            <h1 class="mb-4">| 회원상세관리</h1>

            <!-- 입력 영역 -->
            <div class="admin_input_wrap my-5">
                <h3 class="mb-4">회원기본정보</h3>
                <div class="mb-4">
                    <label class="form-label fs-5">| 회원번호</label>
                    <div class="px-2 col-5">
                        <label class="form-label fs-5">120</label>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 이름</label>
                    <div class="px-2 col-5">
                        <input type="text" class="form-control">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 이메일</label>
                    <div class="px-2 col-5">
                        <input type="text" class="form-control">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 비밀번호</label>
                    <div class="px-2 col-5">
                        <input type="password" class="form-control">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 휴대폰번호</label>
                    <div class="px-2 col-5">
                        <input type="text" class="form-control">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 성별</label>
                    <div class="px-2">
                        <div class="form-check form-check-inline me-5">
                            <input class="form-check-input" type="radio">
                            <label class="form-check-label">남</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio">
                            <label class="form-check-label">여</label>
                        </div>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 생년월일</label>
                    <div class="px-2 col-5">
                        <input type="date" class="form-control">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 가입일</label>
                    <div class="px-2 col-5">
                        <label class="form-label fs-5">2023/05/04</label>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 회원상태</label>
                    <div class="px-2 col-5">
                        <select class="form-select">
                            <option selected>Choose...</option>
                            <option>일반회원</option>
                            <option>관리자</option>
                            <option>탈퇴</option>
                        </select>
                    </div>
                </div>
                
                <hr class="my-5">

                <h3 class="mb-4">회원주소정보</h3>
                <!-- TODO 주소갯수만큼 v-for 할 것-->
                <div class="mb-4">
                    <label class="form-label fs-5">| 받는사람</label>
                    <div class="px-2 col-5">
                        <input type="text" class="form-control">
                    </div>
                </div>
                <!-- TODO 주소 API 쓸까? -->
                <div class="mb-4">
                    <label class="form-label fs-5">| 기본주소</label>
                    <div class="px-2">
                        <input type="text" class="form-control">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 상세주소</label>
                    <div class="px-2">
                        <input type="text" class="form-control">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 우편번호</label>
                    <div class="px-2 col-3">
                        <input type="text" class="form-control">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 휴대폰번호</label>
                    <div class="px-2 col-5">
                        <input type="text" class="form-control">
                    </div>
                </div>

                <hr class="my-5">

                <h3 class="mb-4">회원카드정보</h3>
                <div class="mb-4">
                    <label class="form-label fs-5">| 카드명의자</label>
                    <div class="px-2 col-5">
                        <input type="text" class="form-control">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 카드번호</label>
                    <div class="px-2 col-5">
                        <input type="text" class="form-control">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 유효년도</label>
                    <div class="px-2 col-2">
                        <input type="text" class="form-control">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 유효월</label>
                    <div class="px-2 col-2">
                        <input type="text" class="form-control">
                    </div>
                </div>

                <hr class="my-5">

                <h3 class="mb-4">회원정산계좌정보</h3>
                <div class="mb-4">
                    <label class="form-label fs-5">| 은행명</label>
                    <div class="px-2 col-4">
                        <input type="text" class="form-control">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 계좌번호</label>
                    <div class="px-2 col-5">
                        <input type="text" class="form-control">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 예금주</label>
                    <div class="px-2 col-4">
                        <input type="text" class="form-control">
                    </div>
                </div>


            </div>

            <!-- 버튼 영역 -->
            <div class="d-flex justify-content-center mt-3">
                <button class="btn btn-success btn-lg d-flex justify-content-end me-2">수정하기</button>
                <button class="btn btn-success btn-lg d-flex justify-content-start ms-2" @click="moveMemberList()">목록으로</button>
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
        
        const moveMemberList = () =>{
            router.push({path:'/admin/member/list'});
            //query:{no : code}
        }

        return {
            moveMemberList
        }
    }
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";

</style>