//Page Object

//0  引入发来的请求
import {request} from "../../request/index.js"

Page({
  data: {
     swiperList:[],
     //导航 数组
     catesList:[],
     //楼层 数据
     floorList:[],
     imgArray:[
       "//img.alicdn.com/imgextra/i1/6000000007374/O1CN01pbkC8a24LLGHhwVeh_!!6000000007374-0-octopus.jpg",
       "//aecpm.alicdn.com/simba/img/TB1JNHwKFXXXXafXVXXSutbFXXX.jpg",
       "//img.alicdn.com/imgextra/i1/6000000008048/O1CN01oIVdRc29K2D0FObyv_!!6000000008048-0-octopus.jpg"
     ]
  },
 //页面开始加载 就会触发
  onLoad: function(options) {
    
    this.getCatesList();
    this.getFloorList();
  },


  
//1、发送异步请求获取轮播图数据
getCatesList(){
  request({
    url:"/home/catitems"
  })
  .then(result => {
    this.setData({
      catesList:result.data.message
    })
  })
},

//2、请求楼层数据
getFloorList(){
  request({
    url:"/home/floordata"
  })
  .then(result => {
    this.setData({
      floorList:result.data.message
    })
  })
}

});
  