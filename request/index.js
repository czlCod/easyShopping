let ajaxTime=0;
export const request=(params)=>{
  ajaxTime++;
  //显示 加载中 效果
  wx.showLoading({
    title: '加载中',
    mask: true
  });
  // 设置一个公共部分
  const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url:baseUrl+params.url,
      success:(result)=>{
        resolve(result);
      },
      fail: (err)=>{
        reject(err);
      },
      complete:()=>{
        ajaxTime--;
        if(ajaxTime===0){
          wx.hideLoading();
        }
      }
    })
  })
}

/*
这里的params的参数是url，相当于传了一个网址过来
然后传了成功之后就到了success
把result结果运行了
拿category里的那个例子做比较
等于是运行成功之后带着result 传到了res
然后就console（res）
就成功打印了获取的result
result到res只是个参数名的转换
*/


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
  