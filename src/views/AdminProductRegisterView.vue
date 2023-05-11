<template>
    <div class="container common_mt160 admin_wrap">
        <admin-sub-menu></admin-sub-menu>
        <div class="admin_content">
            <h1 class="mb-4">| 상품등록</h1>
            
            <!-- 입력 영역 -->
            <div class="admin_input_wrap my-5">
                <div class="mb-4">
                    <label class="form-label fs-5">| 상품명(영문)</label>
                    <div class="px-2"> <!-- col-10 -->
                        <input type="text" class="form-control" placeholder="상품명(영문)">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 상품명(한글)</label>
                    <div class="px-2">
                        <input type="text" class="form-control" placeholder="상품명(한글)">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 브랜드</label>
                    <div class="px-2 col-5">
                        <select class="form-select">
                            <option selected>Choose...</option>
                            <option>Reproduction of Found</option>
                        </select>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 카테고리</label>
                    <div class="px-2 col-5">
                        <select class="form-select">
                            <option selected>Choose...</option>
                            <option>스니커즈</option>
                            <option>플랫</option>
                            <option>로퍼</option>
                            <option>더비/레이스업</option>
                            <option>샌들/슬리퍼</option>
                            <option>힐/펌프스/부츠/기타</option>
                        </select>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 모델번호</label>
                    <div class="px-2 col-5">
                        <input type="text" class="form-control" placeholder="모델번호">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 출시일</label>
                    <div class="px-2 col-5">
                        <input type="date" class="form-control">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 컬러</label>
                    <div class="px-2 col-5">
                        <input type="text" class="form-control" placeholder="컬러">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 발매가</label>
                    <div class="px-2 col-5">
                        <input type="number" class="form-control">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 사이즈</label>
                    <div class="row px-2">
                        <div class="col-4">
                            <label class="form-label fs-6">| 최소값</label>
                            <input type="number" class="form-control">
                        </div>
                        <div class="col-4">
                            <label class="form-label fs-6">| 최대값</label>
                            <input type="number" class="form-control">
                        </div>
                        <div class="col-4">
                            <label class="form-label fs-6">| 단위</label>
                            <input type="number" class="form-control">
                        </div>
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
                    <label class="form-label fs-5">| 리셀등록가능여부</label>
                    <div class="px-2">
                        <div class="form-check form-check-inline me-5">
                            <input class="form-check-input" type="radio">
                            <label class="form-check-label">리셀등록가능</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio">
                            <label class="form-check-label">브랜드배송전용</label>
                        </div>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fs-5">| 이미지</label>
                    <div>
                        <label class="form-label">대표이미지</label>
                        <div class="mb-2 px-2">
                            <img src="../assets/image/logo_temp.png" class="rounded me-3" alt="...">
                        </div>
                        <div class="mb-3 col-6">
                            <input class="form-control" type="file">
                        </div>
                    </div>
                    
                    <div class="mt-5">
                        <label class="form-label">서브이미지</label>
                        <div class="mb-2 px-2">
                            <img src="../assets/image/logo_temp.png" class="rounded me-3" alt="...">
                            <img src="../assets/image/logo_temp.png" class="rounded me-3" alt="...">
                        </div>
                        <div class="mb-3 col-6">
                            <label class="form-label">*최대 2개까지 선택가능합니다.</label>
                            <input class="form-control" type="file" multiple>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 버튼 영역 -->
            <div class="d-flex justify-content-center mt-3">
                <button class="btn btn-success btn-lg d-flex justify-content-end me-2">상품등록</button>
                <button class="btn btn-success btn-lg d-flex justify-content-start ms-2" @click="moveProductList()">목록으로</button>
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
        
        const moveProductList = () =>{
            router.push({path:'/admin/prdouct/list'});
            //query:{no : code}
        }

        return {
            moveProductList
        }
    }
}
</script>

<style lang="css" scoped>
@import "../assets/css/common.css";

/* .admin_input_wrap {
    width: 800px;
    margin-left: auto;
    margin-right: auto;
} */




</style>