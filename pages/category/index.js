// pages/category/index.js
//0  引入发来的请求
import {request} from "../../request/index.js"
Page({

  data: {
    //左侧数据数组
    leftMenuList:[],
    // 右侧数据数组
    rightContent:[],

    //设置active变量
    currentIndex:0,

    //设置滑到顶部的位置的变量
    scrollTop:0

  },

  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {



    /*

      0 web中的本地存储和 小程序中的本地存储的区别
        1 写代码的方式不一样了
          web： 创建：  localStorage.setItem("key","vuale")  
                获取：  localStorage.getItem("key")

          小程序：  创建：  setStorageSync("key","value")
                    获取：  getStorageSync("key")

        2 存的时候 有没有做类型转换
            web：不管存入的是什么类型的数据，最终都会先调用toString()，把数据变成了字符串，再存入进去
            小程序： 不存在类型转换这个操作，存入什么类型的数据进去，获取的时候就是什么类型

      1 先判断本地存储中有没有旧的数据
      {time:Date.now(),data:[...]}

      2 没有旧数据，那么就发送请求
      3 有旧的数据，同时 旧的数据没有过期的话，就是用本地存储中的数据即可

    */


      // 1 获取本地存储中的数据 （小程序中也有本地存储技术的）
      const Cates=wx.getStorageSync('cates');

      // 2 获取了之后需要判断，这个获得的“数据对象”是否为空

      if(!Cates){
        //如果数据不存在，那么就请求获取数据，然后把它赋值并存储（存储在this.Cates里面实现）
        this.getCates();
      }
        else if(Date.now()-Cates.time>1000*10){
          //判断是否过期，如果过期就重新发送请求
          this.getCates();          
        }
        else{
          //可以使用旧的数据
          this.Cates = Cates.data;
          let leftMenuList = this.Cates.map(v=>v.cat_name);
      
          let rightContent = this.Cates[0].children;

          this.setData({
            leftMenuList,
            
            rightContent,
            scrollTop:0
          })
        }


    this.getCates()
  },

  //获取分类数据
  async getCates(){
    // request({
    //   url:"/categories"
    // })
    // .then(res=>{
    //   this.Cates=res.data.message;

    //   //把接口的数据存入到本地存储去
    //   wx.setStorageSync("cates",{time:Date.now(),data:this.Cates})

    //   //构建左侧菜单
    //   let leftMenuList = this.Cates.map(v=>v.cat_name);
      
    //   let rightContent = this.Cates[0].children;

    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })

    //1 使用es7的async await来发送请求
    const res = await request({url:"/categories"});

      this.Cates=res.data.message;

      //把接口的数据存入到本地存储去
      wx.setStorageSync("cates",{time:Date.now(),data:this.Cates})

      //构建左侧菜单
      let leftMenuList = this.Cates.map(v=>v.cat_name);
      
      let rightContent = this.Cates[0].children;

      this.setData({
        leftMenuList,
        rightContent
      })
  },

  //绑定事件
  handleItemTap(e){

    /**
     * 1  获取被点击的标题身上的索引
     * 2  给data中的currentIndex赋值就可以了
     * 3  根据不同的索引来渲染右侧的商品内容
     */
    
    const {index}=e.currentTarget.dataset;

    let rightContent = this.Cates[index].children;

    this.setData({
      currentIndex:index,
      rightContent
    })
    
  }
 
})