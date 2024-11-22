import express from "express";
import {getBlogsctrl, getBlogCtrl,createBlogCtrl,deleteBlogCtrl,updateBlogCtrl} from "../controller/blog.controller.js";



const router = express.Router();

// CRUD des blogs
router.post('/blog',createBlogCtrl)
router.get('/blogs', getBlogsctrl);
router.get('/blog/:id', getBlogCtrl);
router.delete('/blog/:id',deleteBlogCtrl)
router.put('/blog/:id',updateBlogCtrl)


export default router;