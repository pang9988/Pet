<template>
    <div class="register">
        <div class="register-head">
            <span class="small" @click="go">＜</span>
            <span>会员注册</span>
        </div>
        <div class="register-content">
            <mt-field  label="用户名" placeholder="请输入4~12位字符的用户名" v-model="username"  :state="uname" class="uname" @blur.native.capture="blurName"></mt-field>
            <mt-field  label="密码" placeholder="请输入4~8位密码" type="password" v-model="password"  :state="upwd" @blur.native.capture="blurUpwd"></mt-field>
            <mt-field  label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"  :state="uemail" @blur.native.capture="blurEmail"></mt-field>
            <mt-field  label="手机" placeholder="请输入手机号" type="tel" v-model="phone"  :state="uphone" class="phone" @blur.native.capture="blurPhone"></mt-field>
        </div>
        <div class="gender">
            <div class="gender-item">性别</div>
            <input id="sex" type="radio" value="1" checked v-model="gender"><label for="sex">男</label>
			<input id="sex1" type="radio" value="0" v-model="gender"><label for="sex1">女</label>
        </div>
        <div class="btn">
           <mt-button  size="large" class="btn-top" @click="reg">注册</mt-button>
           <mt-button  size="large" type="default" class="btn-buttom" @click="login">登录</mt-button>
        </div>
       
    </div>
</template>
<script>
    export default{
        data(){
            return{
                // 用户输入的值
                username:"",
                password:"",
                email:"",
                phone:"",
                gender:"1",
                // 正则检验的过后显示的样式
                uname:"",
                upwd:"",
                uemail:"",
                uphone:"",
                // 用户名输入框验证格式
                  nreg:/^[1-9a-zA-z]{4,12}$/i,
                 //密码输入框验证格式
                  wreg:/^[1-9a-zA-z]{4,8}$/i,
                //邮箱输入框验证格式  
                  ereg:/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                // 手机输入框验证格式
                  preg:/^[1][3,4,5,7,8][0-9]{9}$/
            }
        },
       
        methods:{
            login(){
                this.$router.push("/Login");//跳到登录页面
            },
            go(){
                this.$router.go(-1);//返回上一层
            },
            reg(){
                // 当提交注册时重新验证，验证通过才可以发AJAX请求
                var username=this.username;
                var nreg=this.nreg;
                var password=this.password;
                var wreg=this.wreg;
                var email=this.email;
                var ereg=this.ereg;
                var phone=this.phone;
                var preg=this.preg;
                var gender=this.gender;
                //当验证到某个输入框不通过就发出提示信息
                if(!nreg.test(username)){
                    this.$messagebox("信息","用户名格式不正确");
                    return;
                }else if(!wreg.test(password)){
                    this.$messagebox("信息","密码格式不正确");
                    return;
                }else if(!ereg.test(email)){
                    this.$messagebox("信息","邮箱格式不正确");
                    return;
                }else if(!preg.test(phone)){
                    this.$messagebox("信息","手机格式不正确");
                    return;
                }
                // 发送ajax请求
                var url="register";
                var obj={uname:username,upwd:password,email:email,phone:phone,sex:gender};
                 this.axios.post(url,obj).then(res=>{
                     this.$toast('注册成功请登录');
                     this.$router.push("/Login");
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
            },
            // 邮箱输入框失去焦点时验证
            blurEmail(){
                var email=this.email;
                var reg=this.ereg;
                // var reg=/^[a-zA-Z0-9]+@[a-zA-Z0-9]+(.com|.cn)$/i;
                if(!reg.test(email)){
                    this.uemail="error";
                    this.$toast('请输入正确的邮箱格式');
                }else{
                    this.uemail="success"
                }
            },
            // 手机输入框失去焦点时验证
            blurPhone(){
                var phone=this.phone;
                var reg=this.preg;
                if(!reg.test(phone)){
                    this.uphone="error";
                    this.$toast('请输入正确的手机号格式');
                }else{
                    this.uphone="success"
                }
            }
        }
    }
</script>
<style >

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
    /* 修改输入框的样式 */
     .register-content>.phone{
        padding: 0 10px;
    }
        
    .register-content>.uname{
         padding: 0 10px;
    }
    /* 性别 */
    .register>.gender{
        display: flex;
    }
    .gender>.gender-item{
        width: 108px;
        padding: 0 10px;
    }
    /* 按钮 */
    .register>.btn{
        width: 100%;
        padding: 15px 25px;
        box-sizing: border-box;
    }
    .register>.btn>.btn-top{
        background: #FD4500;
        margin: 10px 0;
        padding: 0 10px;
    }
    
</style>
