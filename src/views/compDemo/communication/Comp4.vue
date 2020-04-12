<template>
    <div class="box-wrap">
        <h4>我是子组件3</h4>
        <P>我是通过新对象 $emit/$on 传递过来的值： <span style="color:red;">{{ emitVal }}</span></P>
        <P><el-button @click="getLocal" type="primary">获取</el-button>我是通过 localstorage 传递过来的值： <span style="color:red;">{{localVal}}</span></P>
        <P><el-button @click="getRoot" type="primary">获取</el-button>我是通过 $root 传递过来的值： <span style="color:red;">{{rootVal}}</span></P>
        <P><el-button @click="getProvide" type="primary">获取</el-button>我是通过 provide 传递过来的值： <span style="color:red;">{{provideVal}}</span></P>
        <P>我是通过 vuex 传递过来的值： <span style="color:red;">{{ $store.state.demo.vuexVal }}</span></P>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                localVal: localStorage.getItem('localVal'),
                emitVal: '',
                rootVal: '',
                provideVal: ''
            }
        },
        inject: ['provideData'],
        mounted( ) {
            this.$medium.$on('emitVal', val => {
                this.emitVal = val
            })
        },
        methods: {
            getLocal() {
                this.localVal = localStorage.getItem('localVal')
            },
            getRoot () {
                this.rootVal = this.$root.globalData.rootVal
            },
            getProvide () {
                this.provideVal = this.provideData.provideVal
            }
        }
    }
</script>val

<style lang="less" scoped>
    .box-wrap {
        padding: 10px;
        margin: 10px;
        border: 1px solid #ccc;
        background: #fff;
    }
</style>