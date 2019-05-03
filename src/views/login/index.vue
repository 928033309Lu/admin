<template>
  <div class="login-container">
    
    <div class="warp login">
      <div class="zuo">
        <img src="../../images/denglu.jpg" alt="">
      </div>
      <div class="you">
        <el-tabs v-model="activeName" @tab-click="handleClick" v-show="show">
          <el-tab-pane label="账号密码登录" name="first">
            <el-form ref="loginForm" v-show="show" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

              <!-- <div class="title-container">
                <h3 class="title">{{ $t('login.title') }}智能加油站</h3>
              </div> -->

              <el-form-item prop="username">
                <span class="svg-container">
                  <svg-icon icon-class="user" />
                </span>
                <el-input
                  v-model="loginForm.username"
                  :placeholder="$t('login.username')"
                  name="username"
                  type="text"
                  style="color:black;"
                  auto-complete="on"
                />
              </el-form-item>

              <el-form-item prop="password">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  :type="passwordType"
                  v-model="loginForm.password"
                  :placeholder="$t('login.password')"
                  name="password"
                  auto-complete="on"
                  @keyup.enter.native="handleLogin" />
                <span class="show-pwd" @click="showPwd">
                  <svg-icon icon-class="eye" />
                </span>
              </el-form-item>
                <div class="btn">
                  <el-button :loading="loading" type="primary" style="width:100%;margin-top:30px;height:50px;" v-show="show"  @click.native.prevent="handleLogin">登录</el-button>
                  <!-- <el-button :loading="loading" type="primary" style="width:45%;margin-bottom:30px;" v-show="show" @click="show = false">注册</el-button> -->
                </div>
                <div class="zhuce">没有账户？<a @click="show = false" :loading="loading">立即注册</a></div>
            </el-form>

            
          </el-tab-pane>
          <el-tab-pane label="验证码登录" name="second">
            <el-form ref="loginForm" v-show="show" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

              <!-- <div class="title-container">
                <h3 class="title">{{ $t('login.title') }}智能加油站</h3>
              </div> -->

              <el-form-item prop="username">
                <span class="svg-container">
                  <svg-icon icon-class="user" />
                </span>
                <el-input
                  v-model="loginFormSms.username"
                  :placeholder="$t('login.username')"
                  name="username"
                  type="text"
                  auto-complete="on"
                />
              </el-form-item>
             
              <el-form-item prop="password" >
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                   <div class="code">
                <el-button :loading="loading" v-show="btnShow" type="primary" style="margin-bottom:22px;" class="btnObtainLogin" @click="obtain(loginFormSms.username,1)">获取验证码</el-button>
                <el-button :loading="loading"  v-show="!btnShow" type="primary" style="margin-bottom:22px;" class="btnTextLogin" >60秒后重新获取</el-button>
              </div>
                </span>
                <el-input
                
                  v-model="loginFormSms.code"
                  placeholder="验证码"
                  name="password"
                  auto-complete="on"
                  @keyup.enter.native="handleLogin" />
                <!-- <span class="show-pwd" @click="showPwd">
                  <svg-icon icon-class="eye" />
                </span> -->
              </el-form-item>
                <div class="btn">
                  <el-button :loading="loading" type="primary" style="width:100%;height:50px;margin-top:30px;" v-show="show"  @click.native.prevent="handleloginSms">登录</el-button>
                  <!-- <el-button :loading="loading" type="primary" style="width:45%;margin-bottom:30px;" v-show="show" @click="show = false">注册</el-button> -->
                </div>
              <div class="zhuce">没有账户？<a @click="show = false" :loading="loading">立即注册</a></div>
            </el-form>

            
          </el-tab-pane>
        </el-tabs>


        <el-form ref="loginForm" v-show="!show" :model="loginForm" :rules="loginRules" class="login-form" style="padding-top: 0;" auto-complete="on" label-position="left">

          <!-- <div class="title-container">
            <h3 class="title">{{ $t('login.title') }}智能加油站</h3>
          </div> -->

          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              v-model="registerInformation.phone"
              placeholder="手机号"
              name="username"
              type="text"
              auto-complete="on"
            />
          </el-form-item>
         
          <el-form-item prop="username" >
             <div class="code">
            <el-button :loading="loading" v-show="btnShow" type="primary" style="margin-bottom:22px;" class="btnObtain" @click="obtain(registerInformation.phone,2)">获取验证码</el-button>
            <el-button :loading="loading"  v-show="!btnShow" type="primary" style="margin-bottom:22px;" class="btnText">{{btnText}}秒后重新获取</el-button>
          </div>
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              v-model="registerInformation.code"
              placeholder="验证码"
              name="username"
              type="text"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :type="passwordType"
              v-model="registerInformation.password"
              :placeholder="$t('login.password')"
              name="password"
              auto-complete="on"
              @keyup.enter.native="handleLogin" />
            <span class="show-pwd" @click="showPwd">
              <svg-icon icon-class="eye" />
            </span>
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password"/>
            </span>
            <el-input
              :type="passwordType"
              v-model="registerInformation.passwords"
              placeholder="确认密码"
              name="password"
              auto-complete="on"
              @keyup.enter.native="handleLogin" />
            <span class="show-pwd" @click="showPwd">
              <svg-icon icon-class="eye" />
            </span>
          </el-form-item>
            <div class="register">
              <el-button :loading="loading" type="primary" style="width:100%;height:50px"  @click="register">注册</el-button>
            </div>
            <div class="zhuce"><a @click="show = true" :loading="loading"><< 返回登录页面</a></div>
        </el-form>

      </div>
      
    </div>
    
    
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import SocialSign from './socialsignin'
import { registerSms } from '@/api/zhuce'
import { loginSms } from '@/api/zhuce'
import { register } from '@/api/zhuce'
import { SmsLogin } from '@/api/login'
import $ from 'jquery'

