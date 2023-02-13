
  import {showModel,showToast,showModelToken} from "../../utils/utils.js"

Page({

token:"",

async getPower(){
  
  
  await showModelToken({content:"是否授予Token？"})
    
}
})