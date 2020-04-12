<template>
    <div>
        这是自定义事件的组件
        <el-button @click="doSomething">自定义事件</el-button>
        <input type="text" :value='value' @input="$emit('input', $event.target.value)" />
    </div>
</template>

<script>
    export default {
        props: ['value'],
        methods: {
            doSomething () {
                this.$emit('my-event')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>