<template>
    <div>
        <h1>vuex 展示商品列表</h1>
        <el-table
            :data="$store.state.product.productList"
            border
            height="400"
            width="820"
            stripe
            style="width: 100%">
            <el-table-column
                prop="id"
                label="商品id"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="名称"
                width="110">
            </el-table-column>
            <el-table-column
                prop="city"
                label="地址"
                width="110">
            </el-table-column>
            <el-table-column
                prop="price"
                label="价格"
                width="60">
            </el-table-column>
            <el-table-column
                prop="desc"
                label="描述">
            </el-table-column>
             <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryPage.currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="queryPage.pageNum"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                message: '',
                queryPage: {
                    currentPage: 1,
                    pageNum: 10,
                }
            }
        },
        created() {
            this.getProduct();
        },
        methods: {
            getProduct () {
               this.$store.dispatch('product/getProductList', this.queryPage)
            },
            handleSizeChange (val) {
                this.queryPage.pageNum = val;
                this.getProduct()
            },
            handleCurrentChange (val) {
                this.queryPage.currentPage = val;
                this.getProduct()
            },
            handleClick (val) {
                this.$router.push({path: `/vuex/detail/${val.id}`, query:{name: `${val.name}`}})
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>