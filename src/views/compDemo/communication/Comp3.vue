<template>
    <div class="box-wrap">
        <h4>我是子组件3, 我给兄弟组件4传值</h4>

        <section class="type-wrap">
            <span class="type-title">$emit/$on方式:</span>
            <el-input v-model="emitVal" placeholder="请输入要传递的内容"></el-input>
            <el-button @click="setEmit" type="primary">传递</el-button>
        </section>

        <section class="type-wrap">
            <span class="type-title">localStorage方式：</span>
            <el-input v-model="localVal" placeholder="请输入要传递的内容"></el-input>
            <el-button @click="setLocal" type="primary">传递</el-button>
        </section>

        <section class="type-wrap">
            <span class="type-title">$root方式：</span>
            <el-input v-model="rootVal" placeholder="请输入要传递的内容"></el-input>
            <el-button @click="setRoot" type="primary">传递</el-button>
        </section>

        <section class="type-wrap">
            <span class="type-title">provide方式：</span>
            <el-input v-model="provideVal" placeholder="请输入要传递的内容"></el-input>
            <el-button @click="setProvide" type="primary">传递</el-button>
        </section>

        <section class="type-wrap">
            <span class="type-title">vuex方式：</span>
            <el-input v-model="vuexVal" placeholder="请输入要传递的内容"></el-input>
            <el-button @click="setVuex" type="primary">传递</el-button>
        </section>

    </div>
</template>

<script>
    export default {
        data () {
            return {
                localVal: '',
                emitVal: '',
                rootVal: '',
                provideVal: '',
                vuexVal: ''
            }
        },
        inject: ['provideData'],
        methods: {
            setLocal () {
                localStorage.setItem('localVal', this.localVal)
            },
            setEmit () {
                this.$medium.$emit('emitVal', this.emitVal)
            },
            setRoot () {
                this.$root.globalData.rootVal = this.rootVal;
            },
            setProvide () {
                this.provideData.provideVal = this.provideVal
            },
            setVuex () {
                this.$store.dispatch('demo/setVuexVal', this.vuexVal)
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
            width: 150px;
            line-height:  40px;
        }
        .el-input {
            width: 300px;
            margin-right: 20px;
        }
    }
</style>
