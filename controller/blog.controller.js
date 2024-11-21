import blog from "../model/blog.model.js";

// Sert à récuperer tout les blog
export const getBlogsctrl = async (req, res) => {
    const blogs = await blog.find({}); 
    res.status(200).json(blogs)
}

// Sert à récuperer tout les blog
export const getBlogCtrl = async (req, res) => {

    const id = req.params.id;
    const oneBlog = await blog.findById(id); 
    res.status(200).json(oneBlog)
}

export const createBlogCtrl = async (req,res)=>{
    const newBlog = new blog(req.body)
    try{
        //sauvegarder dans BDD
        const response = await newBlog.save()

         //reponse au front
        res.status(201).json({response,message: ' blog  crée'})
    }catch(err){
        res.status(500).json({erreur:"création impossible"})
    }
    
}
export const deleteBlogCtrl = async (req, res) => {
    try {
        const id = req.params.id;
        const Blog = await blog.findOneAndDelete({_id:id})

        res.status(200).json({ succes: "le blog  avec l'id ->" + " a bien été supprimé!!!" })
    } catch (error) {
        res.status(500).send(error);
    }
}

export const updateBlogCtrl = async (req, res) => {
    try { 
        const body = req.body;
        const id = req.params.id;
        const Blog = new blog(req.body);
        console.log(Blog)

        const responseBlog = await blog.findByIdAndUpdate(id, body);


        res.status(200).json({ response: 'Mise a jour effectué!' })
    } catch (error) {
        res.status(500).send({ error: "Erreur lors de l'update de la destination", error })
    }
}