export default {
  name: 'Login',
  components: { LangSelect, SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback()
        //callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
       activeName: 'first',
      //  account
      loginForm: {
        username: "",
        password: '123456',
      },
      loginFormSms: {
        username: "",
        // authcode: '',
        code:''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined,
      show:true,
      registerInformation:{
        phone:'',
        code:'',
        password:'',
        passwords:'',
      },
      btnShow:true,
      btnText:60
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }

  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleClick(tab, event) {
      // console.log(tab, event);
      this.show = true
    },
    register(){
      // this.$router.push('/register')
      
      var phone = this.registerInformation.phone
      if(!(/^1[34578]\d{9}$/.test(phone))){
        this.$message.error('请输入正确的手机号');
        return false; 
      } 
			    
      var sms = this.registerInformation.code
      if(sms == '' || sms == null){
        this.$message.error('请输入验证码');
        return false; 
      }
      if (this.registerInformation.password!=this.registerInformation.passwords) {
        this.$message.error('两次密码输入不一致，请重新输入');
        return false; 
      }
      var data = {
        phone:this.registerInformation.phone,
        password:this.registerInformation.password,
        authcode:this.registerInformation.code
      }
      register(data)
        .then(response => {
          console.log(response.data)
          if(response.data.message){
            this.$message({
              message: response.data.message,
              type: 'success'
            });
            this.show = true
            if (response.data.message=='成功!') {
              console.log(111111)
              // window.reload()
            }
          }
			})
    },
    obtain(phone,n){
      
      if(!(/^1[34578]\d{9}$/.test(phone))){
        this.$message.error('请输入正确的手机号');
        return false; 
      }
      var data = {
        phone:phone
      }
      if (n==1) {
        document.querySelector('.btnTextLogin').style.display = 'inline-block'
        document.querySelector('.btnObtainLogin').style.display = 'none'
        loginSms(data)
          .then(response => {
            console.log('登录获取验证码')
            console.log(response.data)
          })
      }else if(n==2){
        $('.btnText').css('display','inline-block');
        $('.btnObtain').css('display','none'); 
        // document.querySelector('.btnText').style.display = 'inline-block'
        // document.querySelector('.btnObtain').style.display = 'none'
        registerSms(data)
          .then(response => {
            console.log('注册获取验证码')
            console.log(response.data)
            if(response.data.message=="用户已注册！"){
                $('.btnText').css('display','none');
                $('.btnObtain').css('display','inline-block');
                clearInterval(dingshiqi)
               this.$message({
                message: response.data.message,
                type: 'error'
              });
            }
          })
      }
      
      var num = 60
      var dingshiqi = setInterval(function(){
        num--
        this.btnText = num
        // console.log(this.btnText)
        // console.log(num)
        if (num<1) {
          this.btnShow = true
          console.log(this.btnShow)
          $('.btnText').css('display','none');
          $('.btnObtain').css('display','inline-block');
          document.querySelector('.btnTextLogin').style.display = 'none'
          document.querySelector('.btnObtainLogin').style.display = 'inline-block'
          this.btnText = ''
          document.querySelector('.btnText').innerHTML = 60+'秒后重新获取'
          $('.btnTextLogin').text(60+'秒后重新获取')
          clearInterval(dingshiqi)
          return
        }
        if(n==1){
          console.log('登录'+num)
          // document.querySelector('.btnText').innerHTML = num+'秒后重新获取'
          $('.btnTextLogin').text(num+'秒后重新获取')
        }else{
          console.log('注册'+num)
          $('.btnText').text(num+'秒后重新获取')
          // document.querySelector('.btnTextLogin').innerHTML = num+'秒后重新获取'
        }
      },1000)
    },
    handleloginSms(){
      if(!(/^1[34578]\d{9}$/.test(this.loginFormSms.username))){
        this.$message.error('请输入正确的手机号');
        return false; 
      }
      if (this.loginFormSms.code==''||this.loginFormSms.code==null) {
        this.$message.error('请输入验证码');
        return false;
      }
      var data = {
        phone:this.loginFormSms.username,
        code:this.loginFormSms.code
      }
      this.$store.dispatch('SmsLogin', data).then(() => {
        this.loading = false
        this.$router.push({ path: this.redirect || '/' })
      }).catch(() => {
        this.loading = false
      })
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1)
      // const hashObj = getQueryObject(hash)
      // const originUrl = window.location.origin
      // history.replaceState({}, '', originUrl)
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // }
      // const codeName = hashObj[codeMap[this.auth_type]]
      // if (!codeName) {
      //   alert('第三方登录失败')
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' })
      //   })
      // }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#283443;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        color: #000;
        height: 47px;
        caret-color: $cursor;
        &:-webkit-autofill {
          // -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          // -webkit-text-fill-color: $cursor !important;
          -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
          -webkit-text-fill-color: #000 !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      // color: #454545;
      color: #000;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.code{
  text-align: right;
}
.register{
  text-align: center;
}

.btn{
  display: inline;
  display: flex;
  justify-content: space-between;
}
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  // background-color: $bg;
  background-color: #fff;
  .login-form {
    // position: absolute;
    // left: 0;
    // right: 0;
    width: 520px;
    max-width: 100%;
    padding: 25px 70px 15px 65px;
    // margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
.warp{
  width: 1040px;
  max-width: 100%;
  // padding: 35px 35px 15px 35px;
  margin: 155px auto;
  display: flex;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: 1px solid #ebeef5;
}
.zuo{
  width: 520px;
}
.zuo img{
  width: 520px;
  height: 100%;
}
.you{
  padding-top: 30px;
}
.el-tabs__active-bar{
  display: none;
}
.el-tabs__nav-scroll .tabs__nav {
  width: 100%;
}
.el-tabs__item {
  width: 50%;
  text-align:center;
}
.el-form-item{
  margin-top: 30px;
}
</style>
<style >
/* .login .el-tabs__item {
  width: 50%;
  text-align:center;
  color: #fff;
} 
.login .el-tabs__nav {
  width: 100%;
} */
.login .el-tabs__item.is-active{
  color: black;
}
.login .el-tabs__nav-scroll{
  padding-left: 70px;
}
.login .el-tabs__nav-wrap::after{
  background-color: #fff;
}
.login .el-form-item__content{
  background-color: #fff;
  color: #000;
  
}
.login-container .login .el-input input{
  color:black !important; 
  caret-color: #000;
}
.zhuce{
  margin-top: 20px;
  text-align: right;
}
.zhuce a{
  color: #409EFF
}

.code{
  position: absolute;
  right: 0;
  top: 7px;
  z-index: 10;
}
.code .el-button--primary{
  background-color: #fff;
  color: #409EFF;
  border-color:#fff;
  border-left-color: #eee;
  border-radius:0;
}

</style>
