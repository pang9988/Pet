<template>
    <div>
        <!-- 应用顶部组件 -->
        <indexhead></indexhead>
        <!-- 应用轮播图组件 -->
        <carousel></carousel>
        <!-- 应用搜索框组件 -->
        <search></search>
        <!-- 应用分类组件 -->
        <kind></kind>
        <!-- 应用热卖组件 -->
        <hotsale></hotsale>
        <!--应用热卖品牌组件 -->
        <hotbrand></hotbrand>
        <!-- 应用新品推荐组件 -->
        <recommendproduct></recommendproduct>

    </div>
</template>
<script>
// 引入顶部组件
import IndexHead from "./IndexHead"
// 引入轮播图组件
import Carousel from "./Carousel"
// 引入搜索框组件
import Search from "./Search"
// 引入分类组件
import Kind from "./Kind"
// 引入热卖组件
import hotSale  from "./hotSale"
// 引入热卖品牌组件
import HotBrand from "./HotBrand"
// 引入新品推荐组件
import RecommendProduct from "./RecommendProduct"
    export default{
        data(){
            return{
                
            }
        },
        // 注册
        components:{
            // 注册顶部组件
            "indexhead":IndexHead,
            //注册轮播图组件
            "carousel":Carousel,
            // 注册搜索框组件
            "search":Search,
            // 注册分类组件
            "kind":Kind,
            // 注册热卖组件
            "hotsale":hotSale,
            // 注册热卖品牌组件
            "hotbrand":HotBrand,
            // 注册新品推荐组件
            "recommendproduct":RecommendProduct
        }
    }
</script>
<style>
#nav{
    padding:0;
}
</style>
