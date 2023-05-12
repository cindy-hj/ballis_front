import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import ProductListView from '../views/ProductListView'
import ProductOneView from '../views/ProductOneView'

import BuyingSizeView from '../views/BuyingSizeView'
import BuyingMethodView from '../views/BuyingMethodView'
import BuyingPaymentView from '../views/BuyingPaymentView'
import BuyingCompleteView from '../views/BuyingCompleteView'

import SellingSizeView from '../views/SellingSizeView'
import SellingMethodView from '../views/SellingMethodView'
import SellingPaymentView from '../views/SellingPaymentView'
import SellingCompleteView from '../views/SellingCompleteView'

import AdminProductListView from '../views/AdminProductListView.vue'
import AdminMemberListView from '../views/AdminMemberListView.vue'
import AdminProductRegisterView from '../views/AdminProductRegisterView.vue'
import AdminMemberEditView from '../views/AdminMemberEditView.vue'
import AdminInquiryListView from '../views/AdminInquiryListView.vue'
import AdminInquiryReplyView from '../views/AdminInquiryReplyView.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainView
  },
  {
    path: '/product/list',
    name: 'productlist',
    component: ProductListView
  },
  {
    path: '/product/one',
    name: 'productone',
    component: ProductOneView
  },
  {
    path: '/buying/size',
    name: 'buyingsizes',
    component: BuyingSizeView
  },
  {
    path: '/buying/method',
    name: 'buyingmethod',
    component: BuyingMethodView
  },
  {
    path: '/buying/payment',
    name: 'buyingpaymnet',
    component: BuyingPaymentView
  },
  {
    path: '/buying/complete',
    name: 'buyingcomplete',
    component: BuyingCompleteView
  },
  {
    path: '/selling/size',
    name: 'sellingsizes',
    component: SellingSizeView
  },
  {
    path: '/selling/method',
    name: 'sellingmethod',
    component: SellingMethodView
  },
  {
    path: '/selling/payment',
    name: 'sellingpayment',
    component: SellingPaymentView
  },
  {
    path: '/selling/complete',
    name: 'sellingcomplete',
    component: SellingCompleteView
  },
  {
    path: '/admin/prdouct/list',
    name: 'adminprdouctlist',
    component: AdminProductListView
  },
  {
    path: '/admin/member/list',
    name: 'adminmemberlist',
    component: AdminMemberListView
  },
  {
    path: '/admin/prdouct/register',
    name: 'adminprdouctregister',
    component: AdminProductRegisterView
  },
  {
    path: '/admin/member/edit',
    name: 'adminmemberedit',
    component: AdminMemberEditView
  },
  {
    path: '/admin/inquiry/list',
    name: 'admininquirylist',
    component: AdminInquiryListView
  }
  ,
  {
    path: '/admin/inquiry/reply',
    name: 'admininquiryreply',
    component: AdminInquiryReplyView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior () { // TODO 페이지 이동시 바로 위에 와있게끔 할 것
    return { 
      top:0
     }
  }
})

export default router
