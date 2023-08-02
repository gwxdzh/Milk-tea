<template>
  <div class="login">
    <navbar title="登录页面"></navbar>
    <div class="mb"></div>
    <div class="container">
      <!-- login form -->
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          autocomplete="off"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import navbar from '@/components/navbar.vue'
import { Toast } from 'vant';
export default {
  data(){
    return{
      username: '',
      password: '',
    }
  },
  methods: {
    onSubmit() {
      this.$http.post('/login',{username:this.username,password:this.password}).then(res=>{
        console.log(res.data)
        if(res.data == "登录成功！"){
          Toast.success(res.data);
          sessionStorage.setItem('user',this.username)
          setTimeout(()=>{this.$router.push('/index')},1000)
        }else{
          Toast.fail(res.data);
          this.reset()
        }
      })
    },
    reset(){
      this.username = ''
      this.password = ''
    }
  },
  components:{
        navbar
    },
}
</script>

<style lang="less" scoped>
.login{
  width: 100%;
  height: 100%;
  border: 1px solid transparent;
}
  .container{
    width: 95%;
    height: auto;
    margin: auto;
  }
</style>