<template>
  <div class="addorder">
    <navbar title="添加商品"></navbar>
    <div class="add-form">
      <van-form @submit="onSubmit">
        <van-field
          v-model="tradeName"
          name="商品名称"
          label="商品名称"
          placeholder="商品名称"
          autocomplete="off"
          :rules="[{ required: true, message: '请填写商品名称' }]"
        />
        <van-field
          v-model="Price"
          type="number"
          name="单价"
          label="单价"
          placeholder="单价"
          autocomplete="off"
          :rules="[{ required: true, message: '请填写单价' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">添加商品</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import navbar from '@/components/navbar.vue'
export default {
  data() {
    return {
      tradeName: '',
      Price: '',
    };
  },
  methods: {
    onSubmit() {
      let datas = {name:this.tradeName,price:this.Price+'.00'}
      this.$http.post('/addTea',datas).then(res=>{
        if(res.data == "添加成功！"){
          Toast.success(res.data);
          this.reset()
        }else{
          Toast.fail(res.data);
          this.reset()
        }
      })
    },
    reset(){
      this.tradeName = ''
      this.Price = ''
    }
  },
  components:{
    navbar
  },
}
</script>

<style>

</style>