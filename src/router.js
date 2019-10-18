import Vue from 'vue'
import Router from 'vue-router'
import Index from "@/components/Index"
// 引入注册组件
import Register from "./views/user/Register.vue"
// 引入登录组件
import Login from "./views/user/Login.vue"
// 引入详情组件
import Product from "./views/product/Product.vue"
// 引入购物车组件
import ShopCart from "./views/shop/ShopCart.vue"
// 引入空的购物车组件
import NullShop from "./views/shop/NullShop.vue"
// 引入登录之后的组件 
import LoginAfter from "./views/user/LoginAfter.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', component: Index},
    {path: '/Login', component: Login},
    {path: '/Register', component: Register},
    {path: '/Product/:pid', component: Product,props:true},
    {path: '/ShopCart', component: ShopCart},
    {path: '/NullShop', component: NullShop},
    {path: '/LoginAfter', component:LoginAfter}
  ]
})
