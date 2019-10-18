<template>
<!-- 有商品购物车选项 -->
    <div class="shopcart">
         <div class="shopcart-head">
           <a href="javascript:;" class="return_url" @click="go"><img src="../../assets/return.png"></a>
            购物车
        </div>
        <!-- 全选 -->
        <div class="shopcart-content">
            <input type="checkbox" :checked="changSum" class="select" @change="selectAll" />
            <span>全选</span>
        </div>
        <!-- 内容 -->
        <div class="shop-product" v-for="(item,i) of list" :key="i">
            <input type="checkbox" class="select" v-model="item.cb" >
            <img :src="'http://pelww.applinzi.com/'+item.Pimg" alt="图片已损">
            <div class="shop-product-con">
                <p>{{item.pname}}</p>
                <p>
                    <span>￥{{item.price}}</span>
                    <span>小计(元):￥{{sum=item.price*item.count}}</span>
                </p>
                <div class="sum">
                    <!-- 应用增减按钮组件 -->
                    <cartcontrol :listItem=item 
                    @changeTure="changeTure"></cartcontrol>
                    <mt-button type="default" @click.native="delItem" :data-gid="item.gid">删除</mt-button>
                </div>
            </div>
        </div>
        <!-- 底部结算 -->
        <div class="sum-bottom">
            <!-- <input type="checkbox" class="select"> -->
            <span>合计:￥{{sums.sum}}</span>
            <mt-button type="default" @click.native="delMitem" >删除选中商品</mt-button>
            <mt-button type="default">结算({{sums.count}})</mt-button>
        </div>
    </div>
