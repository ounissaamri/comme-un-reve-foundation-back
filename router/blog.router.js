import express from "express";
import {getBlogsctrl,createBlogCtrl,deleteBlogCtrl,updateBlogCtrl} from "../controller/blog.controller.js";



const router = express.Router();

// CRUD des blogs
const createBlog=router.post('/blog',createBlogCtrl)
const getBlogs = router.get('/blogs', getBlogsctrl);
const deleteBlog = router.delete('/blog/:id',deleteBlogCtrl)
const putBlog = router.put('/blog/:id',updateBlogCtrl)






export const RouterBlog = {
    
    getBlogs,
    createBlog,
    deleteBlog,
    putBlog
   
}