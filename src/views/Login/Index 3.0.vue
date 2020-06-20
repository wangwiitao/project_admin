<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="main-tab">
        <!-- 登录切换 -->
        <li
          :class="{'current': item.current }"
          @click="toggleMenu(item)"
          v-for="item in menuTab"
          :key="item.id"
        >{{item.txt}}</li>
      </ul>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="small"
      >
        <el-form-item prop="username">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <label>密码</label>

          <el-input type="password" v-model="ruleForm.password" autocomplete="off" minilength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="passwords" v-show="model === 'register'">
          <label>重复密码</label>

          <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" minilength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15"><div class="grid-content bg-purple"><el-input v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input></div></el-col>
            <el-col :span="9"><div class="grid-content bg-purple">
              <el-button type="success" class = "block">输入验证码</el-button></div></el-col>
          </el-row>
          
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class = "block login-btn">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive,ref } from "@vue/composition-api"
import {stripscript,validateEmail,validatePass,validateVcode} from "@/utils/validate"
export default {
  name: "Login",
  setup(props,{refs}){
      //验证用户名
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if(validateEmail(value)){
        callback(new Error("用户名格式有误"))
        
      }else{
        callback();
      }
    };
    //验证密码
    let validatePassword = (rule, value, callback) => {
      ruleForm.password = stripscript(value)
      value = ruleForm.password
      // console.log(stripscript(value))

      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码为6-20位字母数字!"));
      } else {
        callback();
      }
    };
    //重复密码
    let validatePasswords = (rule, value, callback) => {
      if(model.value=login){ callback()}
      ruleForm.passwords = stripscript(value)
      value = ruleForm.passwords
      // console.log(stripscript(value))

      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value!==ruleForm.password) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    //验证码
     let validateCode = (rule, value, callback) => {
      ruleForm.code = stripscript(value)
      value = ruleForm.code
      if (value === "") {
        return callback(new Error("验证码不能为空"));
      }else if (validateVcode(value)){
        return callback(new Error("验证码输入错误"))
      }else{
        callback()
      }
    };
    const  ruleForm = reactive({
        username: "",
        password: "",
        passwords: "",
        code: ""
      })
      const rules = reactive({
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        passwords: [{ validator: validatePasswords, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      })
    const menuTab = reactive([
        { txt: "登录", current: false ,type:'login'},
        { txt: "注册", current: true ,type:'register'}
      ])
      const model = ref('login')
      console.log(model.value)
      const toggleMenu = (data=>{
        menuTab.forEach(elem => {
        elem.current = false;
      });
      data.current = true;
      model.value = data.type
      })
    const submitForm = (formName=>{
        refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    })
    return {
      menuTab,
      model,
      toggleMenu,
      submitForm,
      ruleForm,
      rules
    }
  },
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.main-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    font-size: 14px;
    color: #fff;
    margin-bottom: 3px;
  }
  .block{
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top:19px;
  }
}
</style>
