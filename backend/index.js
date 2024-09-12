import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import { configDotenv } from 'dotenv';
import fishRouter from './router/fishRoute.js';
import userRouter from './router/userRoute.js';
import cartRouter from './router/cartRoute.js';
import orderRouter from './router/orderRoute.js';
configDotenv();




const app = express();
const port = 4000;


//middleware
app.use(express.json());
app.use(cors());

//db connection
connectDB();


//  APIs
app.get('/', (req, res) => {
    res.send("Hello Boss")
})
app.use('/api',fishRouter)
app.use('/images',express.static('uploads'))
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter)



//listening
app.listen(port,()=>{
    console.log(`listening on localhost:${port}`)
})