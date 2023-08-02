<template>
  <div class="product">
    <navbar title="商品列表"></navbar>
    <div class="placeList">
      <p>商品列表(共计<span style="color: red;">{{ orderList.length }}</span>种商品)</p>
      <div class="placeList-List">
        <div class="placeList-item" v-for="item in orderList" :key="item.id">
          <img src="../assets/place.jpg" alt="">
          <div class="placeList-item-content">
            <div class="placeList-item-content-top">
              <p>{{ item.name }}</p>
              <p>清爽夏李王辅料：雪梨果</p>
            </div>
            <div class="placeList-item-content-btn">
              <span>￥{{ item.price }}</span>
            </div>
          </div>
        </div>
      </div>
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
    }
  },
    mounted(){
    this.$http.get('/teaList').then(res=>{
        this.orderList = res.data
        this.orderList.forEach(item=>{
          item.num = 0
          item.imgurl = '../assets/place.jpg'
        })
    })
    this.orders = [];
  },
    components:{
    navbar
  },
}
</script>

<style lang="less" scoped>
::-webkit-scrollbar {
    width: 1px;
    background-color: #F5F5F5;
}
.product{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.placeList{
    width: 95%;
    height:100%;
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
    height: calc(100% - 90px);
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
</style>