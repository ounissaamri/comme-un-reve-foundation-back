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
export const deleteBlogCtrl = async (req, res) => {
    try {
        const id = req.params.id

        const Blog = await blog.findByIdAndRemove(id)
        res.status(200).json({ succes: "la déstination avec l'id ->" + blog.id + " a bien été supprimé!!!" })
    } catch (error) {
        res.status(500).send(error);
    }
}

export const updateBlogCtrl = async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const Blog = new blog(req.body.blog);

        const responseBlog = await blog.findByIdAndUpdate(blog._id, blog);

        const response = await Blog.findByIdAndUpdate(id, body);

        console.log(body)
        res.status(200).json({ response: 'Mise a jour effectué!' })
    } catch (error) {
        res.status(500).send({ error: "Erreur lors de l'update de la destination", error })
    }
}
