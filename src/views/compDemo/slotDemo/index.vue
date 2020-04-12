<template>
    <div>
        我是父组件
        <p>下面是slot 和  slot-scope(已经废弃，但未删除) 可以直接写在标签上</p>
        <child-slot>
            <template slot="cont1">
                我是template形式的具名slot cont1
            </template>
            <div slot="cont2">
                我是盒子模型的具名slot cont2
            </div>
            <div slot="cont3" slot-scope="numArr">
                我是带参数的具名slot  cont3
                <ul>
                    <li v-for="i in numArr.data" :key="i">{{ i }}</li>
                </ul>
            </div>
            <div>
                我是匿名的slot
            </div>
        </child-slot>
         <p>下面是新特性 v-slot （只能写在 template 上）</p>
        <child-slot>
            <template v-slot:cont1>
               <P>我是template形式的具名slot cont1</P> 
            </template>
            <template #cont2>
                <P>我是盒子模型的具名slot cont2</P> 
            </template>
            <template #cont3="numArr">
                我是带参数的具名slot  cont3
                <ul>
                    <li v-for="i in numArr.data" :key="i">{{ i }}</li>
                </ul>
            </template>
            <div>
                我是匿名的slot
            </div>
        </child-slot>

    </div>    
</template>

<script>
    import childSlot from './slotComp/childSlot.vue'
    export default {
        components: {
            childSlot
        }
    }
</script>

<style lang="less" scoped>

</style>