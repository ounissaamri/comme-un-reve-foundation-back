import express from "express";
import {getBlogsctrl, getBlogCtrl,createBlogCtrl,deleteBlogCtrl,updateBlogCtrl} from "../controller/blog.controller.js";



const router = express.Router();

// CRUD des blogs
const createBlog=router.post('/blog',createBlogCtrl)
const getBlogs = router.get('/blogs', getBlogsctrl);
const getBlog = router.get('/blog/:id', getBlogCtrl);
const deleteBlog = router.delete('/blog/:id',deleteBlogCtrl)
const putBlog = router.put('/blog/:id',updateBlogCtrl)






export const RouterBlog = {
    
    getBlogs,
    getBlog,
    createBlog,
    deleteBlog,
    putBlog
   
}