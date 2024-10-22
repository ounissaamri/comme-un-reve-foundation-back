import express from "express";
import {getBlogctrl} from "../controller/blog.controller.js";



const router = express.Router();
const getBlog = router.get('/blog', getBlogctrl);





export const RouterBlog = {
    
    getBlog,
   
}