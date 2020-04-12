<template>
    <div class="not-found">
        <h3>（404）您输入的地址不存在哦,</h3>
        <P>点击返回主页,{{this.time}}秒未操作自动返回主页</P>
        <el-button @click="$router.push({path: '/'})">返回</el-button>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                time: 5,
                interval: null
            }
        },
        mounted() {
            this.interval = setInterval(()=>{
                this.time -= 1;
                if(this.time == 0){
                    this.$router.push({path: '/'})
                }
            },1000)
        },
        beforeDestroy () {
            clearInterval(this.interval)
        }
    }
</script>

<style lang="less" scoped>
.not-found {
    width: 100%;
    height: 100%;
    padding-top: 150px;
    box-sizing: border-box;
    text-align: center;
}
</style>