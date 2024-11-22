import express from "express";
import {downloadCtrl, uploadCtrl} from "../controller/file.controller.js"
import multer from 'multer';

//config multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Methode from express
const router = express.Router();


const downloadFile = router.get('download/:filename',downloadCtrl);
const uploadFile = router.post('upload',upload.single('file'), uploadCtrl);
// const getUser = router.get('/getUsr', getUsr);

// Export 
export default router 