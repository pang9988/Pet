<!--选中的图片显示组件-->
<template>
  <div>
      <!-- 当foucused为true时显示选中图片否则显示默认图片 -->
   <img :src="focused?selectedImage:normalImage" alt="图片已损坏" class="imgstyle"/>
  </div>
</template>
<script>
export default {
    // 接收父元素传递的数据
  props:{
    focused:false,
    selectedImage:{default:""},
    normalImage:{default:""}
  }
}
</script>
<style scoped>
 .imgstyle{
   width:30px;
   height:30px;
 }
</style>
