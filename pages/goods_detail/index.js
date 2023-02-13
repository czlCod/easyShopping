//0  引入发来的请求
import {request} from "../../request/index.js"
import {showModel,showToast} from "../../utils/utils.js"
/*
1、点击轮播图 预览大图

  1 给轮播图绑定点击事件
  2 调用小程序的api previewImage

2、点击加入购物车
  1 先绑定点击事件
  2 获取缓存中的购物车数据 以数组格式
  3 先判断购物车中是否有该商品
    有：修改商品的数据 将商品的数量++ 然后再将购物车数组 重新填充回缓存中
    无：那么就给购物车数组添加一个新的元素 新元素带上购物车的数量属性 num 再重新把购物车数组填充回缓存中
  4 弹出提示  比如 购买成功

3 商品收藏功能
  1 页面onShow的时候 加载缓存中的商品收藏的数据
  2 判断当前商品是不是被收藏
    1 是 改变页面中的收藏图标
    2 不是  不用变
  3 点击商品收藏按钮时
    1 判断该商品是否存在缓存数组中，
      1 存在 则删除
      2 不存在 则添加到收藏数组中 也存入缓存中

*/


// pages/goos_detail/index.js
Page({


  data: {

    goodsObj:{}

  },

//商品对象
GoodsInfo:{},

  
  onShow: function () {
    let pages=getCurrentPages();

    let currentPage = pages[pages.length-1];

    let options = currentPage.options;



    const {goods_id} = options
    
    this.getGoodsDetail(goods_id);
  },

  //获取商品详情的接口

  async getGoodsDetail(goods_id){

    const goodsObj = await request({url:"/goods/detail",data:{goods_id}});

    this.GoodsInfo = goodsObj;
    this.setData({
      goodsObj:{
        goods_name:goodsObj.data.message.goods_name,
        goods_price:goodsObj.data.message.goods_price,

        //iphone部分手机 不识别webp图片格式
        //临时自己改的话 就确保后台存在 1.webp => 1.jpg
        goods_introduce:goodsObj.data.message.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goodsObj.data.message.pics
      }
    })
  },

  //点击轮播图 放大预览
  handlePreviewImage(e){
    const urls= this.GoodsInfo.data.message.pics.map(v=>v.pics_mid);
    const current = e.currentTarget.dataset.url

    wx.previewImage({
      //接收传递过来的图片url
      current,
      urls,
    });
  },


  //添加购物车功能
  handleCartAdd(){
    //获取缓存中的购物车数组
    let cart = wx.getStorageSync("cart")||[];
    
    //判断商品对象是否存在于数组中
    //这里的findIndex是判断这里的goods_id是否有一样的 如果没有就返回-1
    //这里个人要注意的是，你并没有像视频中的up主一样设置过数组 所以你还是要按照该数据的路径来填写
    let index = cart.findIndex(v=>v.data.message.goods_id===this.GoodsInfo.data.message.goods_id);

    if(index===-1){
      //说明数组中没有该商品，需要向数组中添加一个对象
      this.GoodsInfo.num=1;
      this.GoodsInfo.checked=true;
      cart.push(this.GoodsInfo)
    }
    else{
      //反之则有，需要将数量num++
      cart[index].num++;
    }
      //需要将购物车重新添加回缓存中
      wx.setStorageSync('cart', cart);
      wx.showToast({
        title: '加入成功',
        icon: 'success',
        mask: true
      });
        


  }

})