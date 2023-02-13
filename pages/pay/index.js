//购物车逻辑可前往购物车查找

/**
 * 1 页面加载的时候
 *   1 从缓存中获取购物车数据 然后渲染到页面中
 *   2 
 * 
 * 
 * 2 微信支付
 *   1 哪些人 哪些账号可以实现微信支付
 *      1 企业账号
 *      2 企业账号的小程序后台中 必须 给开发者添加上白名单
 *        1 一个appid 可以同时绑定多个开发者
 *        2 这些开发者可以共用appid和开发权限了
 */




  import {showModel,showToast} from "../../utils/utils.js"

Page({


  data: {

    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },

  //生命周期事件
  onShow(){
    
    const  address = wx.getStorageSync("address");
    
    let cart = wx.getStorageSync("cart")||[];

    cart=cart.filter(v=>v.checked)


    this.setData({address});
    //计算总价格 总数量
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v=>{
   
      totalPrice+=v.num * v.data.message.goods_price;
      totalNum+=v.num
 
  })

  this.setData({
    cart,
    totalPrice,
    totalNum,
    address
  })

    
  },


  //商品结算
  async handlePay(){
    // 1 判断收货地址，先拿到address
    const {address,totalNum}=this.data;
    if(!address.userName){
      await showToast({title:"您还没有选择收货地址"});
      return;
    };

    // 2、判断用户有没有选购商品的
    if(totalNum===0){
      await showToast({title:"您还没有选择商品"});
      return;
    };

    // 3、跳转到 支付页面
    wx.navigateTo({
      url: '/pages/pay/index',
    });
      
    
  },

  
})