import User from './../model/user.model.js'
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/token.js';

export const loginCtrl = async (req,res)=> {
    console.log('okkokok')
    const email = req.body.email;
    const password = req.body.password;
    // bcrypt authentification 
    try {
        const user = await User.findOne({email:email }).exec();
        console.log(user)
        if(user === null) {
            res.status(404).json({message: 'Cet utilisateur existe pas'})
        }
        bcrypt.compare(password, user.password, function(err, result) {
            if(err || result == false){
                res.status(401).json({erreur:"Mot de passe ou utilisateur incorect"});
                return;
            }
        
            res.status(200).json({
                user,
                token: generateToken({ userId: user._id }, process.env.EXPIRE_IN_JWT ),
                refreshToken: generateToken({ userId: user._id }, process.env.EXPIRE_IN_JWT )
            });
        })
    } 
    catch(err)  {
        console.log("erreur",err);
        res.status(401).json({erreur:"cet utilisateur n'existe pas"})
    }
};

export const createUserCtrl = async (req,res)=>{
    const user = new User(req.body)
    // hash of the password 
    try {
       let passwordHash = await bcrypt.hash(user.password, 10)
       console.log(passwordHash);
       user.password = passwordHash;  //stock  le mdp hasher dans le mdp
    try{
        const response = await user.save()
        res.status(201).json({response,message: 'Utilisateur crée'})
    }catch(err){
        res.status(500).json({erreur:"création impossible"})
    }
    } catch (error) {
        console.log("erreur d'iddentification", error.message);
    } 
}