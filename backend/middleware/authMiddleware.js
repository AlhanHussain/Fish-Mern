import jwt from 'jsonwebtoken';




const authMiddleware = async(req,res,next)=>{
    const {token} = req.headers;
    try {
      if(!token){
        return res.status(401).json({success:false,message:"No token found"})
      }  
      const decode_token = jwt.verify(token,process.env.JWT_SECRET);
      // console.log(decode_token);
      req.body.userId = decode_token.id;
      next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({status:false,message:"Invalid token"})
    }
}

export default authMiddleware;