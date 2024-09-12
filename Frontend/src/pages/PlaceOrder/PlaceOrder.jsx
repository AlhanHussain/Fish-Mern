import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

const {getTotalCartAmount,token,food_list,url,cartItems} = useContext(StoreContext)

const [data, setData] = useState({
  firstName:"Alhan",
  lastName:"hussain",
  email:"alhan@gmail.com",
  street:"kasimpara",
  city:"bsp",
  state:"cg",
  zipcode:"489969",
  country:"iindia",
  phone:"9475861289"
})

const onChangeHandler=(event)=>{
  const name = event.target.name;
  const value = event.target.value;
  setData(data=>({...data,[name]:value}))
}




const placeOrder=async(event)=>{
 event.preventDefault();
 let orderItems = [];
 food_list.map((item)=>{
   if(cartItems[item._id]>0){
     let itemInfo = item;
     itemInfo["quantity"] = cartItems[item._id];
     orderItems.push(itemInfo)
}
})
console.log(orderItems)
let orderData = {
  address:data,
  items:orderItems,
  amount:getTotalCartAmount()+2,
}
let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
console.log(response.data)
    if(response.data.success){
        window.location.replace('/myorders');
    }
    else{
        alert(response.data.message)
    }
}

const navigate = useNavigate();
useEffect(()=>{
  if(!token){
   navigate('/cart')
  }else if(getTotalCartAmount()===0){
    navigate('/cart')
  }
},[])


  return (
    <form onSubmit={placeOrder} className='place-order' >
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className='multi-fields'>
         <input  required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
         <input required name="lastName" onChange={onChangeHandler} value={data.lastName}type="text" placeholder='Last name'/>
        </div>

        <input required name='email' onChange={onChangeHandler} value={data.email}type="email"  placeholder='Email address'/>
        <input name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>

        <div className="multi-fields">
        <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
        <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
        </div>

        <div className="multi-fields">
        <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode}type="number" placeholder='Zip code' />
        <input required name="country" onChange={onChangeHandler} value={data.country}type="text" placeholder='Country'/>
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone}type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
        <h2>Cart Totals</h2>
        <div>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount()===0?0:2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalCartAmount()===0?0:2}</b>
          </div>
        </div>
          <button type="submit">PROCEED TO PAYMENT</button>
      </div>

      </div>
      
    </form>
  )
}

export default PlaceOrder
