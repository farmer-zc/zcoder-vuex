<template>
  <el-container class="app-wrap">
    <app-header></app-header>
    <el-container class="cont-wrap">
      <el-aside width="200px">
        <navbar></navbar>
      </el-aside>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import navbar from "./Navbar/index.vue";
import appHeader from "./Header/index.vue";
export default {
  components: {
    navbar,
    appHeader
  }
};
</script>

<style lang="less" scoped>
.app-wrap {
  padding: 0 10%;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.cont-wrap {
  order: 1;
  overflow: hidden;
}
.el-header {
  border-bottom: 1px solid #ccc;
  text-align: center;
  line-height: 60px;
}
</style>
