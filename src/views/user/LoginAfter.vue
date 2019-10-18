<template>
<!-- 登录之后显示用户组件 -->
    <div>
        <!-- 头部 -->
        <div class="header">
            <div class="header-left" @click="go">
                  <img src="../../assets/return.png" alt="图片已损坏">
            </div>
            <div class="header-right">
                <div class="le">
                    <img src="../../assets/home.png" alt="图片已损坏">
                </div>
                <div class="ri">
                    <img src="../../assets/setdata_img.png" alt="图片已损坏">
                </div>
            </div>
        </div>
        <!-- 用户头像 -->
        <div class="head-portrait">
            <div class="icon">
                <img src="../../assets/user-img.png" alt="图片已损坏">
            </div>
            <p>{{uname}}</p>
            <span>普通会员</span>
        </div>
        <div class="info">
            <span>消息</span>
            <span>关联账号</span>
        </div>
        <!-- 订单头 -->
        <div class="order-div">
            <div class="order-div-le">
                <img src="../../assets/order-icon.png" alt="图片已损坏">
                <span>我的订单</span>
            </div>
            <img src="../../assets/link.png" alt="图片已损坏">
        </div>
        <!-- 订单内容 -->
        <div class="myOrder">
            <div class="myOrder-div">
                <img src="../../assets/order_img1.png" alt="图片已损坏">
                <span>未处理</span>
            </div>
            <div class="myOrder-div">
                <img src="../../assets/order_img2.png" alt="图片已损坏">
                <span>处理中</span>
            </div>
            <div class="myOrder-div">
                <img src="../../assets/order_img3.png" alt="图片已损坏">
                <span>已完成</span>
            </div>
        </div>
        <!-- 我的资产 -->
        <div class="property-div">
            <div class="property-div-le">
                <img src="../../assets/property-icon.png" alt="图片已损坏">
                <span>我的资产</span>
            </div>
            <img src="../../assets/link.png" alt="图片已损坏">
        </div>
        <!-- 资产内容 -->
        <div class="myProperty">
            <div class="myProperty-div">
                <img src="../../assets/integeral_img.png" alt="图片已损坏">
                <span>积分</span>
            </div>
            <div class="myProperty-div">
                <img src="../../assets/bill_img.png" alt="图片已损坏">
                <span>账单</span>
            </div>
        </div>
        <!-- 我的资料 -->
        <div class="mydata-div">
            <div class="mydata-div-le">
                <img src="../../assets/mydata_img.png" alt="图片已损坏">
                <span>我的资料</span>
            </div>
            <img src="../../assets/link.png" alt="图片已损坏">
        </div>
        <!-- 我的设置 -->
        <div class="setdata-div">
            <div class="setdata-div-le">
                <img src="../../assets/setdata_img.png" alt="图片已损坏">
                <span>设置</span>
            </div>
            <img src="../../assets/link.png" alt="图片已损坏">
        </div>
        <!-- 退出登录 -->
        <div class="log-out">    
            <mt-button size="large" @click.native="outLogin">退出登录</mt-button>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                uname:""
            }
        },
        props:{
            userName:{default:""}
        },
        created(){
            // 创建接口
            var url="LoginA";
            this.axios.get(url).then(res=>{
                //如果传来的是 说明没登录
                if(res.data.code==-1){
                    this.uname="请登录"
                }else{
                    //登录就显示用户名
                    this.uname=res.data.data[0].uname;
                }
            });
        },
        methods:{
             go(){
                this.$router.go(-1);//返回上一层
            },
            outLogin(){
                // 创建接口
                var url="LoginA";
                // 创建用于退出登录的参数，有值即可
                var out="1"
                var obj={out:out}
                this.axios.get(url,{params:obj}).then(res=>{
                    if(res.data.code==-1){
                      // 提示用户登录
                      this.$toast('请登录');
                     //跳转值登录页面
                     this.$router.push("/Login");
                    }
                });
            }
        }
    }
