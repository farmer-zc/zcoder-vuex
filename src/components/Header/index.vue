<template>
  <el-header>
    VUE前端框架以及常用知识点
    <el-dropdown @command="handleCommand" class="user-msg">
      <span class="el-dropdown-link">
        {{userInfo.name}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" :split-button="true">
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        <el-dropdown-item command="changePass">修改密码</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dialog title="修改密码" center :visible.sync="dialogFormVisible">

      <el-form :model="ruleForm" :label-position="'right'" status-icon :rules="rules" ref="passForm" label-width="100px">
        <el-form-item label="旧密码" prop="oldPass">
          <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input type="password" v-model="ruleForm.newPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePwd">确 定</el-button>
      </div>
    </el-dialog>
  </el-header>
</template>

<script>
import passwordApi from './../../api/password.js'
export default {
  data() {
    const oldPassValidate = (rule, value, callback) => {
        passwordApi.checkPassword(this.userInfo.userId, value).then(res => {
            if(res.success){
              callback()
            }else{
              callback(new Error('密码错误'));
            }
        })
    }
    const newPassValidate = (rule, value, callback) => {
      if( value !== this.ruleForm.oldPass) {
        callback();
      }else{
        callback(new Error('新密码不能与旧密码一致'));
      }
    }
    const checkPassValidate = (rule, value, callback) => {
      if( value === this.ruleForm.newPass ) {
        callback();
      }else{
        callback(new Error('两次输入的密码不一致'));
      }
    }
    return {
      userInfo: this.$store.state.user.userInfo || null,
      dialogFormVisible: false,
      ruleForm: {
        oldPass: '',
        newPass: '',
        checkPass: '',
      },
      rules: {
        oldPass: [
          {required: true, message: '原密码不能为空', trigger: 'blur'},
          {validator: oldPassValidate, trigger: 'blur'}
        ],
        newPass: [
          {required: true, message: '新密码不能为空', trigger: 'blur'},
          {validator: newPassValidate, trigger: 'change'}
        ],
        checkPass: [
          {validator: checkPassValidate, trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    logoutDialog() {
      this.$confirm("此操作将退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
         this.logout()
        })
        .catch(() => {});
    },
    changePass() {
      this.dialogFormVisible = true;
    },
    logout(){
       this.$store
            .dispatch("user/logout")
            .then(res => {
              this.$router.push({ path: "/login" });
            })
            .catch(error => {
              this.$message({
                message: error,
                type: "error"
              });
            });
    },
    handleCommand(command) {
      switch (command) {
        case "logout":
          this.logout();
          break;
        case "changePass":
          this.changePass();
          break;
      }
    },
    updatePwd() {
      this.$refs.passForm.validate(valid =>{
        if(valid){
          this.$store.dispatch('user/updatePwd', this.ruleForm.checkPass).then(res => {
            if(res.success){
              this.logout();
              this.$alert('修改成功,请重新登录');
              this.dialogFormVisible = false
            }else{
              this.$alert('修改失败');
            }
          })
        }else{
          return false;
        }
      })
      
      // passwordApi.updatePwd(this.userInfo.userId, this.ruleForm.checkPass).then(res => {
      //   if(res.success){
      //     this.$alert('修改成功');
      //     this.dialogFormVisible = false
      //   }else{
      //     this.$alert('修改失败');
      //   }
      // })
    }
  }
};
</script>
<style lang="less" scoped>
.user-msg {
  float: right;
}
</style>