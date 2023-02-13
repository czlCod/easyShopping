
// 1、用户上滑页面 触到底部 然后刷新下一页数据
/*
 *    1找到滚动条触发事件  
 *    2判断有没有下一页数据
 *      获取总页数和当前页数，如果当前页数大于等于总页数 那么就没有下一页了
 *      当前页数： pagenum
 *      总页数： 总页数 = Math.ceil( 总条数 /  页容量  pagesize 10)
 *      如果有：那么就加载下一页数据
 *      如果没有：弹出个提示说 到达底部了
 */




//0  引入发来的请求
import {request} from "../../request/index.js"



// pages/goods_list/index.js
Page({

  data: {
    //定义tabs的内容数组
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true

    },
    {
      id:1,
      value:"销量",
      isActive:false

  },
  {
    id:2,
    value:"价格",
    isActive:false

}],

  goodsList:[],

  

  },

  //接口需要的参数，从这里接收
  //至于其中的 参数与其options所传递的参数 的一个对应比较 你无需管理
  //你只需要有如下的这个参数样例 来接收所得来的数组
  //然后再 await request 里 把data设置成this.你设置的参数样例名
  QueryPramas:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },

  totalPage:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryPramas.cid=options.cid;
    
    this.getGoodsList();
  },

  //获取商品列表数据
  async getGoodsList(){
    const res = await request({url:"/goods/search",data:this.QueryPramas})

    const total = res.data.message.total

    this.totalPage = Math.ceil(total / this.QueryPramas.pagesize)
    
    this.setData({
      //通过拼接数组 然后把后面申请的内容填充进去
      goodsList:[...this.data.goodsList,...res.data.message.goods]
    })

    //关闭下拉刷新事件
    wx.stopPullDownRefresh();
  },

  //绑定点击事件函数 传递给父组件
  handleTabsItemChange(e){
    
    const {index} = e.detail

    let {tabs} = this.data;

    tabs.forEach((v,i) => i === index?v.isActive=true:v.isActive=false);

    this.setData({
      tabs
    })
  },

  //页面上滑触底事件
  onReachBottom(){
    if(this.QueryPramas.pagenum>=this.totalPage){
      //没有下一页 显示到达底部
      wx.showToast({
        title: '没有下一页了'});
        
    }
    else{
      this.QueryPramas.pagenum++;
      this.getGoodsList();

      
    }
  },

  //下拉刷新时间
  onPullDownRefresh(){

    

    this.setData({
      goodsList:[]
    })

    this.QueryPramas.pagenum=1;
    this.getGoodsList();

    
  }

  

})