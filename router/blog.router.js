import express from "express";
import {getBlogctrl,createBlogCtrl,deleteBlogCtrl,updateBlogCtrl} from "../controller/blog.controller.js";



const router = express.Router();

const createBlog=router.post('/blog',createBlogCtrl)
const getBlog = router.get('/blog', getBlogctrl);
const deleteBlog = router.delete('/blog/:id',deleteBlogCtrl)
const putBlog = router.put('/blog/:id',updateBlogCtrl)






export const RouterBlog = {
    
    getBlog,
    createBlog,
    deleteBlog,
    putBlog
   
}