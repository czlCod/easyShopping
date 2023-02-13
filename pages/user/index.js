// pages/user/index.js
Page({
  data: {
    userinfo:{},
    collectLen:0,
    cart:[]
  },

  onShow(){
    const userinfo=wx.getStorageSync("userInfo");
    const cart = wx.getStorageSync("cart");
    const collectLen=cart.length;
      this.setData({
        userinfo,
        collectLen
      })
  }
 
})