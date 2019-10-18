<template>
<!-- 热卖组件 -->
    <div class="hotsale">
        <div class="hot">热卖</div>
        <div class="hotsale-item">
            <div class="item-content" v-for="(elem,i) of list" :key="i" @click="goproduct(elem.pid)">
                <img :src="'http://pelww.applinzi.com/' + elem.Pimg" alt="图片已损坏">
                <span>{{elem.pname}}</span>
                <span>￥{{elem.price}}</span>
            </div>
        </div>
        <div class="more" @click="hotmore">查看更多</div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                list:[],//保存请求回来的数据
                pno:0   //页码，(第几页)
            }
        },
        created(){
            // 加载组件时调用一次
            this.hotmore();
        },
        methods:{
            // 跳转到详情页
            goproduct(pid){
                this.$router.push(`/Product/${pid}`);
            },
            hotmore(){
                //功能:获取商品分页数据
                //1:发送请求
                var url = "hotsell";
                //当前页码加1
                this.pno++;
                //创建参数对象
                var obj = {pno:this.pno};
                //发送ajax请求获取当前页内容
                this.axios.get(url,{params:obj}).then(res=>{
                    //2:获取服务器返回结果
                    //3:将返回结果保存
                    //var rows = 1页.concat(3页);
                    //this.list = res.data.data;
                    //4:拼接多页内容
                    var rows = this.list.concat(res.data.data);
                    //5:将结果赋值list 
                    this.list = rows; 
                })
            },
            
        }
    }
</script>
<style scoped>
/* 总体布局 */
    .hotsale{
        width:100%;
        background: #f5f5f5;
        display: flex;
        flex-direction: column;
        justify-content:space-around;
        padding: 10px 0;
    }
    /* 热卖标题 */
    .hotsale>.hot{
        width: 40px;
        height:26px;
        border-bottom: 4px solid rgb(236, 86, 59);
        margin:10px auto;
    }
    /* 热卖商品内容 */
    .hotsale>.hotsale-item{
        width: 100%;
        display: flex;
        justify-content:space-around;
        flex-wrap: wrap;
    }
    .hotsale-item>.item-content{
        width: 104px;
        height: 144px;
        padding: 3px;
        display: flex;
        flex-direction: column;
        justify-content:space-around;
        background: #fff;
        margin: 5px 0;
    }
    /* 商品图片 */
    .item-content>img{
        width: 84px;
        height:84px ;
    }
    /* 商品文字 */
    .item-content>span:nth-child(2){
        font:10px Arial;
        overflow: hidden;
       -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        display:-webkit-box;
        -webkit-box-orient: vertical;
    }
    /* 商品价格 */
    .item-content>span:nth-child(3){
        color: red;
        font-size: 10px;
    }
    .hotsale>.more{
        color:  rgb(236, 86, 59);
        background: #fff;
        width: 112px;
        height: 36px;
        margin: 10px auto;
        line-height: 36px;
    }
</style>
