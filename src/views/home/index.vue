<template>
    <el-tabs class="tab-wrap" v-model="activeName" :tab-position="'right'">
        <el-tab-pane label="生命周期" name="lifeCycle" >
            <life-Cycle></life-Cycle>
        </el-tab-pane>
        <el-tab-pane label="常用指令" name="instructions">
            <instructions></instructions>
        </el-tab-pane>
        <el-tab-pane label="属性绑定" name="base">
            <base-knowledge></base-knowledge>
        </el-tab-pane>
        <el-tab-pane label="过滤器/属性计算" name="componentDoc">
            <component-doc></component-doc>
        </el-tab-pane>
        <el-tab-pane label="vueRouter" name="vueRouter">
            <vue-router></vue-router>
        </el-tab-pane>
        <el-tab-pane label="vuex" name="vuex">
            <vuex></vuex>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import lifeCycle from '@/docs/vue/lifeCycle.md';
    import instructions from '@/docs/vue/instructions.md';
    import componentDoc from '@/docs/vue/componentDoc.md';
    import vueRouter from '@/docs/vue/vueRouter.md';
    import vuex from '@/docs/vue/vuex.md';
    import baseKnowledge from '@/docs/vue/base.md';
    export default {
        data () {
            return {
                activeName: 'lifeCycle'
            }
        },
        components: {
            lifeCycle,
            instructions,
            componentDoc,
            vueRouter,
            vuex,
            baseKnowledge
        },
        methods: {

        }
    }
</script>

<style lang="less" >
    .tab-wrap {
        height: 100%;
        overflow: hidden;
        .el-tabs__content {
            position: relative;
            height: 100%;
            overflow: auto;
        }
    }
</style>