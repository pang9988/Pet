<template>
<!-- 用户登录组件 -->
    <div class="user">
        <div class="register-head">
            <span class="small" @click="go">＜</span>
            <span>会员登录</span>
        </div>
        <div class="user-head">
            <div><img src="../../assets/user/user.png" alt="图片以损坏"></div>
            <span>会员登录</span>
        </div>
        <div>
            <mt-field  placeholder="请输入4~12位用户名" v-model="username" class="user-item" :state="uname" @blur.native.capture="blurName"></mt-field>
            <mt-field  placeholder="请输入4~8位密码" type="password" v-model="password" class="user-item" :state="upwd" @blur.native.capture="blurUpwd"></mt-field> 
        </div>
        <div class="user-content">
            <router-link to="/Register" class="reg">注册</router-link>
            <span>忘记密码</span>
        </div>
        <mt-button size="large" @click="reg">登录</mt-button>  
    </div>
</template>
<script>
    export default{
        data(){
            return{
                // 正则检验的过后显示的样式
                uname:"",
                upwd:"",
                // 用户输入的值
                username:"",
                password:"",
                // 用户名输入框验证格式
                  nreg:/^[1-9a-zA-z]{4,12}$/i,
                 //密码输入框验证格式
                  wreg:/^[1-9a-zA-z]{4,8}$/i,
            }
        },
        methods:{
            go(){
                this.$router.go(-1);//返回上一层
            },
            // 当点击登录时重新验证，验证通过才可以发AJAX请求
            reg(){
                var username=this.username;
                var nreg=this.nreg;
                var password=this.password;
                var wreg=this.wreg;
                //当验证到某个输入框不通过就发出提示信息
                if(!nreg.test(username)){
                    this.$messagebox("信息","用户名格式不正确");
                    return;
                }else if(!wreg.test(password)){
                    this.$messagebox("信息","密码格式不正确");
                    return;
                }
                // 发送ajax请求
                var url="login";
                var obj={uname:username,upwd:password};
                 this.axios.get(url,{params:obj}).then(res=>{
                     if(res.data.code==1){
                         this.$toast('登录成功');
                         this.$router.push("/")
                     }else{
                         this.$toast('登录名或密码不正确');
                     }
                 })  
            },
            // 用户名输入框失去焦点时验证
            blurName(){
                var  username=this.username;
                var reg=this.nreg;
                if(!reg.test(username)){
                   this.uname="error";
                   this.$toast('请输入正确的用户名格式');
                }else{
                    this.uname="success"
                }
            },
            //密码输入框失去焦点时验证
            blurUpwd(){
                var password=this.password;
                var reg=this.wreg;
                if(!reg.test(password)){
                    this.upwd="error";
                    this.$toast('请输入正确的密码格式');
                }else{
                    this.upwd="success"
                }
            }
        }
    }
</script>
<style>
/* 总体样式 */
    .user{
         padding: 7px 10px;
    }
    /* 顶部头 */
    .user>.register-head{
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
        margin-left:-5%;
        line-height: 37px;
        text-align: center;
    }
/* 用户的头像部分 */
    .user-head{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin:40px 0;
    }
    /* 用户的图片 */
    .user-head>div{
        border-radius: 50%;
        width: 60px;
        height: 60px;
        overflow: hidden;
        margin: 20px auto;
    }
    .user-head>div>img{
        width: 60px;
        height: 60px;
    }
    /* 文字 */
    .user-head>span{
        color: #333;
        font-size: 14px;
    }
    /* 输入文本框 */
    .user-item{
    width: 100%;
    border: 0;
    height: 50px;
    line-height: 35px;
    }
    /* 修改输入框的样式 */
    .mint-field .mint-cell-value>.mint-field-core{
     font-size: 14px;
     color: #333;
     background: #fff;
    }
    .mint-cell:last-child>.mint-cell-wrapper{
        padding: 0 ;
    }
    .mint-cell:first-child .mint-cell-wrapper{
        padding: 0 ;
    }
    /* 注册和忘记密码的样式 */
    .user-content{
        display: flex;
        justify-content: space-between;
        color: #888;
        font-size: 14px;
        margin:10px 0 ;
    }
    .user-content>.reg{
         color: #888;
        font-size: 14px;
        text-decoration: none;
    }
    .mint-button{
        background-color: #FD4500 !important;
    }
    .mint-button-text{
         color:#fff;
         z-index: 100;
     } 
</style>
