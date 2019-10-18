<template>
<!-- 分类组件 -->
    <div class="kind">
      <div class="kind-item">
          <img src="../../assets/dog.png" alt="图片已损坏">
          <span>狗狗</span>
      </div>
      <div class="kind-item">
          <img src="../../assets/cat.png" alt="图片已损坏">
          <span>猫猫</span>
      </div>
      <div class="kind-item">
          <img src="../../assets/smallPamper.png" alt="图片已损坏">
          <span>小宠</span>
      </div>
      <div class="kind-item">
          <img src="../../assets/waterClan.png" alt="图片已损坏">
          <span>水族</span>
      </div>
      <div class="kind-item">
          <img src="../../assets/brand.png" alt="图片已损坏">
          <span>品牌馆</span>
      </div>
    </div>
</template>
<script>
   export default{
       data(){
           return{}
       }
   }
</script>
<style scoped>
  .kind{
     width: 100%;
     height: 116px;
     display: flex;
     justify-content: space-around;
  }
  .kind>.kind-item{
      display: flex;
      justify-content: center;
      flex-direction: column;

  }
  .kind-item>img{
      width: 50px;
  }
</style>
