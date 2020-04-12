<template>
    <div class="par-wrap">
        <h3>组件间通讯</h3>
        <h3>1.父子间通讯: props, ref, $emit, $parent, $children</h3>
        <h4>我是父组件，这里子组件1传递过来的值: <span style="color:red;">{{ getVal }}</span></h4>
        <P>
            <el-input v-model="message" placeholder="请输入要传递的内容(props 方式)"></el-input>
        </P>
        <section :style="{ display: 'flex', marginBottom: '10px'}">
            <el-input v-model="sendVal" placeholder="请输入要传递的内容($children 方式)"></el-input>
            <el-button type="primary" @click="setChildVal">children传递</el-button>
        </section>

        <section :style="{ display: 'flex'}">
            <el-input v-model="RefVal" placeholder="请输入要传递的内容($refs 方式)"></el-input>
            <el-button type="primary" @click="setRefVal">ref传递</el-button>
        </section>

        <comp1 :message="message" @say="say"></comp1>
        <comp2 :message="message" ref="comp2" :par-fn="parFn"></comp2>
        <h3>1.非父子间通讯:</h3>
        <h3> localstorage | provide / inject | $root | 新对象($emit, $on) | vuex | 父组件传递（同上省略）</h3>
        <comp3></comp3>
        <comp4></comp4>
    </div>
</template>

<script>
    import comp1 from './Comp1.vue'
    import comp2 from './Comp2.vue'
    import comp3 from './Comp3.vue'
    import comp4 from './Comp4.vue'
    export default {
        data() {
            return {
                message: '我是父组件的message',
                getVal: '',
                sendVal: '',
                RefVal: ''
            }
        },
        mounted () {
            this.$root.globalData = {
                rootVal: '我是全局的rootVal'
            }
        },
        components: {
            comp1,
            comp2,
            comp3,
            comp4
        },
         provide () {
            return {
                provideData: {
                    provideVal: '111'
                }
            };
        },
        methods: {
            say(val) {
                this.getVal = val
            },
            parFn (val) {
                alert('我是父组件prop传递的parFn, 这是子组件传递给我的值：' + val)
            },
            setChildVal() {
                this.$children[6].setChildVal(this.sendVal)
            },
            setRefVal() {
                this.$refs.comp2.setRefVal(this.RefVal)
            }
        }
    }
</script>

<style lang="less" scoped>
    .par-wrap {
        padding: 5px;
        border: 1px solid #ccc;
        background: #e8e8e8;

        .el-input {
            width: 300px;
            margin-right: 20px;
        }
    }
</style>