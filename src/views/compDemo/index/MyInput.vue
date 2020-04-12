<template>
    <div class="my-ipt-wrap">
        <input class="my-ipt" type="text" :value="value" @input="$emit('input', $event.target.value)" />
    </div>
</template>

<script>
    export default {
        props: ['value']
    }
</script>

<style lang="less" scoped>
    .my-ipt-wrap {
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;
        .my-ipt {
            width: 100%;
            border: 1px solid #ce5858;
            height: 40px;
            box-sizing: border-box;
            padding: 5px;
            border-radius: 3px;
        }
    }
</style>