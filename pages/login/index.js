// pages/login/index.js
Page({
  


  //注意：wx.getUserProfile必须是用户点击之后才能触发，意思是bindtap绑定该函数才可
  handleGetUserInfo(e){

    wx.getUserProfile({
      desc:'获取信息',
      success: (res) => {
        console.log(res);
        const {userInfo} = res;
        wx.setStorageSync("userInfo", userInfo);
        
        console.log(userInfo);
      },
      fail: () => {},
      complete: () => {
        wx.navigateBack({
          delta: 1
        })
      }
    });



  },


 
  









})