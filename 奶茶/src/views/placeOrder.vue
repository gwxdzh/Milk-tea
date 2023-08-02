<template>
  <div class="order">
    <navbar title="下单系统"></navbar>
    <div class="order-top">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img src="../assets/order-1.png" alt="">
        </van-swipe-item>
        <van-swipe-item>
          <img src="../assets/order-2.png" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="placeList">
      <p>商品列表</p>
      <div class="placeList-List">
        <div class="placeList-item" v-for="item in orderList" :key="item.id">
          <img src="../assets/place.jpg" alt="">
          <div class="placeList-item-content">
            <div class="placeList-item-content-top">
              <p>{{ item.name }}</p>
              <p>清爽夏李王辅料：雪梨果</p>
            </div>
            <div class="placeList-item-content-btn">
              <span>￥{{ parseInt(item.price) + '.0' }}</span>
              <div>
                <span v-show="item.num != 0" @click="smi(item.id)">-</span>
                <span v-show="item.num != 0">{{ item.num }}</span>
                <span @click="add(item.id)">+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="checkOut">
      <span>合计:<span style="color: red;">￥{{ count }}</span></span>
      <button @click="onSubmit">提交订单</button>
    </div>
  </div>
</template>

<script>
import navbar from '@/components/navbar.vue'
import { Toast } from 'vant';
export default {
  data(){
    return{
      orderList:[],
      count:'0.00',
      orders:[]
    }
  },
  methods:{
    smi(id){
      this.count = 0
      this.orderList.forEach(item=>{
          if(item.id == id){
            item.num > 0 ? item.num -= 1 : item.num = 0
          }
          this.count += Number(item.price)*item.num
        })
        this.count += '.00'
        this.$forceUpdate()
        this.ordersChange()
    },
    add(id){
      this.count = 0
      this.orderList.forEach(item=>{
          if(item.id == id){
            item.num += 1
          }
          this.count += parseInt(item.price)*item.num
        })
        this.count += '.00'
        this.$forceUpdate()
        this.ordersChange()
    },
    onSubmit(){
      if(this.count != '0.00'){
        this.$http.get('/buyId').then(res=>{
          let buyId = res.data
          this.orders.push({buyId,'timer':this.timer()})
          sessionStorage.setItem('orderList',JSON.stringify(this.orders))
          this.$router.push('/order')
        })
      }else{
        Toast.fail('请选择商品');
      }
      
      
    },
    ordersChange(){
      this.orders = this.orderList.filter(item=>{if(item.num != 0)return item;})
    },
    timer(){
        const dateTime = new Date()
        function format(){
            const year = dateTime.getFullYear()
            const month = dateTime.getMonth() + 1 > 9 ? dateTime.getMonth() + 1 : '0' + (dateTime.getMonth() + 1)
            const day = dateTime.getDate() > 9 ? dateTime.getDate() : '0' + dateTime.getDate()
 
            const hour = dateTime.getHours() > 9 ? dateTime.getHours() : '0' + dateTime.getHours()
            const minute = dateTime.getMinutes() > 9 ? dateTime.getMinutes() : '0' + dateTime.getMinutes()
            const second = dateTime.getSeconds() > 9 ? dateTime.getSeconds() : '0' + dateTime.getSeconds()
 
            return `${year}-${month}-${day} ${hour}:${minute}:${second}`
        }
        const current = format();
        return current
    }
        
  },
  components:{
    navbar
  },
  mounted(){
    this.$http.get('/teaList').then(res=>{
      this.orderList = res.data.filter(item=>{
          if(!isNaN(item.price) && (parseInt(item.price))>0){
           return item
          }
        })
        this.orderList.forEach(item=>{
          item.num = 0
          item.imgurl = '../assets/place.jpg'
        })
    })
    this.orders = [];
  }
}
</script>

<style lang="less" scoped>
::-webkit-scrollbar {
    width: 1px;
    background-color: #F5F5F5;
}
.order{
  width: 100%;
  height: 100%;
}
.order-top{
  width: 95%;
  height: auto;
  margin: auto;
  margin-top:10px;
}
 .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    text-align: center;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .placeList{
    width: 95%;
    height:calc(90% - 170px);
    margin: auto;
  }
  .placeList>p{
    width: 100%;
    height: 20px;
    border-left: 2px solid red;
    font-size: 12px;
    line-height: 20px;
    padding-left: 5px;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .placeList-List{
    width: 100%;
    height: calc(100% - 40px);
    overflow-y:scroll;
    overflow-x:hidden;
  }
  .placeList-item{
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    img{
      width: 80px;
      height: 80px;
      border-radius:10px;
    }
  }
  .placeList-item-content{
    width: calc(100% - 100px);
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

  }
  .placeList-item-content-top{
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p:nth-child(1){
      font-weight: 600;
    }
    p:nth-child(2){
      color: #8a8686;
      font-size: 11px;
    }
  }
  .placeList-item-content-btn{
    width: 	100%;
    height: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
    div{
      width: 50%;
      height: 100%;
      text-align: right;
      margin-right: 10px;
      display: flex;
      flex-direction: row;
      justify-content: right;
      align-items: end;
      span{
        display: block;
        height: 20px;
        width: 20px;
        margin-left: 15px;
        line-height: 20px;
        text-align: center;
      }
      span:nth-child(1){
          font-size: 20px;
          border-radius: 50%;
          background-color: white;
          color: #e60015;
          border: 1px solid #e60015;
          cursor: pointer;
      }
      span:nth-child(3){
          font-size: 20px;
          border-radius: 50%;
          background-color: #e60015;
          color: white;
          cursor: pointer;
      }
    }
  }
  .checkOut{
    width: 100%;
    height: 50px;
    border-top: 1px solid #efefef;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    span:nth-child(1){
      display: block;
      width: 50%;
      margin-left: 10px;
      span{
        display: inline;
        font-size: 20px;
      }
    }
    button{
      margin-right:10px;
      outline: none;
      border: none;
      background-color: #e60015;
      color: white;
      width: 100px;
      height: 35px;
      border-radius: 35px;
      font-size: 15px;
      cursor: pointer;
    }
  }
</style>