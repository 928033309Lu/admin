<template>
  <el-menu class="el-menu-demo" mode="horizontal" >

    <img src="@/images/logo.png" style="width:150px;height: 67px;margin-top: 3px;" class="logo">
    <div class="navbar">
      <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    </div>
    <div style="line-height: 82px;font-size: 20px;color: #FFFFFF;height: 80px;margin-left: 30px;font-weight: bold;">{{yonghu}}后台管理系统</div>

    <!--<breadcrumb class="breadcrumb-container"/>-->
    <div class="right">
      <!--<img src="@/images/tou.jpg" alt="">
            <span>{{username}}</span>
            <svg-icon icon-class="tab_下拉" style="
            width: 12px;
            height: 12px;
            "/>-->
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper" style="display: flex;">
          <!--<img src="@/images/tou.jpg" class="user-avatar">-->
          	<div style="border: 3px solid #E4E4E4;border-radius: 50%;width: 50px;height: 50px;text-align: center;line-height: 50px;box-sizing: content-box;color: #ffffff;font-weight: bold;letter-spacing: 1px;">{{username}}</div>
          <i class="el-icon-caret-bottom" style="line-height: 50px;margin-left: 15px;color: #ffffff;"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.dashboard') }}
            </el-dropdown-item>
          </router-link>
          <!-- <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item>
              {{ $t('navbar.github') }}
            </el-dropdown-item>
          </a> -->
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>
<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import store from '@/store'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'device'
    ])
  },
  name: 'HeaderTop',
  data() {
    return {
      username: '张三',
      yonghu:'',
    }
  },
  created() {
	    this.username=this.$store.getters.name;
	    this.getyonghu();
	    this.username=this.username.substring(this.username.length-2);
  },
  methods: {
  	toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    getyonghu(){
    	if(this.$store.getters.status==1){
    		this.yonghu="集团"
    	}else if(this.$store.getters.status==2){
    		this.yonghu="商户"
    	}else if(this.$store.getters.status==3){
    		this.yonghu="油站"
    	}
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>
<style scoped>
.el-menu-demo {
  height: 80px;
  background-color: #2f7aff;
  width: 100%;
  position: fixed;
  z-index: 999;
  padding-left: 20px;
  display: flex;

}
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;

}
.hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
    margin-top: 18px;
    margin-left: 25px;
}
.right {
  float: right;
  height: 80px;
  padding-right: 40px;
  padding-top: 15px;
  box-sizing: border-box;
  margin-left: auto;
}
.right img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
  border-radius: 50%;
  margin-right: 6px;
}
.right span {
  color: #fff;
  line-height: 80px;
  margin-right: 18px;
}
.right{
    color: #fff;
}
.right .avatar-wrapper{
	cursor: pointer;
}
.right .avatar-wrapper i{
	vertical-align: bottom;
    margin-bottom: 10px;
}
.right .svr_sec{
	width: 30px;
    height: 30px;
    vertical-align: middle;
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
}
</style>
