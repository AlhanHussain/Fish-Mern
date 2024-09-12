import userModel from "../model/userModel.js";




//add to cart
const addToCart = async(req,res)=>{
    try {
      let userData = await userModel.findOne({_id:req.body.userId})
      let cartData = userData.cartData;
      if(!cartData[req.body.itemId]){
        cartData[req.body.itemId] = 1
      }  else{
        cartData[req.body.itemId] += 1
      }
      await userModel.findByIdAndUpdate(req.body.userId,{cartData})
      return res.status(200).json({success:true,message:"added to cart"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"server error"})
    }
}


//remove from cart
const removeFromCart = async(req,res)=>{
  try {
    let userData = await userModel.findOne({_id:req.body.userId})
    let cartData = userData.cartData;
    if(cartData[req.body.itemId]){
        cartData[req.body.itemId] -= 1
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData})
    return res.status(200).json({success:true,message:"removed from cart"})
  } catch (error) {
    console.log(error);
    return res.status(500).json({success:false,message:"server error"})

  }
}


//get all cart items
const getCart = async(req,res)=>{
  try {
   const userData = await userModel.findOne({_id:req.body.userId})
   const cartData = userData.cartData;
   return res.status(200).json({success:true,message:"cart data",data:cartData})
  } catch (error) {
    console.log(error);
    return res.status(500).json({success:false,message:"server error"})
    
  }
}

export {addToCart, removeFromCart, getCart};