<template>
    <div>
        <h2>封装组件常用知识点</h2>
        <h3>1. 自定义组件上使用v-model</h3>
        <p>1.1 将其 value attribute 绑定到一个名叫 value 的 props 上</p>
        <p>1.2 在其 input 事件被触发时，将新的值通过自定义的 input 事件抛出</p>
        <section class="my-ipt-box">
            <span class="ipt-title">双向绑定的值</span>
            <el-input v-model="myIptVal"></el-input>
        </section>
        <section class="my-ipt-box">
            <span class="ipt-title">自己组件的v-model</span>
            <my-ipt v-model="myIptVal"></my-ipt>
        </section>
        <h3>1. 自定义事件</h3>
        <my-event @say-hello="sayHello"></my-event>
    </div>
</template>

<script>
    import myIpt from './MyInput.vue'
    import myEvent from './MyEvent.vue'
    export default {
        data () {
            return {
                myIptVal: ''
            }
        },
        components: {
            myIpt,
            myEvent
        },
        methods: {
            sayHello () {
                alert('hello')
            }
        }
    }
</script>

<style lang="less" scoped>
    .my-ipt-box {
        display: flex;
        line-height: 40px;
        margin-top: 10px;
        .ipt-title {
            width: 200px;
        }
    }
</style>