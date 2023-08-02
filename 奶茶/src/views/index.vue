<template>
  <div class="index">
   <div class="top">
        <div class="mid">
            <img src="../assets/in_logo.png" alt="">
            <div>
                <p>{{ user == 'admin' ? '管理员' : '普通用户' }}</p>
                <p v-show="user != 'admin'">会员可享多重优惠，登录即可享受</p>
            </div>
            <button @click="goLogin" v-if="user != 'admin'">授权登录</button>
            <button @click="exit" v-else>退出登录</button>
        </div>
   </div>
   <div class="in_mid" v-if="user != 'admin'">
    <div @click="toplaceOrder">
        <div class="in_mid-text">
            <p>{{ in_mid[0].title }}</p>
            <p>{{ in_mid[0].tips }}</p>
        </div>
        <img src="../assets/left.png" alt="">
    </div>
    <div @click="toOrder">
        <div class="in_mid-text">
            <p>{{ in_mid[1].title }}</p>
            <p>{{ in_mid[1].tips }}</p>
        </div>
        <img src="../assets/right.png" alt="">
    </div>
   </div>
   <div class="in_mid" v-else>
    <div @click="toaddOrder">
        <div class="in_mid-text">
            <p>{{ in_mid[2].title }}</p>
            <p>{{ in_mid[2].tips }}</p>
        </div>
        <img src="../assets/left.png" alt="">
    </div>
    <div @click="toproductList">
        <div class="in_mid-text">
            <p>{{ in_mid[3].title }}</p>
            <p>{{ in_mid[3].tips }}</p>
        </div>
        <img src="../assets/right.png" alt="">
    </div>
   </div>
   <div class="bot">
    
   </div>
  </div>
</template>

<script>
export default {
    data () { 
        return {
            user:'',
            in_mid:[{title:'点餐',tips:'下单免排队'},{title:'订单',tips:'实时看订单'},{title:'添加商品',tips:'添加新产品'},{title:'商品列表',tips:'商品信息列表'}]
        }
    },
    methods:{
        goLogin(){
            this.$router.push('/login')
        },
        toplaceOrder(){
            this.$router.push('/placeOrder')
        },
        toOrder(){
            this.$router.push('/order')
        },
        toaddOrder(){
            this.$router.push('/addorder')
        },
        exit(){
            sessionStorage.removeItem('user')
            this.user = ''
        },
        toproductList(){
            this.$router.push('/productList')
        }
    },
    created(){
        const user = sessionStorage.getItem('user')
        if(user != null){
            this.user = user
        }
    },
}
</script>
<style lang="less" scoped>
// 自定义滚动条
::-webkit-scrollbar {
    width: 1px;
    background-color: #F5F5F5;
}
.index{
    width: 100%;
    height: 600px;
    overflow-y: scroll;
}
.top{
    width: 100%;
    height: 230px;
    background-image: url('../assets/in_back.png');
    background-size: 100%;
    position: relative;
}
.mid{
    width: 95%;
    height: 60px;
    position: absolute;
    left: 2.5%;
    top:200px;
    border-radius: 12px;
    background-color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    img{
        width: 50px;
        height: 50px;
        background-color: #ffe7d6;
        border-radius: 50%;
    }
    div{
        width: 50.3%;
    }
    button{
        outline: none;
        border: none;
        height: 30px;
        width: 20%;
        background-color: #ff927c;
        border-radius: 5px;
        font-size: 12px;
        color: white;
        cursor: pointer;
    }
}
.mid>div p:nth-child(1){font-weight: 900;letter-spacing: 2px;}
.mid>div p:nth-child(2){font-size: 10px;margin-top: 5px;color: #d0d0d0;}
.in_mid{width: 95%;
    height:150px;
    position: relative;
    margin: auto;
    margin-top: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.in_mid>div{
    width: 47.5%;
    height: 100%;
    position: relative;
    border-radius: 15px;
    cursor: pointer;
    div{
        width: 60%;
        height: 60px;
        padding: 10px;
        display: inline-block;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        p:nth-child(1){
            font-weight: 900;
        }
        p:nth-child(2){
            font-size: 12px;
            color: #bfbdbd;
        }
    }
    img{width: 80px;height: 60px;margin-left:80px;}
}
.in_mid>div:nth-child(1){
    background-color:#f6f3dc;
}
.in_mid>div:nth-child(2){
    background-color:#fde6e6;
}
.bot{
    width: 95%;
    height: 130px;
    margin: 20px auto;
    background-image: url('../assets/in_btn.png');
    background-size: 100%;
    border-radius: 5px;
}
</style>