<template>
    <HeaderComponent class="fixed-top"></HeaderComponent>
    <router-view></router-view>
    <footer-component class="footer_mg"></footer-component>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
    components: {
        HeaderComponent,
        FooterComponent
    }
}
</script>

<style>
</style>
