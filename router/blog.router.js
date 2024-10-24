import express from "express";
import {getBlogctrl,createBlogCtrl} from "../controller/blog.controller.js";



const router = express.Router();

const createBlog=router.post('/blog',createBlogCtrl)
const getBlog = router.get('/blog', getBlogctrl);






export const RouterBlog = {
    
    getBlog,
    createBlog
   
}