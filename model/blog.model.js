import mongoose from 'mongoose';
const blog = mongoose.Schema({
    
    titre:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: true
    }
});
export default mongoose.model('blogs',blog)


