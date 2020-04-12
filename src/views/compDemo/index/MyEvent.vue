<template>
    <div>
        <input type="button" value="点击弹hello" @click="sayHello">
    </div>
</template>

<script>
    export default {
        methods: {
            sayHello() {
                this.$emit('say-hello')
            }
        }
    }
</script>

<style lang="less" scoped>

</style>