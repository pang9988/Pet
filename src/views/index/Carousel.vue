<template>
<!-- 轮播组件 -->
    <mt-swipe :auto="3000"  class="carousel">
        <mt-swipe-item v-for="(elem,i) of carousel" :key="i" @click.native="goproduct(elem.pid)"><img class="img" :src="'http://pelww.applinzi.com/' + elem.img_url" alt="图片以损坏"></mt-swipe-item>
    </mt-swipe>
</template>
<script>
export default {
  data() {
    return {
      carousel: [] //保存请求回来的数据
    };
  },
  methods: {
    // 跳转到详情页
    goproduct(pid) {
      this.$router.push(`/Product/${pid}`);
    }
  },
  created() {
    var url = "carousel";
    this.axios.get(url).then(res => {
      this.carousel = res.data.data;
    });
  }
};
</script>
<style scoped>
/* 轮播图的总体样式 */
.carousel {
  width: 100%;
  height: 170px;
}
.mint-swipe-indicator.is-active {
  background: red;
}
/* 图片的样式 */
.img {
  width: 100%;
  height: 100%;
}
</style>
