import mongoose from 'mongoose';

// Model of my document for my MangoDB BDD
 const User = mongoose.Schema({
    
    email :{
        type: String,
        required: true 
    },
    password:{
        type: String,
        required: true 
    }
});

export default mongoose.model('users',User)
//schema mongoose qui fait la relation entre le back et la bdd (orm)