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
        ref="loginForm"
        class="login-form"
        size="small"
      >
        <el-form-item prop="username">
          <label for="username">邮箱</label>
          <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <label for="password">密码</label>

          <el-input
            id="password"
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minilength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passwords" v-show="model === 'register'">
          <label for="repeatpass">重复密码</label>

          <el-input
            id="repeatpass"
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minilength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <label for="validate">验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <div class="grid-content bg-purple">
                <el-input id="validate" v-model="ruleForm.code" minlength="6" maxlength="6"></el-input>
              </div>
            </el-col>
            <el-col :span="9">
              <div class="grid-content bg-purple">
                <el-button
                  type="success"
                  class="block"
                  @click="getSms()"
                  :disabled="codeButtonStatus.status"
                >{{codeButtonStatus.text}}</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('loginForm')"
            class="block login-btn"
            :disabled="loginButtonStatus"
          >{{model === "login" ? "登录" : "注册"}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import sha1 from 'js-sha1';
import { GetSms, Register, Login } from "@/api/login";
import { reactive, ref, onMounted } from "@vue/composition-api";
import {
  stripscript,
  validateEmail,
  validatePass,
  validateVcode
} from "@/utils/validate";
export default {
  name: "Login",
  setup(props, { refs, root }) {
    //验证用户名
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validateEmail(value)) {
        callback(new Error("用户名格式有误"));
      } else {
        callback();
      }
    };
    //验证密码
    let validatePassword = (rule, value, callback) => {
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
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
      if (model.value === "login") {
        callback();
      }
      ruleForm.passwords = stripscript(value);
      value = ruleForm.passwords;
      // console.log(stripscript(value))

      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    //验证码
    let validateCode = (rule, value, callback) => {
      ruleForm.code = stripscript(value);
      value = ruleForm.code;
      if (value === "") {
        return callback(new Error("验证码不能为空"));
      } else if (validateVcode(value)) {
        return callback(new Error("验证码输入错误"));
      } else {
        callback();
      }
    };
    const ruleForm = reactive({
      username: "samsenwwt@gmail.com",
      password: "",
      passwords: "",
      code: ""
    });
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      passwords: [{ validator: validatePasswords, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }]
    });
    const menuTab = reactive([
      { txt: "登录", current: true, type: "login" },
      { txt: "注册", current: false, type: "register" }
    ]);
    // ********************          ***基础数据***        ************************************

    const model = ref("login");
    const loginButtonStatus = ref(true);
    const timer = ref(null);
    // const codeButtonStatus = ref(false);
    // const codeButtonText = ref("获取验证码");

    const codeButtonStatus = reactive({
      status: false,
      text: "获取验证码"
    });

    console.log(model.value);
    const toggleMenu = data => {
      menuTab.forEach(elem => {
        elem.current = false;
      });
      data.current = true;
      model.value = data.type;
      resetFormData();
      clearCountDown();
    };
    const resetFormData = (()=>{
      refs.loginForm.resetFields();
    })
    // 更新按钮状态
    const updataButtonStatus = ((params)=>{
      codeButtonStatus.status = params.status;
      codeButtonStatus.text = params.text;

    })
    // 获取验证码
    const getSms = () => {
      if (ruleForm.username == "") {
        root.$message.error("邮箱不能为空");
        return false;
      }
      if (validateEmail(ruleForm.username)) {
        root.$message.error("邮箱格式有误，请重新输入！！");
        return false;
      }
      // console.log()
      //请求接口
      let requestData = {
        username: ruleForm.username,
        module: model.value
      };
      //获取验证码按钮状态
      // codeButtonStatus.status = true;
      updataButtonStatus({
        status:true,
        text:'发送中'
      })

      GetSms(requestData)
        .then(response => {
          let data = response.data;
          root.$message({
            message: data.message,
            type: "success"
          });
          loginButtonStatus.value = false;
          console.log(data);
          countDown(60);
        })
        .catch(error => {
          console.log(error);
        });
    };

    // 提交表单
    const submitForm = formName => {
      // return false;
      refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          model.value === "login" ? login() : register();
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    // 登录
    const login = (() => {
      let requestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
      }
      root.$store.dispatch("app/login",requestData).then(response => {
          console.log('登录结果')
          console.log(response)
          root.$router.push({
            name:"Console"
          });
          clearCountDown();
        }).catch(error => {});
      // Login(requestData).then(response => {
      //     console.log('登录结果')
      //     console.log(response)
      //     root.$router.push({
      //       name:"Console"
      //     });
      //     clearCountDown();
      //   }).catch(error => {});
    });
    // 注册
    const register = (() => {
      let requestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
        module:'register'
        
      };
      Register(requestData).then(response => {
          // console.log(response)
          let data = response.data;
          root.$message({
            message: data.message,
            type: "success"
          });
          toggleMenu(menuTab[0]);
          clearCountDown();
        })
        .catch(error => {
          //失败执行的代码
        })
    })

    //发送成功后倒计时，并将按钮设置激活
    const countDown = number => {
      // 设置防抖
      if (timer.value) {
        clearInterval(timer.value);
      }
      let time = number;

      timer.value = setInterval(() => {
        time--;
        console.log(time);
        if (time === 0) {
          clearInterval(timer.value);
          updataButtonStatus({
            status:false,
            text:"再次获取"
          })
          // codeButtonStatus.status = false;
          // codeButtonStatus.text = "再次获取";
        } else {
          codeButtonStatus.text = `倒计时${time}秒`;
        }
      }, 1000);
    };
    const clearCountDown = () => {
      // 还原验证码初始状态

      updataButtonStatus({
            status:false,
            text:"获取验证码"
          })
      // codeButtonStatus.status = false;
      // codeButtonStatus.text = "获取验证码";
      // 清除倒计时
      clearInterval(timer.value);
    
      //   const codeButtonStatus = reactive({
      //   status: false,
      //   text: "获取验证码"
      // });
    };

    onMounted(() => {});
    return {
      menuTab,
      model,
      toggleMenu,
      submitForm,
      ruleForm,
      rules,
      getSms,
      codeButtonStatus,
      loginButtonStatus,
      timer,
      countDown,
      clearCountDown
    };
  }
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
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
