import mongoose from 'mongoose';

export default () => {
    const uri = `mongodb+srv://${process.env.MONGO_DB_ID}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER}.cjznt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    mongoose.connect(uri)
    .then(() => {
        console.log('Connecté à MongoDB Atlas avec succès!');
    })
    .catch(err => {
        console.error('Erreur de connexion à MongoDB:', err);
    });

}