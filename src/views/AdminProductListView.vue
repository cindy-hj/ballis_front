<template>
    <div class="container common_mt160 admin_wrap">
        <admin-sub-menu></admin-sub-menu>
        <div class="admin_content">
            <h1 class="mb-4">| 상품관리</h1>
            
            <!-- 검색 영역 -->
            <div class="mb-5">
                <h2 class="mb-4">상품 검색</h2>
                <div class="px-5">
                    <div class="row mb-3">
                        <div class="col-2 py-2">
                            상품번호
                            <!-- <p class="text-center">번호</p> -->
                        </div>
                        <div class="col-4">
                            <input type="text" class="form-control" placeholder="상품번호">
                        </div>
                        <div class="col-2 py-2">
                            상품명
                        </div>
                        <div class="col-4">
                            <input type="text" class="form-control" placeholder="상품명">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-2 py-2">
                            브랜드
                        </div>
                        <div class="col-4">
                            <select class="form-select brand_select" id="inputGroupSelect01">
                                <option selected>Choose...</option>
                                <option value="1">Reproduction of Found</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div class="col-2 py-2">
                            카테고리
                        </div>
                        <div class="col-4">
                            <select class="form-select" id="inputGroupSelect02">
                                <option selected>Choose...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div>
                    
                </div>
                <div class="d-flex justify-content-center mt-4">
                    <button class="btn btn-success btn-lg">검색</button>
                </div>
            </div>
            
            <!-- 검색 결과-->
            <div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col"><input class="form-check-input" type="checkbox" value=""></th>
                            <th scope="col">상품번호</th>
                            <th scope="col">상품명(영문)</th>
                            <th scope="col">상품명(한글)</th>
                            <th scope="col">브랜드</th>
                            <th scope="col">카테고리</th>
                            <th scope="col">데이터상세</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input class="form-check-input" type="checkbox" value=""></td>
                            <td>1</td>
                            <td>(W) Asics Gel-1130 Glacier Grey Pure Silver</td>
                            <td>(W) 아식스 젤 1130 글레이셔 그레이 퓨어 실버</td>
                            <td>Asics</td>
                            <td>운동화</td>
                            <td>사용중</td>
                        </tr>
                        <tr>
                            <td><input class="form-check-input" type="checkbox" value=""></td>
                            <td>1</td>
                            <td>(W) Asics Gel-1130 Glacier Grey Pure Silver</td>
                            <td>(W) 아식스 젤 1130 글레이셔 그레이 퓨어 실버</td>
                            <td>Asics</td>
                            <td>운동화</td>
                            <td>사용중</td>
                        </tr>
                        <tr>
                            <td><input class="form-check-input" type="checkbox" value=""></td>
                            <td>1</td>
                            <td>(W) Asics Gel-1130 Glacier Grey Pure Silver</td>
                            <td>(W) 아식스 젤 1130 글레이셔 그레이 퓨어 실버</td>
                            <td>Asics</td>
                            <td>운동화</td>
                            <td>사용중</td>
                        </tr>
                        <tr>
                            <td><input class="form-check-input" type="checkbox" value=""></td>
                            <td>1</td>
                            <td>(W) Asics Gel-1130 Glacier Grey Pure Silver</td>
                            <td>(W) 아식스 젤 1130 글레이셔 그레이 퓨어 실버</td>
                            <td>Asics</td>
                            <td>운동화</td>
                            <td>사용중</td>
                        </tr>
                        <tr>
                            <td><input class="form-check-input" type="checkbox" value=""></td>
                            <td>1</td>
                            <td>(W) Asics Gel-1130 Glacier Grey Pure Silver</td>
                            <td>(W) 아식스 젤 1130 글레이셔 그레이 퓨어 실버</td>
                            <td>Asics</td>
                            <td>운동화</td>
                            <td>사용중</td>
                        </tr>
                        <tr>
                            <td><input class="form-check-input" type="checkbox" value=""></td>
                            <td>1</td>
                            <td>(W) Asics Gel-1130 Glacier Grey Pure Silver</td>
                            <td>(W) 아식스 젤 1130 글레이셔 그레이 퓨어 실버</td>
                            <td>Asics</td>
                            <td>운동화</td>
                            <td>사용중</td>
                        </tr>
                        <tr>
                            <td><input class="form-check-input" type="checkbox" value=""></td>
                            <td>1</td>
                            <td>(W) Asics Gel-1130 Glacier Grey Pure Silver</td>
                            <td>(W) 아식스 젤 1130 글레이셔 그레이 퓨어 실버</td>
                            <td>Asics</td>
                            <td>운동화</td>
                            <td>사용중</td>
                        </tr>
                        <tr>
                            <td><input class="form-check-input" type="checkbox" value=""></td>
                            <td>1</td>
                            <td>(W) Asics Gel-1130 Glacier Grey Pure Silver</td>
                            <td>(W) 아식스 젤 1130 글레이셔 그레이 퓨어 실버</td>
                            <td>Asics</td>
                            <td>운동화</td>
                            <td>사용중</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <!-- 페이지 네이션-->
            <nav class="d-flex justify-content-center mt-4">
                <ul class="pagination">
                    <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                    </li>
                </ul>
            </nav>

            <div class="d-flex justify-content-center mt-3">
                <button class="btn btn-success btn-lg d-flex justify-content-end me-2" @click="moveProductRegister()">상품등록</button>
                <button class="btn btn-success btn-lg d-flex justify-content-start ms-2">상품삭제</button>
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
        
        const moveProductRegister = () =>{
            router.push({path:'/admin/prdouct/register'});
            //query:{no : code}
        }

        return {
            moveProductRegister
        }
    }
}
</script>

<style lang="css">
@import "../assets/css/common.css";

.search_condition {
    widows: 950px;
    margin-left: auto;
    margin-right: auto;
}

/* .search_button {
    margin-left: auto;
    margin-right: auto;
} */


</style>