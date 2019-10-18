<template>
<!-- 分类组件 -->
    <div>
       <mt-navbar v-model="selected" class="kind-head">
            <mt-tab-item id="dog">狗狗</mt-tab-item>
            <mt-tab-item id="cat">猫猫</mt-tab-item>
            <mt-tab-item id="smallPamper">小宠</mt-tab-item>
            <mt-tab-item id="waterClan">水族</mt-tab-item>
            <mt-tab-item id="brand">品牌馆</mt-tab-item>
      </mt-navbar>
        <!-- 要显示的分类子组件 -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="dog">
                <!-- 应用狗狗组件 -->
                <kinddog></kinddog>
            </mt-tab-container-item>
            <mt-tab-container-item id="cat">
                <!-- 应用猫猫组件 -->
                <kingcat></kingcat>
            </mt-tab-container-item>
            <mt-tab-container-item id="smallPamper">
                <!-- 应用小宠组件 -->
                <smallpamper></smallpamper>
            </mt-tab-container-item>
            <mt-tab-container-item id="waterClan">
                <!-- 应用水族组件 -->
                <waterclan></waterclan>
            </mt-tab-container-item>
            <mt-tab-container-item id="brand">
                <!-- 应用品牌组件 -->
                <brand></brand>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
<script>
// 引入狗狗商品列表组件
import KindGog from "./KindGog";
// 引入猫猫商品列表组件
import KingCat from "./KingCat";
// 引入 小宠商品列表组件
import SmallPamper from "./SmallPamper";
// 引入水族商品列表组件
import WaterClan from "./WaterClan";
// 引入水族商品列表组件
import Brand from "./Brand";
export default {
  data() {
    return {
      selected: "dog"
    };
  },
  // 注册
  components: {
    // 注册狗狗商品列表组件
    kinddog: KindGog,
    // 注册猫猫商品列表组件
    kingcat: KingCat,
    // 注册小宠商品列表组件
    smallpamper: SmallPamper,
    // 注册水族商品列表组件
    waterclan: WaterClan,
    // 注册品牌馆组件
    brand: Brand
  }
};
</script>
<style scoped>
/* 修改文字的样式 */
.mint-navbar .mint-tab-item.is-selected {
  color: #ec563b;
}
div > .kind-head {
  position: fixed;
  z-index: 10;
  text-align: center;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  line-height: 40px;
  max-width: 648px;
  padding: 0 30px;
  margin: 0 auto;
  border-bottom: 1px solid #c7c7c7;
  background-image: -webkit-linear-gradient(top, #fefefe, #f8f8f8);
}
</style>
