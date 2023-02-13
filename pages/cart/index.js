
/*
业务逻辑
1 获取用户的收货地址
  1 绑定点击事件
  2 调用小程序的内置 api 获取用户的收货地址  wx-chooseAddress 

2 onshow
  1 获取缓存中的购物车的数据
  2 然后将购物车数据 填充到data中

3 全选的实现 数据的展示
  1 onShow 获取缓存中的购物车数组
  2 根据购物车中的商品数据 所有商品被选中 则checked=true 全选就被选中
  3 空数组调用 every 就会返回true

4 总价格 总数量
  1 获取购物车数组
  2 遍历
  3 判断商品是否被选中 即查看checked属性是否为true
  4 总价格 += 商品单价* 商品数量
  5 总数量 +=商品数量  num属性值相加
  6 把计算后的价格和数量设置会data中 然后在相应的位置展示

5 商品的选中
  1 绑定一个change事件 比如数量的change
  2 获取到被修改的商品对象
  3 商品对象的选中状态 取反
  4 重新填充回data和缓存中
  5 重新计算全选 总价格 总数量

6 全选和反选
  1 全选复选框绑定事件 change
  2 获取data中的全选变量 allChecked
  3 直接取反 allChecked=！allChecked
  4 遍历购物车数组 让里面的购物车商品的所有选中状态都跟随者allchecked改变
  然后 把购物车数组和allChecked 全部设置回数组和缓存中

7 点击结算
  1 判断有没有选择收货地址
  2 判断有没有选购商品
  3 如果没有，则分别进行弹窗提示
  4 经过以上验证 跳转到支付页面

  */

  import {showModel,showToast} from "../../utils/utils.js"

Page({


  data: {

    address:{},
    cart:[],
    allChecked:true,
    totalPrice:0,
    totalNum:0
  },

  //生命周期事件
  onShow(){
    
    const  address = wx.getStorageSync("address");
    
    const cart = wx.getStorageSync("cart")||[];

    this.setData({address});
    this.setCart(cart);
    //   // 1 计算全选
    //   // 2 every 数组方法 会遍历 会接收一个回调函数 
    //   //   那么 只有每一个回调函数都返回true了 那么every的返回值就为true
    //   // const allChecked = cart.length?cart.every(v=>v.checked):false;
    //   let allChecked=true;
    //   //计算总价格 总数量
    //   let totalPrice=0;
    //   let totalNum=0;
    //   cart.forEach(v=>{
    //   if(v.checked)
    //   {
    //     totalPrice+=v.num * v.data.message.goods_price;
    //     totalNum+=v.num
    //   }
    //   else{
    //     allChecked=false;
    //   }
    // })

    // allChecked= cart.length!=0?allChecked:false;

    //   this.setData({
    //   address,
    //   cart,
    //   allChecked,
    //   totalPrice,
    //   totalNum
    // })
      
  },

  
  onLoad: function (options) {

  },

  // 选择地址事件
  handleChooseAddress(){
    wx.chooseAddress({
      success: (result) => {
        result.all=result.provinceName+result.cityName+result.countyName+result.detailInfo

        wx.setStorageSync("address", result); 
      },
    });
  },

  // CheckBox的绑定事件
  handleItemChange(e){
    const goods_id = e.currentTarget.dataset.id;
    
    let {cart} = this.data;

    let index = cart.findIndex(v=>v.data.message.goods_id===goods_id)

    cart[index].checked=!cart[index].checked;

    this.setCart(cart);
    
    
  },

  //allCheckBox的绑定事件
  handleItemAllchange(){
    //获取data中的数据 cart和allChecked 解构赋值 cart用于下面的修改购物车的checked属性
    let {cart,allChecked} = this.data;
    //让全选框取反就好了
    allChecked=!allChecked;
    //遍历数组，然后把它们的checked值改成全选框的值
    cart.forEach(v=>v.checked=allChecked)
    //然后再把它们重新存入data和缓存中
    this.setCart(cart);

  },

  //修改商品数量
  async handleItemNumEdit(e){
    let {operation,id}=e.currentTarget.dataset;
    let {cart}=this.data;
    let index = cart.findIndex(v=>v.data.message.goods_id===id);
    if(cart[index].num===1&&operation===-1){
    

      const res = await showModel({content:"是否删除商品？"})
      if (res.confirm) {
        cart.splice(index,1);
        this.setCart(cart)
      }
    }
    else{
      cart[index].num+=operation;
      this.setCart(cart)
    }
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

  //设置商品的复选框 全选框 以及计算总价格 总数量 存入data和缓存的操作
  setCart(cart){

    let allChecked=true;
      //计算总价格 总数量
      let totalPrice=0;
      let totalNum=0;
      cart.forEach(v=>{
      if(v.checked)
      {
        totalPrice+=v.num * v.data.message.goods_price;
        totalNum+=v.num
      }
      else{
        allChecked=false;
      }
    })

    allChecked= cart.length!=0?allChecked:false;

    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    })

    wx.setStorageSync("cart", cart);

  }
})