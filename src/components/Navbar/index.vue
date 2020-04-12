<template>
  <el-row class="navbar">
    <el-col>
      <el-menu
        :router="true"
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        text-color="#666"
        active-text-color="#409eff"
      >
        <el-menu-item index="/home">
          <i class="el-icon-setting"></i>
          <span slot="title">vue基础</span>
        </el-menu-item>

        <el-submenu index="/vue">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">vue组件</span>
          </template>
          <el-menu-item index="/vue/index">
              <i class="el-icon-menu"></i>
              <span slot="title">vue</span>
          </el-menu-item>
          <el-menu-item index="/vue/communication">
              <i class="el-icon-menu"></i>
              <span slot="title">组件通讯</span>
          </el-menu-item>
          <el-menu-item index="/vue/slotDemo">
              <i class="el-icon-menu"></i>
              <span slot="title">插槽slot</span>
          </el-menu-item>
        </el-submenu>

        <el-submenu index="/vuex">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">vuex</span>
          </template>
          <el-menu-item index="/vuex/index">
              <i class="el-icon-menu"></i>
              <span slot="title">商品列表</span>
          </el-menu-item>
        </el-submenu>

        <el-menu-item index="/base">
          <i class="el-icon-setting"></i>
          <span slot="title">前端知识</span>
        </el-menu-item>

      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
  
};
</script>

<style lang="less">
  
  .navbar {
    margin-top: 30px;
  }
</style>
