<template>
<!-- 首页logon图片及右边的图案的组件 -->
    <div>
        <!-- 遮罩层 -->
        <div class="popContainer" v-show="isShow" @click="toggle"></div>
        <div class="hidden-layer" v-show="isShow" @click="toggle">
            <p>
               <img src="../../assets/home-icon.png" alt="图片已损坏">
               <span>首页</span>
            </p>
            <p>
               <img src="../../assets/dog_cion.png" alt="图片已损坏">
               <span>狗狗</span>
            </p>
            <p>
               <img src="../../assets/cat-icon.png" alt="图片已损坏">
               <span>猫猫</span>
            </p>
            <p>
               <img src="../../assets/smallPamper-cion.png" alt="图片已损坏">
               <span>小宠</span>
            </p>
            <p>
               <img src="../../assets/waterClan-icon.png" alt="图片已损坏">
               <span>水族</span>
            </p>
            <p>
               <img src="../../assets/brand-icon.png" alt="图片已损坏">
               <span>品牌</span>
            </p>
        </div>
        <!-- logon图片 -->
        <img src="../../assets/logo.png" alt="图片已损坏">
        <!-- 右边的图案 -->
        <div class="fixedNavBut" @click="toggle">
            <div class="fixedNavBut-item">
                <i class="i-1"></i>
                <i class="i-2"></i>
                <i class="i-3"></i> 
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
              isShow:""
            }
        },
        methods:{
            // 点击隐藏和显示遮罩层和隐藏层
            toggle(){
                this.isShow=!this.isShow;
            }
        }
    }
</script>
<style scoped>
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
/* 隐藏层的样式*/
.hidden-layer{
    background-color: #666666;
    box-shadow: -2px 0 5px #000;
    width: 60%;
    height: 100%;
    overflow-y: auto;
    position: fixed;
    z-index: 1001 !important;
    right: -100%;
    right: 0px;
    top: 0px;
    padding: 10px 0px;
    transition: all 0.5s ease-in;
}
.hidden-layer>P{
    padding: 0 10px;
    color: #fff;
    text-align: left;
    display: flex;
    align-items: center;
}
.hidden-layer>P>img{
    width: 20px;
    height: 20px;
    margin: 0 10px;
}
/* logon的样式 */
    img{
        width: 100%;
        height: 46px;
    }
    /* 右边图案 */
    .fixedNavBut{
        width: 40px;
        height:40px;
        bottom: 60px; 
         z-index: 10;
        top: 15px;
        right: 9px;
        position:fixed;

    }
    .fixedNavBut>.fixedNavBut-item{
        border-radius: 50%;
        border:1px solid #ec563b;
        width: 30px;
        height:30px;
        position: relative;
        left: 4px;
        top:2px;
        background: #fff;
        
    }
    /* 图案里的每条线 */
    .fixedNavBut-item>i{
        display: block;
        width: 20px;
        height: 2px;
        background-color:#ec563b;
        position: absolute;
        left:5px;
         top:8px;
    }
    .fixedNavBut-item>.i-2{
        top:14px;
    }
    .fixedNavBut-item>.i-3{
        top:20px;
    }
</style>
