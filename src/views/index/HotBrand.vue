<template>
<!-- 热卖品牌组件 -->
    <div class="hotBrand">
        <div class="hotBrand-head">
            热卖品牌
        </div>
        <div class="hotBrand-item">
            <div><img src="../../assets/hotBrand/hotBrand-1.png" alt="图片已损坏"></div>
            <div><img src="../../assets/hotBrand/hotBrand-2.png" alt="图片已损坏"></div>
            <div><img src="../../assets/hotBrand/hotBrand-3.png" alt="图片已损坏"></div>
            <div><img src="../../assets/hotBrand/hotBrand-4.png" alt="图片已损坏"></div>
            <div><img src="../../assets/hotBrand/hotBrand-5.png" alt="图片已损坏"></div>
            <div><img src="../../assets/hotBrand/hotBrand-6.png" alt="图片已损坏"></div>
            <div><img src="../../assets/hotBrand/hotBrand-7.png" alt="图片已损坏"></div>
            <div><img src="../../assets/hotBrand/hotBrand-8.png" alt="图片已损坏"></div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{}
        }
    }
</script>
<style scoped>
/* 总体 */
    .hotBrand{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #fff;
        padding: 10px 0;
    }
    /* 标题 */
    .hotBrand>.hotBrand-head{
        border-bottom:4px solid rgb(236, 86, 59);
        width: 82px;
        height:26px;
         margin:10px 0;

    }
    /* 内容 */
    .hotBrand>.hotBrand-item{
        width: 100%;
        display: flex;
        justify-content:center;
        flex-wrap: wrap;

    }
    /* 图片 */
    .hotBrand-item>div{
        width: 81px;
        height: 40px;
    }
    .hotBrand-item>div>img{
        width: 81px;
        height: 40px;
    }
</style>
