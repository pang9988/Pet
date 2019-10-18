<template>
  <div class="search-div">
    <div class="page-search">
      <mt-search
        v-model="value"
        cancel-text="取消"
        placeholder="搜索"
        class="search-div"
      @keyup.enter.native="search"
      >
      <mt-cell v-for="(item,i) of defaultResult" :key="i"
    :value="item.pname" @click.native="go(item.pid)">
  </mt-cell>
      </mt-search>
    </div>
  </div>
</template>
<!-- 搜索框组件 -->
    
<script>
export default {
  data() {
    return {
      value: "",
      defaultResult: "" //保存所有的商品数据
    };
  },
  // computed: {
  //   filterResult() {
  //     return this.defaultResult.filter(value =>
  //       new RegExp(this.value, "i").test(value)
  //     );
  //   }
  // },
  created() {
    //   var url = "allproduct";
    //   this.axios.get(url).then(res => {
    //     var rows = [];
    //     var result = res.data.data;
    //     for (var elem of result) {
    //       // rows.push(elem.pid);
    //       rows.push(elem.pname);
    //     }
    //     this.defaultResult = rows;
    //   });
  },
  methods: {
    go(pid) {
      this.$router.push(`/Product/${pid}`);
    },
    search() {
      if (this.value) {
        var kw = this.value;
        var url = "search";
        var obj = { kw: kw };
        this.axios.get(url, { params: obj }).then(res => {
          if (res.data.code == -1) {
            this.$toast("没有找到符合的商品");
            return;
          } else {
            this.defaultResult = res.data.data.data;
          }
        });
      }
    }
    //   result() {
    //     if (this.value) {
    //       var url = "search";
    //       this.axios.get(url).then(res => {
    //         var result = res.data.data;
    //         return result;
    //       });
    //     }
    //   }
  }
};
</script>
<style>
.search-div > .mint-search-list {
  width: 83%;
  height: max-content;
  left: 3%;
  top: 17% !important;
  border: 1px solid #26a2ff;
  padding-top: 15px;
  overflow: auto;
}
.page-search {
  height: 100%;
}
.search-div {
  width: 100%;
  height: 50px;
}
.search-div > .mint-searchbar {
  background-color: #fff;
  box-sizing: border-box;
}
.mint-searchbar > .mint-searchbar-inner {
  background-color: #f5f5f5;
  border-radius: 3px;
  height: 18px;
}
input {
  background: #f5f5f5;
  /* text-align: center; */
}
.mint-searchbar > .mint-searchbar-inner > .mintui-search {
  font-size: 16px;
  /* margin-left: 6px; */
}
</style>
