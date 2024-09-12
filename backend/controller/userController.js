import userModel from '../model/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'


//creating token
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'1d'})
}


//user register 
const userRegister = async(req,res)=>{
    const {name,email,password} = req.body;
    try {
       const exist = await userModel.findOne({email}) 
       if(exist){
        return res.status(400).json({message:"email already exist"})
       }
       if(!validator.isEmail(email)){
        return res.status(400).json({message:"invalid email"})
       }
      if(password.length < 8){
        return res.status(400).json({message:"password must be 8 character"})
      }
    //hashing password
    const salt =await  bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password,salt)
    const user = new userModel({
        name:name,
        email:email,
        password:hashpassword
    })
    const newuser = await user.save();
    //create token
    const token = createToken(newuser._id)
    return res.status(200).json({success:true,message:"user register successfully",newuser,token})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"something went wrong"})
    }
}




//user login
const userLogin = async(req,res)=>{
    const {email,password}= req.body;
    try {
       const user = await userModel.findOne({email})
       if(!user){
        return res.status(400).json({message:"user not found"})
       }
       const isMatch = await bcrypt.compare(password,user.password)
       if(!isMatch){
        return res.status(400).json({message:"invalid email or password"})
       }
       //create token
       const token = createToken(user._id)
       return res.status(200).json({success:true,message:"user login successfully",token})
    } catch (error) {
     console.log(error)
     return res.status(500).json({message:"something went wrong"})
    }
}




export {userRegister, userLogin};