</template>
<script>
// 引入增减按钮组件
import Cartcontrol from "./Cartcontrol";
export default {
  data() {
    return {
      list: [] //购物车列表商品的数据
    };
  },
  created() {
    this.loadMore();
  },
  // 注册
  components: {
    //注册增减按钮组件
    cartcontrol: Cartcontrol
  },
  computed: {
    // 计算每件商品的选项状态，全部为true，那么全选框状态为true，每件商品其中有一个为false，那么全选框为false
    changSum() {
      var change = false;
      for (var item of this.list) {
        if (item.cb == false) {
          change = false;
          return;
        } else if (item.cb == true) {
          change = true;
        }
      }
      return change;
    },
    sums() {
      // 总的价格,和总的数量
      var sums = {
        count: 0,
        sum: 0
      };
      this.list.forEach((elem, i) => {
        sums.sum += elem.count * elem.price;
        // 得到数量是字符串转化为数字
        sums.count += Number(elem.count);
      });
      return sums;
    }
  },
  methods: {
    // 点击增减数量按钮数量，选项按钮自动选上
    changeTure(e) {
      e.cb = true;
    },
    delMitem() {
      //  删除购物车指定的多个商品
      // 创建变量保存多个购物车的gid
      var str = "";
      // 创建循环遍历数组来获取状态为turn的gid
      for (var item of this.list) {
        if (item.cb) {
          //turn 当前商品被选中
          str += item.gid + ","; //将gid拼接
        }
      }
      // 判断用户有没有选中商品
      if (str.length == 0) {
        // 如果没有选中商品，提示用户
        this.$messagebox("请选择要删除的商品");
        return; //停止执行
      }
      // 截取字符串
      str = str.substring(0, str.length - 1);
      // 交互模式提示框，再次提示用户确认操作
      this.$messagebox.confirm("是否删除选中的商品").then(res => {
        // 确认
        //创建接口 /delM
        var url = "delM";
        //参数名ids:值拼接字符串
        var gids = { gids: str };
        // 发送ajax
        this.axios.get(url, { params: gids }).then(res => {
          //  删除成功就加载新的购物车列表
          this.loadMore();
          // 提示删除成功
          this.$toast("删除成功");
        });
      });
    },
    delItem(e) {
      //  删除指定的商品
      // 获取购物车的gid
      var gid = e.target.dataset.gid;
      // 交互提示用户是否删除指定的商品
      this.$messagebox.confirm("是否删除指定的商品").then(res => {
        //-同意
        //-发送ajax 服务器端程序 /del?gid=1
        var url = "del"; //请求的接口
        var obj = { gid: gid }; //发送的参数
        //-返回服务器返回内容
        this.axios.get(url, { params: obj }).then(res => {
          //如果返回成功，成功的条件为code>0
          if (res.data.code > 0) {
            this.$toast("删除成功"); //提示信息
            this.loadMore(); //加载新的列表
          }
        });
      });
    },
    selectAll(e) {
      //console.log(123);
      //全选按钮处理函数
      //1:获取全选按钮状态
      var cb = e.target.checked;
      //console.log(cb);
      //2:创建循环遍历购物车数组
      for (var item of this.list) {
        //3:将全选状态赋值购物车商品选中状态
        //item.cb 商品状态=cb全选按钮状态
        item.cb = cb;
      }
    },
    go() {
      this.$router.go(-1); //返回上一层
    },
    loadMore() {
      // 加载购物车数据表
      // 创建ajax请求
      var url = "cart";
      this.axios.get(url).then(res => {
        // 返回的结果是-1，就提示登录，并跳转到登录界面
        if (res.data.code == -1) {
          //提示交互提示/跳转登录组件
          this.$messagebox("消息", "请登录").then(res => {
            this.$router.push("/Login");
            return;
          });
        } else {
          //获取数据成功
          var list = res.data.data;
          //创建循环遍历数组并且为每个元素添加cd属性表示，商品当前复选框状态
          // 加载之前先清空
          this.$store.commit("clear");
          // 注意先添加cb属性再赋值list顺序
          for (var item of list) {
            //添加cd属性表示状态
            item.cb = false;
            // 修改共享购物车数据值vuex
            this.$store.commit("increment");
          }
          // 保存购物车数据表
          this.list = list;
        }
      });
    }
  }
};
</script>
<style scoped>
.shopcart {
  font-family: -apple-system-font, "Helvetica Neue", sans-serif;
  width: 100%;
  height: 100%;
  color: #222;
  padding-top: 32px;
  padding-bottom: 55px;
}
/* 购物车头 */
.shopcart-head {
  position: fixed;
  z-index: 10;
  text-align: center;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  line-height: 40px;
  max-width: 648px;
  margin: 0 auto;
  border-bottom: 1px solid #c7c7c7;
  background-image: -webkit-linear-gradient(top, #fefefe, #f8f8f8);
  width: 100%;
}
.return_url {
  left: 10px;
  display: inline-block;
  line-height: 40px;
  width: 20px;
  z-index: 30;
  position: fixed;
}
.return_url > img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
/* 全选 */
.shopcart-content {
  width: 100%;
  height: 47px;
  border-bottom: 2px solid #e8e8e8;
  line-height: 47px;
  display: flex;
  align-items: center;
}
/* 没选中的显示样式 */
.select {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid rgb(201, 203, 206);
  margin: 0 10px;
}
/* 内容 */
.shop-product {
  width: 100%;
  border-bottom: 1px dotted #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
}
/* 商品图片 */
.shop-product > img {
  width: 83px;
  height: 83px;
}
.shop-product-con {
  width: 55%;
  display: flex;
  flex-direction: column;
}
.shop-product-con > p:first-child {
  width: 100%;
  font-size: 16px;
  margin: 0;
  color: #3e3e3e;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
/* 价格和小计 */
.shop-product-con > p:nth-child(2) {
  display: flex;
  justify-content: space-around;
  width: 100%;
  font-size: 13px;
  margin: 0;
  color: #ff0000;
  padding: 5px 0;
}
/* 增减按钮 */
.shop-product-con > .sum {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px 0;
}

/* 底部结算 */
.sum-bottom {
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  left: 0;
  background: #fff;
}
.sum-bottom > span {
  color: #ff0000;
}
.sum-bottom > .mint-button--normal {
  font-size: 15px !important;
  padding: 0 7px;
}
</style>
