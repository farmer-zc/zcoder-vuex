<template>
    <div class="box-wrap">
        <h4>我是子组件1，我展示向父组件传递值</h4>
        <section class="type-wrap">
            <span class="type-title">$emit方式: </span>
            <el-input v-model="emitVal" placeholder="请输入要传递的内容"></el-input>
            <el-button @click="emitFn" type="primary">传递</el-button>
        </section>
        <section class="type-wrap">
            <span class="type-title">$parent方式：</span>
            <el-input v-model="parentVal" placeholder="请输入要传递的内容"></el-input>
            <el-button @click="parentFn" type="primary">传递</el-button>
        </section>
    </div>
</template>

<script>
    export default {
        props: ['message'],
        data () {
            return {
                comp1: '<comp1 :message="message" @say="say"></comp1>',
                emitVal: '我是$emit方式的值',
                parentVal: '我是$parent方式的值'
            }
        },
        methods: {
            emitFn ( ) {
                this.$emit('say', this.emitVal)
            },
            parentFn () {
                this.$parent.say(this.parentVal)
            },
            sayMySelf() {
                alert('我是子组件1')
            }
        }
    }
</script>

<style lang="less" scoped>
    .box-wrap {
        border: 1px solid #ccc;
        margin: 10px;
        padding: 10px;
        background: #fff;
    }
    .type-wrap {
        display: flex;
        margin-bottom: 10px;
         .type-title {
            width: 120px;
            line-height:  40px;
        }
        .el-input {
            width: 300px;
            margin-right: 20px;
        }
    }
   
</style>