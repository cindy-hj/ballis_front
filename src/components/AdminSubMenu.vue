<template>
    <div class="admin_submenu">
        <div class>
            <h2>관리자메뉴</h2>
        </div>
        <nav>
            <ul class="list-unstyled">
                <li class="mb-3">
                    <router-link to="/admin/member/list">회원관리</router-link>
                </li>
                <li class="mb-3">
                    <router-link to="/admin/prdouct/list">상품관리</router-link>
                </li>
                <li class="mb-3">보관상품관리</li>
                <li class="mb-3">판매관리</li>
                <li class="mb-3">구매관리</li>
                <li class="mb-3">거래관리</li>
                <li class="mb-3">
                    <router-link to="/admin/inquiry/list">문의관리</router-link>
                </li>
                <li class="mb-3">공지관리</li>
                <li class="mb-3">리뷰관리</li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="css" scoped>
.admin_submenu {
    width: 180px;
    margin-right: 20px;
    float: left;
}

a {
    font-weight: bold;
    text-decoration: none;
    color : #2c3e50;
}

li {
    font-size: large;
}

nav {
    margin-top: 30px;
    margin-left: 10px;
}

nav a.router-link-exact-active {
  color: #42b983;
} 
</style>