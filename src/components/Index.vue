<template>
    <div style="margin-bottom:60px; overflow:auto;">
        <!-- 选中要显示的面板 -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="index">
                <!-- 应用首页面板组件 -->
                    <indexitem></indexitem>
            </mt-tab-container-item>
            <mt-tab-container-item id="kind">
                    <!-- 应用分类面板组件 -->
                    <kinditem></kinditem>
            </mt-tab-container-item>
            <mt-tab-container-item id="shop">
                   <!-- 应用购物车面板组件 -->
                   
            </mt-tab-container-item>
            <mt-tab-container-item id="me">
                    <!-- 应用用户面板组件 -->
                    
            </mt-tab-container-item>
        </mt-tab-container>
        <!-- 底部导航栏 -->
        <mt-tabbar v-model="selected" fixed>
            <mt-tab-item id="index" @click.native="changeState(0)">
                <tabbaricon
                :normalImage="require('../assets/home.png')"
                :selectedImage="require('../assets/home_active.png')"
                :focused="currentIndex[0].isSelect"></tabbaricon>
                首页
            </mt-tab-item>
            <mt-tab-item id="kind" @click.native="changeState(1)">
                <tabbaricon
                :normalImage="require('../assets/kind.png')"
                :selectedImage="require('../assets/kind_active.png')"
                :focused="currentIndex[1].isSelect"></tabbaricon>
                分类
            </mt-tab-item>
            <mt-tab-item id="shop" @click.native="changeState(2)" style="position:relative;">
                <tabbaricon
                :normalImage="require('../assets/shop.png')"
                :selectedImage="require('../assets/shop_active.png')"
                :focused="currentIndex[2].isSelect">
                <!-- 有有添加商品就显示红色数量园点 -->
                </tabbaricon>
                <div class="shopcart-red" v-show="count">{{count}}</div>
                
                购物
            </mt-tab-item>
            <mt-tab-item id="me" @click.native="changeState(3)">
                 <tabbaricon
                :normalImage="require('../assets/user.png')"
                :selectedImage="require('../assets/user_active.png')"
                :focused="currentIndex[3].isSelect"></tabbaricon>
                我的
            </mt-tab-item>
</mt-tabbar>
    </div>
</template>
<script>
// 引入首页面板组件
import IndexItem from "../views/index/IndexItem"
// 引入底部导航栏图标组件
import TabBarIcon from "./TabBarIcon"
// 引入分类面板组件
import KindItem from "../views/kind/KindItem"


    export default{
        data(){
            return{
                selected:"index",
                count:0,//保存购物车商品的数量
                isLogin:"",//保存是否登录的凭证
                // 保存焦点后的状态
                currentIndex:[
                    {isSelect:true},
                    {isSelect:false},
                    {isSelect:false},
                    {isSelect:false}
                ]
            }
        },
        mounted(){
            // 从数据库先查看购物车的商品数量，
                    var url="cart";
                    this.axios.get(url).then(res=>{
                        // 把是否登录的凭证数值保存起来
                        this.isLogin=res.data.code;
                        // 如果没有登录就不显示
                        if(res.data.code==-1){
                            return;
                        }else{
                            for(var item of res.data.data){
                                this.count+=Number(item.count);
                            }
                        }
                    })
        },
        methods:{
            // 将对当前参数的下标，对应的数组值修改为true,其他为false
            changeState(n){
                // 如果点击到
                if(n==2){
                    // 先判断用户是否登录 购物车有没有商品，然后跳转到相应的页面
                     if(this.count==0){
                        this.$router.push("/NullShop");
                    }else{
                        this.$router.push("/ShopCart");
                    }
                }
                if(n==3){
                    if(this.isLogin==-1){
                        this.$router.push("/Login");
                    }else{
                        this.$router.push("/LoginAfter");
                    }
                }
                for(var i=0;i<this.currentIndex.length;i++){
                    // 判断如果循环下标与n相等，相等显示对应的图片，其他都不显示
                    if(n==i){
                        this.currentIndex[i].isSelect=true;
                    }else{
                        this.currentIndex[i].isSelect=false;
                    }
                }
            },
            // jumpCart(){
            // //查看购物车操作
            // //跳转购物车组件
            // this.$router.push("/ShopCart")
            // },
        },
        // 注册
        components:{
            // 注册底部导航栏图标组件
            "tabbaricon":TabBarIcon,
            //注册首页面板组件
            "indexitem":IndexItem,
            // 注册分类面板组件
            "kinditem":KindItem,
        }
    }
</script>
<style scoped>
/* 修改选中的文字及背景样式 */
.mint-tabbar{
background-color: #fff;
}
.mint-tabbar > .mint-tab-item.is-selected{
    background-color: transparent;
    color: #ec563b;
}
/* 添加的购物车商品数量 */
.shopcart-red {
  position:absolute;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: red;
  color: white;
  font-size: 9px;
  line-height: 15px;
  text-align: center;
  right: 25px;
  top: 0;
  z-index: 100;
}
</style>
