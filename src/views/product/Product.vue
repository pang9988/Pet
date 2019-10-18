<template>
<!-- 详情页 -->
    <div>
        <!-- 商品头 -->
        <div class="register-head">
            <span class="small" @click="go">＜</span>
            <span>商品</span>
        </div>
        <!-- 商品轮播图 -->
       <mt-swipe :auto="3000" class="product1">
            <mt-swipe-item><img class="img" :src="'http://pelww.applinzi.com/' + list.Pimg"  alt="图片以损坏"></mt-swipe-item>
            <mt-swipe-item><img class="img" :src="'http://pelww.applinzi.com/' + list.Pimg" alt="图片以损坏"></mt-swipe-item>
            <mt-swipe-item><img class="img" :src="'http://pelww.applinzi.com/' + list.Pimg" alt="图片以损坏"></mt-swipe-item>
       </mt-swipe>
       <!-- 商品内容 -->
       <p class="product-content">
          {{list.pname}}
       </p>
       <!-- 商品价格 -->
       <span class="prict">
         ￥{{list.price}}
       </span>
       <!-- 相关推荐 -->
        <div class="relevant">相关推荐</div>
        <div class="relevant-content">
            <div class="relevant-item">
                <img src="../../assets/product/hot-1.png" alt="图片已损环">
                <p>怡亲猫罐头 猫用吞拿鱼鸡肉配方猫粮罐头80g*10 猫湿粮</p>
                <span>￥145元</span>
            </div>
            <div class="relevant-item">
                <img src="../../assets/product/hot-2.png" alt="图片已损环">
                <p>怡亲猫罐头 猫用吞拿鱼鸡肉配方猫粮罐头80g*10 猫湿粮</p>
                <span>￥145元</span>
            </div>
            <div class="relevant-item">
                <img src="../../assets/product/hot-3.png" alt="图片已损环">
                <p>怡亲猫罐头 猫用吞拿鱼鸡肉配方猫粮罐头80g*10 猫湿粮</p>
                <span>￥145元</span>
            </div>
        </div>
        <!-- 底部选项 -->
        <div class="product-bottom">
            <div class="product-bottom-left">
                <div class="bottom-left-content" @click="goIndex">
                    <img src="../../assets/product/home.png" alt="图片已损坏">
                    <span>首页</span>
                </div>
                <div class="bottom-left-content">
                    <img src="../../assets/product/tuijian.png" alt="图片已损坏">
                    <span>推荐</span>
                </div>
                <div class="bottom-left-content">
                    <img src="../../assets/product/shoucang.png" alt="图片已损坏">
                    <span>收藏</span>
                </div>
            </div>
            <div class="product-bottom-right">
                <div class="add-shop" @click="isShow">加入购物车</div>
                <div class="purchase">立即购买</div>
            </div>
        </div>
        <!-- 遮罩层 -->
        <div class="popContainer" v-show="show" @click="isShow"></div>
         <!-- 加入购物车 -->
        <div class="add-shop-content" v-show="show">
                 <div class="add-shop-item">
                     <!-- 图片 -->
                     <img class="img" :src="'http://pelww.applinzi.com/' + list.Pimg"  alt="图片以损坏">
                     <!-- 内容 -->
                     <div class="add-shop-product-content">
                         <span>{{list.pname}}</span>
                         <span>￥{{list.price}}</span>
                     </div>
                     <!-- 清除隐藏 -->
                     <div class="add-shop-item-clear" @click="isShow"><span>×</span></div>
                 </div>
                 <!-- 总的价格和添加按钮 -->
                 <div class="subtotal">
                     <span>￥{{sum}}</span>
                     <div class="btn">
                         <span @click="reduce">－</span>
                         <input type="text" v-model="vulue">
                         <span @click="add">＋</span>
                     </div>
                 </div>
                 <!-- @click.native="pushshop" -->
                <mt-button size="large" @click.native="addCart"
                :data-pid="list.pid"
                :data-Pimg="list.Pimg"
                :data-pname="list.pname"
                :data-price="list.price"
                :data-count="vulue"
                >确定</mt-button>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
             return{
                 list:{Pimg:'3170817_1249396_11467971609.jpg'},//保存数据请求回来的数据
                 show:"",//遮罩层和加入购物车显示或隐藏的状态
                 vulue:"1",//加入购物车商品的数量
             }
        },
        // 获取地址栏传来的参数
        props:["pid"],
        computed:{
           sum(){
            var sum1=this.list.price*this.vulue;
            return sum1;
           } 
        },
        created(){
            // 发送ajax请求
            var url="product";
            var obj={pid:this.pid}
            this.axios.get(url,{params:obj}).then(res=>{
                this.list=res.data.data[0];
            });
        },
        methods:{
            // 点击确定时加入购物车
            addCart(e){
                // 将功能添加至购物车
                //获取当前商品的编号
                var pid=e.target.dataset.pid;
                //获取当前商品图片
                var Pimg=e.target.dataset.pimg;
                //获取当前商品的名称
                var pname=e.target.dataset.pname;
                // 获取当前商品的价格
                var price=e.target.dataset.price;
                // 获取当前商品的数量
                var count=e.target.dataset.count;
                // 发送ajax请求 
                //创建请求接口
                var url="addcart";
                //请求参数
                var obj={pid:pid,Pimg:Pimg,pname:pname,price:price,count:count};
                //请求返回结果
                this.axios.get(url,{params:obj}).then(res=>{
                    // 如果返回-1提示用户登录
                    if(res.data.code===-1){
                        this.$toast("请先登录")
                    }else{
                         this.$toast("添加成功")
                    }
                });
            },
            // 点击减按钮时商品数量自减
            reduce(){
                if(this.vulue==1){
                    this.$messagebox("信息","数量不能小于或大于1000");
                }
                if(this.vulue>1){
                    this.vulue--;
                }
            },
            // 点击加按钮时增加商品数量
            add(){
                if(this.vulue==999){
                    this.$messagebox("信息","数量不能小于或大于1000");
                }
                if(this.vulue<1000){
                     this.vulue++;
                }
            },
            // 显示加入购物车组件
            isShow(){
                 this.show=!this.show;   
            },
            goIndex(){
                //跳到首页
                this.$router.push("/");
            },
            go(){
                this.$router.go(-1);//返回上一层
            }
        }
    }
