<template>
    <div class="slot-wrap">
        <p>具名插槽</p>
        <slot name="cont1"> </slot>
        <slot name="cont2"> </slot>
        <slot name="cont3" :data="numarr"> </slot>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                numarr: [1, 2, 3, 4]
            }
        }
    }
</script>

<style lang="less" scoped>
    .slot-wrap {
        border: 1px solid #ccc;
        padding: 10px;
        margin: 10px;
    }
</style>