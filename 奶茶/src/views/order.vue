<template>
  <div class="order">
    <navbar title="订单"></navbar>
    <div class="back">
      <div class="back-title">
        <span>取餐码:{{details[0].buyId}}</span>
        <span>请您尽快取餐</span>
      </div>
    </div>
    <div class="order-list">
      <div class="order-list-item">
        <div class="top" v-for="item in orderList" :key="item.id">
          <img src="../assets/place.jpg" alt="">
          <div class="right">
            <div>
              <span>{{ item.name }}</span>
              <span>￥{{ item.price }}</span>
            </div>
            <p>正常冰/正常糖</p>
            <p>x{{ item.num }}</p>
          </div>
        </div>
        <div class="count">
          <p>共{{ count }}件，合计<span style="color: red;font-size: 20px;">￥{{ piccount }}.0</span></p>
        </div>
      </div>
      <div class="details">
        <ul>
          <li>下单时间<span>{{ details[0].timer }}</span></li>
          <li>订单编号<span>1659121504589365250</span></li>
          <li>取餐号码<span>{{ details[0].buyId }}</span></li>
          <li>备注<span>无</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import navbar from '@/components/navbar.vue'
export default {
  data(){
    return{
      details:[],
      orderList:[],
      count:0,
      piccount:0
    }
  },
  components:{
    navbar
  },
  mounted(){
      let orders = JSON.parse(sessionStorage.getItem('orderList'));
      if(orders != null){
        this.orderList = orders.filter(item=>{
          if(item.id){
            this.count += parseInt(item.num)
            this.piccount += Number(item.num)*Number(item.price)
            return item
          }
        })
        this.details = orders.filter(item=>{
          if(item.buyId){
            return item
          }
        })
      }else{
        Toast.fail('暂无订单');
        setTimeout(()=>{
          this.$router.push('/placeOrder')
        },1000)
      }
      
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
.back{
  width: 100%;
  height: 150px;
  background-image: url('../assets/order-bk.png');
  background-size: 100% 150px;
  position: relative;
  .back-title{
    width: 150px;
    height: 100px;
    position: absolute;
    top: 20px;
    left: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    span:nth-child(1){
      font-size: 20px;
      color: white;
    }
    span:nth-child(2){
      font-size: 12px;
      color: rgb(242, 221, 221);
      letter-spacing: 2px;
    }
  }
}
.order-list{
  width: 100%;
  height:calc(100% - 140px);
  overflow-y:scroll;
  background-color: #f6f6f6;
}
.order-list-item{
  width: 95%;
  height: auto;
  margin: auto;
  background-color: #ffffff;
  border-radius:10px;
  .top{
    width: 95%;
    height: 100px;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #efefef;
    border-bottom: 1px solid #efefef;
    img{
      width: 80px;
      height: 80px;
    }
    .right{
      width: calc(100% - 90px);
      height: 80px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      div{
        width: 100%;
        height: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        span:nth-child(1){
          font-weight: 600;
        }
      }
    }
  }
}
.top:nth-child(1){
  margin-top:10px;
}
.right>p:nth-child(2){
  font-size: 10px;
}
.count{
  width: 95%;
  height: 30px;
  text-align: right;
  margin: auto;
  margin-top:5px;
  font-size: 12px;
  margin-bottom: 10px;
}
.details{
  width: 95%;
  height: 120px;
  margin: auto;
  background-color: white;
  border-radius:10px;
  ul{
    width: 95%;
    height: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    li{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      span{
        width:70%;
        display: block;
        font-size: 12px;
      }
    }
  }
}
</style>