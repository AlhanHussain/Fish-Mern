import React, {  useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {

const [image, setImage] = useState(false)
const [data, setData] = useState({
  name:"",
  description:"",
  price:"",
  category:"Salad"

})

const onChangeHandler = (event) => {
  const name = event.target.name;
  const value = event.target.value;
  setData(data=>({...data, [name]:value}))
}



const onSubmitHandler=async(event)=>{
     event.preventDefault();
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("category", data.category);
  formData.append("price", Number(data.price));
  formData.append("image", image);
  const response = await axios.post(`${url}/api/add`,formData)
  if( response.data.success){
    setData({
      name:"",
      description:"",
      price:"",
      category:"Salad"
    
    })
    setImage(false)  
    toast.success(response.data.message)
  }else{
     toast.error(response.data.message)
    }
}

  return (
<div className="add">
    <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
            <p>Product name</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
            <p>Product description</p>
            <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6"  placeholder='write content here'></textarea>
        </div>
        <div className="add-category-price">
            <div className="add-category flex-col">
                <p>Product Category</p>
                <select onChange={onChangeHandler}  name="category" >
                <option value="Salmon">Salmon</option>
<option value="Tuna">Tuna</option>
<option value="Sardine">Sardine</option>
<option value="Mackerel">Mackerel</option>
<option value="Tilapia">Tilapia</option>
<option value="Catfish">Catfish</option>
<option value="Pomfret">Pomfret</option>
<option value="Kingfish">Kingfish</option>
<option value="Cod">Cod</option>
<option value="Halibut">Halibut</option>
<option value="Snapper">Snapper</option>
<option value="Barracuda">Barracuda</option>
<option value="Rohu">Rohu</option>
<option value="Hilsa">Hilsa</option>
<option value="Carp">Carp</option>
<option value="Sole">Sole</option>
<option value="Bass">Bass</option>
<option value="Pollock">Pollock</option>
<option value="Trout">Trout</option>
<option value="Swordfish">Swordfish</option>
<option value="Perch">Perch</option>
<option value="Anchovy">Anchovy</option>
<option value="Haddock">Haddock</option>
<option value="Whiting">Whiting</option>
<option value="Yellowtail">Yellowtail</option>
<option value="Herring">Herring</option>
<option value="Grouper">Grouper</option>
<option value="Flounder">Flounder</option>
<option value="Bluefish">Bluefish</option>
<option value="Marlin">Marlin</option>
<option value="Grey Mullet">Grey Mullet</option>
<option value="Dorado">Dorado</option>
<option value="Barramundi">Barramundi</option>

                </select>
            </div>
            <div className="add-price flex-col">
                <p>Product price</p>
                <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='$20'/>
            </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
    </form>
    </div> 
  )
}

export default Add