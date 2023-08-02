<template>
  <div class="navbar">
    <span class="iconfont icon-fanhui" @click="back"></span>
    <p>{{ title }}</p>
  </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    props:['title'],
    methods: {
      back(){
        this.$router.push('/index')

      }
    }
}
</script>

<style lang="less" scoped>
.navbar{
  width: 100%;
  height: 40px;
  background-color:white;
  border-bottom: 1px solid #f8f8f8;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
}
.navbar>span{
  display: inline-block;
  width: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 25px;
}
.navbar>p{
  width: 270px;
  text-align: center;
  font-size: 15px;
}
</style>