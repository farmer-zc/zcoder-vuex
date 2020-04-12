<template>
    <div>
        <h1>这是动态路由</h1>
        <P>动态路由的 id <span v-text="'$route.params.id'"></span> ：{{$route.params.id}}</P>
        <P>动态路由的参数 <span v-text="'$route.query.name'"></span>：{{$route.query.name}}</P>
        <p>商品id：{{data.id}}</p>
        <p>商品名称：{{data.name}}</p>
        <p>商品价格：{{data.price}}</p>
        <el-button @click="$router.push({path:'/vuex/index'})">返回</el-button>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                data : {}
            }
        },
        created () {
            this.$store.state.product.productList.forEach(item => {

                if(item.id == this.$route.params.id) {
                    this.data = item;
                }
            })
        }
    }
</script>

<style lang="less" scoped>

</style>