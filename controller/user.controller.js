import User from './../model/user.model.js'
// function authenticate 
export const loginCtrl = async (req,res)=> {
    // console.log(req.body);
    // return;
    const email = req.body.email;
    const password = req.body.password;
    // bcrypt authentification 
    try {
        const user = await User.findOne({email:email }).exec();
        console.log(user)
        if(user === null) {
            res.status(404).json({message: 'Cet utilisateur existe pas'})
        }
        
        return
        console.error("1",user)
        bcrypt.compare(password, user.password, function(err, result) {
           console.error("2", err, result)
            if(err || result == false){
                res.status(401).json({erreur:"Mot de passe ou utilisateur incorect"})
                return
            }
            console.log("result", result);
            const accessToken = jsonwebtoken.sign({ userId: user._id }, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", { expiresIn: '1d' });
            const refreshToken = jsonwebtoken.sign({ userId: user._id }, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", { expiresIn: '7d' });
            res.status(200).json({user,accessToken, refreshToken})
        })
        setCurrentUser(user)
    } catch(err)  {
        console.log("erreur",err);
        res.status(401).json({erreur:"cet utilisateur n'existe pas"})
    }
}