import express from 'express';
import mongoose from 'mongoose';
import { RouterBlog } from './router/blog.router.js';

// Créer une application Express
const app = express();
const port = 3000;

// URI de connexion correct
const uri = "mongodb+srv://amriounissa:FdRE8ZoKhAH4UoV6@cluster0.cjznt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connexion à MongoDB Atlas
mongoose.connect(uri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connecté à MongoDB Atlas avec succès!');
})
.catch((err) => {
    console.error('Erreur de connexion à MongoDB:', err);
});

// Route de la page d'accueil
app.get('/', (req, res) => {
    res.send('Bienvenue sur la première page de mon application Node.js!');
  });
  //api
  app.use(express.json());
  app.use('/api/blog/', RouterBlog.getBlog);

  app.use((req, res, next) => {
    res.status(404).send('Page non trouvée');
  });

// Démarrer le serveur
app.listen(port, () => {
  console.log(`L'application écoute sur http://localhost:${port}`);
});
