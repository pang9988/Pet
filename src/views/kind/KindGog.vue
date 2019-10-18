<template>
  <div ref="movie" class="dog">
    <!-- 狗狗商品列表组件 -->
    <div>
      <div>{{pullDownMsg}}</div>
      <div class="kind-dog" ref="sumHeight">
        <div class="kind-dog-item" v-for="(elem,i) of list" :key="i" @click="goproduct(elem.pid)">
          <img :src="'http://pelww.applinzi.com/' + elem.Pimg" alt="图片已损坏" />
          <p>{{elem.pname}}</p>
          <div class="dog-price">
            <span>￥{{elem.price}}</span>
            <mt-button type="danger" size="small">加入购物车</mt-button>
          </div>
        </div>
      </div>
      <div>{{pullTopMag}}</div>
    </div>
  </div>
</template>
<script>
import Bscroll from "better-scroll";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      list: [], //保存请求回来的数据
      pno: 0, //页码，(第几页)
      pullDownMsg: "", //下拉显示的文字
      pullTopMag: "" //上拉显示的文字
    };
  },
  created() {
    // 加载组件时调用
    this.loadmore();
  },
  mounted() {
    //确保在dom渲染完，才执行
    this.$nextTick(() => {
      setTimeout(() => {
        var scroll = new Bscroll(this.$refs.movie, {
          click: true, //表示允许点击
          probeType: 1 //1表示会截流
        });
        // 监听滚动
        scroll.on("scroll", pos => {
          // 下拉大于30，就想执行
          if (pos.y > 30) {
            this.pullDownMsg = "正在更新中";
          }
        });
        // 手指离开的，的滚动距离
        scroll.on("touchEnd", pos => {
          if (pos.y > 30) {
            this.pullDownMsg = "更新成功";
            setTimeout(() => {
              this.loadmore(1);
              // 清空文字
              this.pullDownMsg = "";
            }, 1000);
          }
          //上拉加载 总高度>下拉的高度+10 触发加载更多
          if (scroll.maxScrollY > pos.y + 30) {
            this.pullTopMag = "加载成功";
            setTimeout(() => {
              this.loadmore();
              this.pullTopMag = "";
              //使用refresh 方法 来更新scroll  解决无法滚动的问题
              scroll.refresh();
            }, 1000);
          }
        });
      });
    }, 20);
  },
  methods: {
    // 跳转到详情页
    goproduct(pid) {
      this.$router.push(`/Product/${pid}`);
    },
    handleClick() {
      this.loadmore();
    },
    loadmore(n) {
      // 发送请求
      var url = "kind";
      // 与数据库对应代表的种类
      var fid = "1";
      // 当前页码加一
      if (!n) {
        this.pno++;
      }

      //创建参数对象
      var obj = { pno: this.pno, fid: fid };
      this.axios.get(url, { params: obj }).then(res => {
        // 获取服务器返回的结果
        // 将返回的结果
        // var rows=当前页.concat返回的数据页；
        // 再将拼接到的数据返回到页面this.list=rows
        if (!res.data.data[0]) {
          this.$toast("已经到底了");
        }
        // 当n没有值时，就拼接
        if (!n) {
          var rows = this.list.concat(res.data.data);
          //将结果赋值list
          this.list = rows;
        } else {
          //否则刷新
          this.list = res.data.data;
        }
      });
    }
  }
};
</script>
<style scoped>
.dog {
  width: 100%;
  height: 604px;
  overflow: hidden;
  background-color: #f5f5f5;
}
/* 页面样式 */
.kind-dog {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 30px;
  padding-top: 30px;

  /* box-sizing: border-box; */
}
/* 每个商品的总体的布局 */
.kind-dog-item {
  width: 46%;
  height: 270px;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin: 5px 0;
}
/* 商品图片 */
.kind-dog-item > img {
  width: 100%;
  height: 183px;
}
/* 商品介绍 */
.kind-dog-item > p {
  font: 10px Arial;
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
/* 价格和购物车按钮 */
.kind-dog-item > .dog-price {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.dog-price > span {
  color: #ff4542;
}
</style>