</script>
<style scoped>
/* 头部 */
    .header{
        width: 100%;
        height: 35px;
        display: flex;
        justify-content:space-between;
        align-items: center;
    }
    /* 头部左边返回 */
    .header-left{
        width: 14px;
        height: 14px;
    }
    .header-left>img{
         width: 100%;
        height: 100%;
    }
  /* 头部右边 */
  .header-right{
      width: 60px;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  .header-right>.le{
      width: 18px;
      height: 17px;
  }
  .header-right>.le>img{
      width: 100%;
    height: 100%;
  }
  .header-right>.ri{
      width: 18px;
      height: 17px;
  }
  .header-right>.ri>img{
      width: 100%;
    height: 100%;
  }
  /* 用户头像部分 */
  .head-portrait{
      width: 100%;
      height: 110px;
      display: flex;
      flex-direction: column;
      align-items: center;
  }
  .head-portrait>.icon{
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
  }
  .head-portrait>.icon>img{
     width:100%;
      height:100%; 
      display: block;
  }
  .head-portrait>p{
      margin: 0;
      display: block;
    float: left;
    font-size: 0.32rem;
    color: #666666;
    margin-top: 0.05rem;
  }
  .head-portrait>span{
      text-align: center;
    font-size: 0.24rem;
    margin-bottom: 0.1rem;
    color: #999999;
  }
  /* 信息 */
  .info{
      width: 100%;
      height: 47px;
    border-top: 0.01rem solid #eeeeee;
    border-bottom: 0.01rem solid #eeeeee;
    padding: 0.2rem;
    overflow: hidden;
    display: flex;
    justify-content: space-around; 
    align-items: center;    
  }
  .info>span{
      display: block;
    line-height: 0.46rem;
    text-align: center;
    font-size: 16px;
    color: #555;
  }
  /* 我的订单头 */
  .order-div{
      width: 100%;
      height: 47px;
      display: flex;
      justify-content: space-between;
      align-items: center;
     border-bottom: 0.01rem solid #eeeeee;
  }
  .order-div-le{
    display: flex;
    align-items: center;
  }
  .order-div-le>img{
      width: 24px;
      height: 24px; 
      margin-right: 5px;
  }
  .order-div>img:last-child{
      width: 10px;
      height: 17px;
  }
  /* 订单内容 */
  .myOrder{
      width: 100%;
      height: 86px;
      display: flex;
      justify-content:space-around;
      align-items: center;
  }
  .myOrder-div{
      width: 30%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  }
  .myOrder-div>img{
      width: 27px;
      height: 27px;
  }
  /* 我的资产 */
  .property-div{
      width: 100%;
      height: 47px;
      display: flex;
      justify-content: space-between;
      align-items: center;
     border-bottom: 0.01rem solid #eeeeee;
  }
  .property-div-le{
    display: flex;
    align-items: center;
  }
  .property-div-le>img{
      width: 24px;
      height: 24px; 
      margin-right: 5px;
  }
  .property-div>img:last-child{
      width: 10px;
      height: 17px;
  }
  /* 资产内容 */
  .myProperty{
      width: 100%;
      height: 86px;
      display: flex;
      align-items: center;
  }
  .myProperty-div{
      width: 30%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  }
  .myProperty-div>img{
      width: 27px;
      height: 27px;
  }
  /* 我的资料 */
  .mydata-div{
      width: 100%;
      height: 47px;
      display: flex;
      justify-content: space-between;
      align-items: center;
     border-bottom: 0.01rem solid #eeeeee;
  }
  .mydata-div-le{
    display: flex;
    align-items: center;
  }
  .mydata-div-le>img{
      width: 24px;
      height: 24px; 
      margin-right: 5px;
  }
  .mydata-div>img:last-child{
      width: 10px;
      height: 17px;
  }
  /* 设置 */
  .setdata-div{
      width: 100%;
      height: 47px;
      display: flex;
      justify-content: space-between;
      align-items: center;
     border-bottom: 0.01rem solid #eeeeee;
  }
  .setdata-div-le{
    display: flex;
    align-items: center;
  }
  .setdata-div-le>img{
      width: 24px;
      height: 24px; 
      margin-right: 5px;
  }
  .setdata-div>img:last-child{
      width: 10px;
      height: 17px;
  }
  .log-out{
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f5f5f5;
  }
</style>
