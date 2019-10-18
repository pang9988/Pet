<template>
    <div class="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>
<script>
import Bscroll from "better-scroll";
export default {
  name: "Scroller",
  props: {
    handleToScroll: {
      type: Function,
      default: function() {}
    },
    handleToTouchEnd: {
      type: Function,
      default: function() {}
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.scroll = new Bscroll(this.$refs.wrapper, {
          click: true,
          probeType: 1
        });
        this.scroll.on("scroll", pos => {
          this.handleToScroll(pos);
        });
        this.scroll.on("touchEnd", pos => {
          this.handleToTouchEnd(pos);
          console.log(123);
        });
      }, 20);
    });
  }
};
</script>
<style scoped>
.wrapper {
  height: 100%;
}
</style>


