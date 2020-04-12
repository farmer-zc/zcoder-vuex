<template>
    <el-tabs class="tab-wrap" v-model="activeName" :tab-position="'right'">
        <el-tab-pane label="前端安全问题" name="webSafe" >
            <web-safe></web-safe>
        </el-tab-pane>
        <el-tab-pane label="es6常用" name="es6" >
            <es6></es6>
        </el-tab-pane>
        <el-tab-pane label="浏览器缓存" name="cache" >
            <cache></cache>
        </el-tab-pane>
        <el-tab-pane label="浏览器存储" name="browser" >
            <browser></browser>
        </el-tab-pane>
        <el-tab-pane label="跨域" name="jsonp" >
            <jsonp></jsonp>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import webSafe from '@/docs/base/webSafe.md';
    import es6 from '@/docs/base/es6.md';
    import cache from '@/docs/base/cache.md';
    import browser from '@/docs/base/browser.md';
    import jsonp from '@/docs/base/jsonp.md';
    export default {
        data () {
            return {
                activeName: 'webSafe'
            }
        },
        components: {
            webSafe,
            es6,
            cache,
            jsonp,
            browser
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