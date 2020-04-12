<template>
    <div class="box-wrap">
        <h4>我是子组件2,我展示父组件传递过来的值</h4>
        <p>这是父组件props传递给我的message：<span style="color:red;">{{message}}</span></p>
        <p>这是父组件通过$childern传过来的值：<span style="color:red;">{{childVal}}</span></p>
        <p>这是父组件通过$refs传过来的值：<span style="color:red;">{{refVal}}</span></p>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                childVal: '',
                refVal: ''
            }
        },
        props: ['message', 'parFn'],
        methods: {
            setChildVal(childVal) {
                this.childVal = childVal;
            },
            setRefVal(refVal) {
                this.refVal = refVal;
            }
        }
    }
</script>

<style lang="less" scoped>
    .box-wrap {
        border: 1px solid #ccc;
        margin: 10px;
        padding: 10px;;
        background: #fff;
    }
</style>