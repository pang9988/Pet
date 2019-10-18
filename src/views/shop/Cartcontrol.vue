<template>
    <div>
        <div class="btn">
            <span @click="reduce">－</span>
            <input type="text" v-model="listItem.count">
            <span @click="add">＋</span>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  //通过父元素传递数据过来
  props: {
    listItem: {
      type: Object
    }
  },
  methods: {
    // 点击减按钮时商品数量自减
    reduce() {
      // 同时传递信息给父元素，选中状态为true
      this.$emit("changeTure", this.listItem);
      if (this.listItem.count == 1) {
        this.$messagebox("信息", "数量不能小于或大于1000");
      }
      if (this.listItem.count > 1) {
        this.listItem.count--;
      }
    },
    //如果数据库没有传来数量属性，就在全局定义一个count属性
    // 当点击加按钮时，数量自增
    add() {
      // 同时传递信息给父元素，选中状态为true
      this.$emit("changeTure", this.listItem);
      if (!this.listItem.count) {
        Vue.set(this.listItem, "count", 1);
      } else {
        if (this.listItem.count == 999) {
          this.$messagebox("信息", "数量不能小于或大于1000");
        }
        if (this.listItem.count < 1000) {
          this.listItem.count++;
        }
      }
    }
  }
};
</script>
<style scoped>
.btn {
  width: 99px;
  height: 27px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #cccccc;
}

.btn > input {
  width: 35px;
  text-align: center;
  font-size: 14px;
  text-shadow: none;
  text-transform: none;
  outline: none;
  border: 0;
  background: #fff;
}

.btn > span {
  text-align: center;
  display: inline-block;
  font-weight: bold;
  width: 27px;
  height: 27px;
}
.btn > span:nth-child(3) {
  border-left: 1px solid #cccccc;
}
.btn > span:first-child {
  border-right: 1px solid #cccccc;
}
</style>