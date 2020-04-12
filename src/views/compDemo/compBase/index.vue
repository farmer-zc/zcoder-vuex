<template>
    <div>
        <comp v-on:my-event="doSomething" v-model="message"></comp>
        <P>我是父组件的message：{{message}}</P>
    </div>
</template>

<script>
    import comp from './comp.vue'
    export default {
        data () {
            return {
                message: ''
            }
        },
        components: {
            comp
        },
        methods: {
            doSomething () {
                alert(1)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>