import blog from "../model/blog.model.js";

// Sert à récuperer tout les blog
export const getBlogctrl = async (req, res) => {
    const allblog = await blog.find({});
    res.status(200).json(allblog)
}

export const createBlogCtrl = async (req,res)=>{
    const u = new blog(req.body)
    try{
        const response = await u.save()
        res.status(201).json({response,message: ' blog  crée'})
    }catch(err){
        res.status(500).json({erreur:"création impossible"})
    }
    
}