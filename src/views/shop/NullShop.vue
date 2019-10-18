<template>
<!-- 购物车显示面板组件 -->
    <div class="shop">
        <div>
           <a href="javascript:;" class="return_url" @click="go"><img src="../../assets/return.png"></a>
            购物车
        </div>
        <img src="../../assets/shop/shop.png" alt="图片已损坏">
        <span>空空如也~</span>
        <p>快去买买买给自己一个惊喜吧</p>
    </div>
</template>
<script>
    export default{
        data(){
            return{}
        },
        methods:{
            go(){
                this.$router.go(-1);//返回上一层
            },
        }
    }
</script>
<style scoped>
/* 购物车头 */
.shop>div{
    position: fixed;
    z-index:10;
    text-align: center;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    line-height: 40px;
    max-width: 648px;
    padding: 0 60px;
    margin: 0 auto;
    border-bottom: 1px solid #C7C7C7;
    background-image: -webkit-linear-gradient(top,#FEFEFE,#F8F8F8);
}
.return_url{
    left: 10px;
    display: inline-block;
    line-height: 40px;
    width: 20px;
    z-index: 30;
    position: fixed;
    
}
.return_url>img{
    width:20px;
    height:20px;
    vertical-align: middle;
}
.shop{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.shop>img{
    margin-top: 30%;
    width: 106px;
    height: 106px;
}
.shop>span{
    font-size: 16px;
    margin-top: 20px;
    line-height: 22px;
}
.shop>p{
    font-size: 14px;
    color: #c2c2c2;
}
</style>
