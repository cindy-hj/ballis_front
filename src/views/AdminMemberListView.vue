<template>
    <div class="container common_mt160 admin_wrap">
        <admin-sub-menu></admin-sub-menu>
        <div class="admin_content">
            <h1 class="mb-4">| 회원관리</h1>

            <!-- 검색 영역 -->
            <div class="mb-5">
                <h2 class="mb-4">회원 검색</h2>
                <div class="search-condition px-5">
                    <div class="row mb-3">
                        <div class="col-2 py-2">
                            회원번호
                            <!-- <p class="text-center">번호</p> -->
                        </div>
                        <div class="col-4">
                            <input type="text" class="form-control" placeholder="회원번호">
                        </div>
                        <div class="col-2 py-2">
                            회원이름
                        </div>
                        <div class="col-4">
                            <input type="text" class="form-control" placeholder="상품명">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-2 py-2">
                            이메일
                        </div>
                        <div class="col-4">
                            <input type="text" class="form-control" placeholder="이메일">
                        </div>
                        <div class="col-2 py-2">
                            휴대폰번호
                        </div>
                        <div class="col-4">
                            <input type="text" class="form-control" placeholder="휴대폰번호">
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
                            <th scope="col">회원번호</th>
                            <th scope="col">회원이름</th>
                            <th scope="col">이메일</th>
                            <th scope="col">휴대폰번호</th>
                            <th scope="col">가입일</th>
                            <th scope="col">회원상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input class="form-check-input" type="checkbox" value=""></td>
                            <td>1</td>
                            <td>한여름</td>
                            <td>hotsummer@naver.com</td>
                            <td>010-5555-4444</td>
                            <td>2023/04/22</td>
                            <td>일반회원</td>
                        </tr>
                        <tr>
                            <td><input class="form-check-input" type="checkbox" value=""></td>
                            <td>1</td>
                            <td>한여름</td>
                            <td>hotsummer@naver.com</td>
                            <td>010-5555-4444</td>
                            <td>2023/04/22</td>
                            <td>일반회원</td>
                        </tr>
                        <tr>
                            <td><input class="form-check-input" type="checkbox" value=""></td>
                            <td>1</td>
                            <td>한여름</td>
                            <td>hotsummer@naver.com</td>
                            <td>010-5555-4444</td>
                            <td>2023/04/22</td>
                            <td>일반회원</td>
                        </tr>
                        <tr>
                            <td><input class="form-check-input" type="checkbox" value=""></td>
                            <td>1</td>
                            <td>한여름</td>
                            <td>hotsummer@naver.com</td>
                            <td>010-5555-4444</td>
                            <td>2023/04/22</td>
                            <td>일반회원</td>
                        </tr>
                        <tr>
                            <td><input class="form-check-input" type="checkbox" value=""></td>
                            <td>1</td>
                            <td>한여름</td>
                            <td>hotsummer@naver.com</td>
                            <td>010-5555-4444</td>
                            <td>2023/04/22</td>
                            <td>일반회원</td>
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
                <button class="btn btn-success btn-lg d-flex justify-content-start">회원삭제</button>
            </div>  
        </div>
    </div>
    
</template>

<script>
import AdminSubMenu from '@/components/AdminSubMenu.vue'

export default {
    name: 'SubMenu',
    components: {
        AdminSubMenu
    },
    setup () {
        

        return {}
    }
}
</script>

<style lang="css">
@import "../assets/css/common.css";

/* .admin_wrap {
    width: 1280px;
    margin-left: auto;
    margin-right: auto;
    padding: 0px 20px;
    overflow: hidden;
} */
/* .admin_member_list {
    width: 1000px;
    float: left;
} */
</style>