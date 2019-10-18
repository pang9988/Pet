import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// 完整引入mint-ui组件库中的所有组件
import MintUI from "mint-ui";
// 2.单独引入mint-ui组件中的样式文件
import "mint-ui/lib/style.css";
// 注册mint-ui
Vue.use(MintUI);
// 配置axios，引入第三方ajax请求模块
import axios from "axios";
// 注册axios，由于axios不支持use将实列添加vue原型
Vue.prototype.axios = axios;
// 配置axios基础路径
// axios.defaults.baseURL = "http://pelww.applinzi.com/";
axios.defaults.baseURL = "http://pelww.applinzi.com/";
// 配置axios保存sess信息
axios.defaults.withCredentials = true;
//9:引入vuex 第三方模块
import Vuex from "vuex";
//11:注册Vuex  顺序
//先注册再创建实例对象
Vue.use(Vuex);
//10:创建Vuex存储实例对象
var store = new Vuex.Store({
  state: { cartCount: 0 }, //共享数据
  mutations: {
    //添加修改数据函数
    increment(state) {
      //购物车数量加1
      state.cartCount++;
    },
    clear(state) {
      //清空购物车
      state.cartCount = 0; //购物车数量清零
    }
  },
  getters: {
    //添加获取数据函数
    getCartCount(state) {
      return state.cartCount;
    }
  },
  actions: {} //添加异步操作数据函数
});
// 引入自定义全局组件
import Scroller from "./components/Scroller.vue";
// 注册
Vue.component("scroller", Scroller);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
  store
}).$mount("#app");
