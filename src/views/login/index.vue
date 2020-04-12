<template>
  <div class="login-container">
      <el-form ref="form" :rules="rules" :model="form" label-width="60px" class="login-form">
          <h2 class="login-title">VUE脚手架配置</h2>
          <el-form-item label="帐号" prop="username">
              <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
          <el-form-item class="btn-item">
              <el-button class="btn-submit" size="medium" type="primary" @click="submitForm('form')">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
    import { Message } from 'element-ui';
  export default {
    data() {
      return {
        form: {
            username: '',
            password: ''
         },
         rules: {
             username: [
                  {required: true, message: '帐号不能为空', trigger: 'blur' },
             ],
             password: [
                 {required: true, message: '密码不能为空', trigger: 'blur' },
             ]
         }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
            // console.log(valid)
            if (valid) {
                this.$store.dispatch('user/loginAction', this.form).then(response => {
                    this.$router.push('/')
                }).catch(error => {
                    Message({
                        message: error,
                        type: 'error'
                    })
                })
            }else{
                return false
            }
        })
    }
  }
}
</script>

<style scoped>
.login-form {
    width: 350px;
    /* 上下间隙 160px, 左右自动居中 */
    margin: 220px auto 0;
    background-color: rgba(138, 222, 255, 0.8);
    padding: 28px;
    border-radius: 20px;
}
.login-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url('../../assets/logo.png') no-repeat center 50px;
}
.login-title {
    color: #303133;
    text-align: center;
}
.btn-item {
    text-align: center;
}
.btn-submit {
    width: 120px;
}
</style>