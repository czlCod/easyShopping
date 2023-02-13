/**
 * 1  当查询订单页面被打开时，会启动onShow和onLoad 但是因为频繁被打开 所以使用onShow
 *    0 onShow 不同于 onLoad  无法在形参上接收options参数的
 *    0.5 判断是否有token值
 *        1  如果没有 那么就跳转到授权页面
 *        2  如果有 那么就往下继续进行
 *    1 获取url上的参数type
 *    2 根据type来决定页面标题的数组元素  哪个被激活选中
 *    2 根据type  去发送请求获取订单数据
 *    3 渲染页面
 * 
 * 2 点击不同的标题时 重新发送请求来获取和渲染数据
 */


//0  引入发来的请求
import {request} from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:[],

    tabs:[
      {
        id:0,
        value:"全部",
        isActive:true

    },
    {
      id:1,
      value:"待付款",
      isActive:false

  },
  {
    id:2,
    value:"代发货",
    isActive:false

  },
  {
    id:3,
    value:"退款/退货",
    isActive:false

  }

],

ordersList:[
  {
    id:1,
    value:"HMDD20190812000000001101",
    price:13618,
    time:"2019/8/12 下午9:36:25"
  },
  {
    id:2,
    value:"HMDD20190812000000001102",
    price:1228,
    time:"2019/8/12 下午9:36:25"
  },
  {
    id:3,
    value:"HMDD20190812000000001103",
    price:11338,
    time:"2019/8/12 下午9:36:25"
  },
  {
    id:4,
    value:"HMDD20190812000000001104",
    price:18618,
    time:"2019/8/12 下午9:36:25"
  },
  {
    id:5,
    value:"HMDD20190812000000001105",
    price:15618,
    time:"2019/8/12 下午9:36:25"
  },
  {
    id:6,
    value:"HMDD20190812000000001106",
    price:17681,
    time:"2019/8/12 下午9:36:25"
  }
],
  },
   //onShow是无法使用options获取到type的 
  //所以我们要获取当前小程序的页面栈-数组 长度最大是10页面
  //数组中 索引最大的就是当前页面
  onShow(){

    const token = wx.getStorageSync("token");

    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index'
      })
    }

    //使用一个getCurrenPage()获取到页面数组
    let pages = getCurrentPages();
    let currentPage = pages[pages.length-1];
    // 打印出当前页面中的 options
    
    //此处获取到type！
    const {type} = currentPage.options;

    //根据type的不同，从而active的状态也不同（即是否选项是否变红色），那么就要“更新数组”
    this.changeTitleByIndex(type-1);

    //type作为一个参数，传入进获取订单列表的方法当中，根据type的不同获取到不同的数据
    this.getOrders(type);
    
  },

  //获取订单列表的方法
  async getOrders(type){
    const res = await request({url:"/my/orders/all",data:{type}})
   
    console.log("因为个人无法获取到token  所以无法获取到全部订单 则在全部订单中显示全部 但是功能模块仍实现");
    this.setData({
      orders:res.orders
      
      // 注意！时间戳问题
      // 1、比如你获取了一个订单，那么当你需要显示订单时间时，你要跟后台沟通好，显示的时间是到哪里，毫秒还是秒
      // 2、然后你申请的订单列表中，你获得的时间可能是一串数字，那么你需要把他们转换一下
      // 3、接口中的订单列表的是 create_time 然后我们加入一个新的成员变量create_time_cn
      // 4、然后可以直接使用这个create_time_cn
      /* 
      思想：用map方法，先把orders每项v拿过来，然后遍历，创建一个create_time_cn，通过newDate时间方法，让create_time乘1000（意思是到达毫秒）
      然后通过toLocalString()方法把时间变成一个string类型变量
       */
      // orders:res.orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocalString())}))
    })
    
  
  
  
  
  },

  changeTitleByIndex(index){
    let {tabs} = this.data;

    tabs.forEach((v,i) => i === index?v.isActive=true:v.isActive=false);

    this.setData({
      tabs
    })

  },
  

  handleTabsItemChange(e){
    
    const {index} = e.detail
    this.changeTitleByIndex(index);
   
    //因为当点击了其他的按钮时，要重新发送请求
    this.getOrders(index+1)
  },

 

 





})