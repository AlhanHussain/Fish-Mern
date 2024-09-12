import express from 'express';
import multer from 'multer';
import { addfish, getFish, removeFish } from '../controller/fishController.js';





const fishRouter  = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

fishRouter.post('/add',upload.single('image'),addfish)
fishRouter.get('/list',getFish)
fishRouter.post('/remove',removeFish)


export default fishRouter;


