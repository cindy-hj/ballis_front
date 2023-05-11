<template>
    <div class="container common_mt160 admin_wrap">
        <admin-sub-menu></admin-sub-menu>
        <div class="admin_content">
            <h1 class="mb-4">| 문의관리</h1>
            <!-- 검색 영역 -->
            <div class="mb-5">
                <h2 class="mb-4">문의 검색</h2>
                <div class="px-5">
                    <div class="row mb-3">
                        <div class="col-2 py-2">
                            회원번호
                            <!-- <p class="text-center">번호</p> -->
                        </div>
                        <div class="col-4">
                            <input type="text" class="form-control" placeholder="회원번호">
                        </div>
                        <div class="col-2 py-2">
                            문의유형
                        </div>
                        <div class="col-4">
                            <select class="form-select brand_select" id="inputGroupSelect01">
                                <option selected>Choose...</option>
                                <option value="1">구매관련</option>
                                <option value="2">판매관련</option>
                                <option value="3">기타</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-2 py-2">
                            문의제목
                        </div>
                        <div class="col-4">
                            <input type="text" class="form-control" placeholder="문의제목">
                        </div>
                        <div class="col-2 py-2">
                            문의처리상태
                        </div>
                        <div class="col-4">
                            <select class="form-select brand_select" id="inputGroupSelect01">
                                <option selected>Choose...</option>
                                <option value="1">처리중</option>
                                <option value="2">처리완료</option>
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
                            <th scope="col"></th>
                            <th scope="col">문의번호</th>
                            <th scope="col">문의유형</th>
                            <th scope="col">문의제목</th>
                            <th scope="col">문의작성자</th>
                            <th scope="col">문의처리상태</th>
                            <th scope="col">문의등록일</th>
                            <th scope="col">문의답변일</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input class="form-check-input" type="checkbox" value=""></td>
                            <td>1</td>
                            <td>구매관련</td>
                            <td>구매관련해서 문의드립니다</td>
                            <td>140</td>
                            <td>처리완료</td>
                            <td>2023/04/05</td>
                            <td>2023/04/07</td>
                        </tr>
                        <tr>
                            <td><input class="form-check-input" type="checkbox" value=""></td>
                            <td>1</td>
                            <td>구매관련</td>
                            <td>배송은언제쯤되나요</td>
                            <td>140</td>
                            <td>처리중</td>
                            <td>2023/04/05</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><input class="form-check-input" type="checkbox" value=""></td>
                            <td>1</td>
                            <td>구매관련</td>
                            <td>배송은언제쯤되나요</td>
                            <td>140</td>
                            <td>처리중</td>
                            <td>2023/04/05</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><input class="form-check-input" type="checkbox" value=""></td>
                            <td>1</td>
                            <td>구매관련</td>
                            <td>배송은언제쯤되나요</td>
                            <td>140</td>
                            <td>처리중</td>
                            <td>2023/04/05</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><input class="form-check-input" type="checkbox" value=""></td>
                            <td>1</td>
                            <td>구매관련</td>
                            <td>배송은언제쯤되나요</td>
                            <td>140</td>
                            <td>처리중</td>
                            <td>2023/04/05</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><input class="form-check-input" type="checkbox" value=""></td>
                            <td>1</td>
                            <td>구매관련</td>
                            <td>배송은언제쯤되나요</td>
                            <td>140</td>
                            <td>처리중</td>
                            <td>2023/04/05</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><input class="form-check-input" type="checkbox" value=""></td>
                            <td>1</td>
                            <td>구매관련</td>
                            <td>배송은언제쯤되나요</td>
                            <td>140</td>
                            <td>처리중</td>
                            <td>2023/04/05</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><input class="form-check-input" type="checkbox" value=""></td>
                            <td>1</td>
                            <td>구매관련</td>
                            <td>배송은언제쯤되나요</td>
                            <td>140</td>
                            <td>처리중</td>
                            <td>2023/04/05</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><input class="form-check-input" type="checkbox" value=""></td>
                            <td>1</td>
                            <td>구매관련</td>
                            <td>배송은언제쯤되나요</td>
                            <td>140</td>
                            <td>처리중</td>
                            <td>2023/04/05</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><input class="form-check-input" type="checkbox" value=""></td>
                            <td>1</td>
                            <td>구매관련</td>
                            <td>배송은언제쯤되나요</td>
                            <td>140</td>
                            <td>처리중</td>
                            <td>2023/04/05</td>
                            <td></td>
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

            <!-- <div class="d-flex justify-content-center mt-3">
                <button class="btn btn-success btn-lg d-flex justify-content-start">회원삭제</button>
            </div> -->
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

<style lang="css" scoped>
@import "../assets/css/common.css";

</style>