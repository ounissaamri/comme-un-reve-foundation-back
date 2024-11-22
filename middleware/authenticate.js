import { verifyToken } from "../utils/token.js";

export const authenticate = (req,res,next)=>{
    const token = req.headers.authorization.split(' ')[1]; 
    if(!token) return res.status(401).json({message :'token non fourni'});
    try{
        const decoded = verifyToken(token); 
        next();
    }catch(err){
        return res.status(401).json({message :'token non valide'});
    }
}