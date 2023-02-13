/**
 * promise形式 showModel
 * @param {object} param0  参数
 * 
 */
//作用： 提示框 选择取消或者确定
export const showModel=({content})=>{
  return new Promise((resolve,reject)=>{
    wx.showModal({
      title: '提示',
      content: content,
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (res) => {
        resolve(res)
      },
      fail:(err)=>{
        reject(err);
      }
    });

  })
};

//作用： 提示框 选择取消或者确定  是否授权token值
export const showModelToken=({content})=>{
  return new Promise((resolve,reject)=>{
    wx.showModal({
      title: '提示',
      content: content,
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (res) => {
        const token = "BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
        wx.setStorageSync('token', token);
        wx.navigateBack({
          delta: 1
        });
          
      },
      fail:(err)=>{
       reject(err)
          
      },
     
    });

  })
};
  



/**
 * promise形式 showToast
 * @param {object} param0  参数
 * 
 */
//作用： 提示框 仅起提示作用 然后让用户无法点击（1.5s左右）
export const showToast=({title})=>{
  return new Promise((resolve,reject)=>{
    wx.showToast({
      title: title,
      icon: 'none',
      success: (res) => {
        resolve(res)
      },
      fail:(err)=>{
        reject(err);
      }
      
    });

  })
};
  



  