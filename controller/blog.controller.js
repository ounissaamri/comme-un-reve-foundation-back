import blog from "../model/blog.model.js";

// Sert à récuperer tout les blog
export const getBlogctrl = async (req, res) => {
    const allblog = await blog.find({});
    res.status(200).json(allblog)
}