</script>
<style scoped>

/* 顶部头 */
    .register-head{
    width: 100%;
    background-color: #FFF;
    position: relative;
    overflow: hidden;
    padding: 5px 0;
    z-index: 9;
    border-bottom: 1px solid #e2e2e2;
    }
    .register-head>.small{
        float: left;
        color: #e2e2e2;
        font-size: 28px;
    }
    .register-head>span:nth-child(2){
        text-align: center;
        line-height: 37px;
        margin-left:-5%;
    }
    /* 轮播图图片 */
    div>.product1{
   width: 100%;
    height:300px;
   }
   .img{
    width: 100%;
    height:300px;
   }
   /* 价格文字 */
   .prict{
       width: 100%;
       text-align: left;
       color: red;
       font-weight: bold;
       font-size: 20px;
       display:block;
       margin-bottom:20px; 
   }
   /* 本商品内容 */
   .product-content{
    width: 100% !important;
    display: block;
    float: left;
    font-size: 15px;
    color: #232326;
    font-weight: normal;
    width: inherit;
    text-align: left;
   }
   /* 相关推荐 */
   .relevant{
      font-size: 14px; 
      color: #676767;
      margin:10px;
      padding: 0;
      text-align: left;
   }
   .relevant-content{
       display: flex;
       width: 100%;
       height: 200px;
       margin-bottom: 60px;

   }
   .relevant-content>.relevant-item{
       display: flex;
       flex-direction: column;
       margin: 10px 5px 0;
   }
   .relevant-item>img{
     width:100%;
     height: 121px; 
   }
   .relevant-item>p{
       width: 100%;
       font-size: 14px;
       line-height: 24px;
       overflow: hidden;
       -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        display:-webkit-box;
        -webkit-box-orient: vertical;
        color: #222;
        margin: 0;
        padding: 0;
   }
   .relevant-item>span{
       text-align: left;
       display: block;
       width: 100%;
       overflow: hidden;
       height: 20px;
       line-height: 20px;
       margin: 2px 0 5px;
       color: red;
   }
   /* 底部功能模块 */
   .product-bottom{
       position: fixed;
       bottom: 0;
       width: 100%;
       height: 53px;
       display: flex;
       background: #fff;
   }
   /* 底部功能模块 左 */
   .product-bottom-left{
       width: 50%;
       height: 100%;
       display: flex;
       justify-content: space-around;
       align-items: center;
   }
   .bottom-left-content{
       display: flex;
       flex-direction: column;
       align-items: center;
   }
   .bottom-left-content>span{
      color: #8a8a8a;
      font-size: 12px; 
   }
   .bottom-left-content>img{
       width: 20px;
       height: 20px;
       margin: 0 auto;
   }
   /* 底部功能模块 右 */
   .product-bottom-right{
       width: 50%;
       height: 100%;
       display: flex;
   }
   .add-shop{
       width: 50%;
       height: 100%;
       background: #FF6507;
       color: #fff;
       line-height: 50px;
   }
   .purchase{
       width: 50%;
       height: 100%;
       background: #ff8a00;
       color: #fff;
       line-height: 50px;
   }
   /* 遮罩层 */
    div.popContainer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
/* 加入购物车总体 */
.add-shop-content{
    width: 100%;
    z-index: 11;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
}
.add-shop-item{
    width: 100%;
    height: 75px;
    display: flex;
    justify-content:space-around;
    border-bottom: 2px solid #EDEDED;
    
}
/* 加入购物车商品图片 */
.add-shop-item>img{
    width: 100px;
    height: 100px;
    padding-bottom: 10px;
    position: relative;
    top: -40px;
}
/*加入购物车商品信息 */ 
.add-shop-product-content{
    width: 190px;
    height: 75px;
    display: flex;
    flex-direction: column;
}
.add-shop-product-content>span:first-child{
    font-size: 16px;
    color: #3e3e3e;
    margin-top: 5px;
    height: auto;
    line-height: 21px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
/* 加入购物车商品价格 */
.add-shop-product-content>span:nth-child(2){
  color: red;
  text-align: left;
}
/* 清除隐藏  */
.add-shop-item-clear{
    width: 30px;
    height: 30px;
    border: 1px solid #9F9F9F;
    border-radius: 50%;
    position: relative;
    top:20px;
}
.add-shop-item-clear>span{
    font-size:26px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top:-50%;
    margin-left: -7.5px;

}
/* 小计 */
.subtotal{
    width: 100%;
    height: 75px;
    display: flex;
    justify-content:space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;

}
.subtotal>span{
    color: #F00;
    font-size: 18px;
}
/* 按钮 */
.subtotal>.btn{
    width: 99px;
    height: 27px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #CCCCCC;
}

.btn>input{
    width: 35px;
    text-align: center;
    font-size: 14px;
    text-shadow: none;
    text-transform: none;
    outline: none;
    border: 0;
    background: #fff;
}

.btn>span{
    text-align: center;
    display:inline-block;
    font-weight: bold;
    width: 27px;
    height: 27px;
}
.btn>span:nth-child(3){
    border-left: 1px solid #CCCCCC;
}
.btn>span:first-child{
    border-right: 1px solid #CCCCCC;
}
</style>