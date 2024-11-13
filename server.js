import express from 'express';
import mongoose from 'mongoose';
import { RouterBlog } from './router/blog.router.js';
import  File from './model/file.model.js';
import multer from 'multer';

// Créer une application Express
const app = express();
const port = 3000;

// URI de connexion correct
const uri = "mongodb+srv://amriounissa:FdRE8ZoKhAH4UoV6@cluster0.cjznt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connexion à MongoDB Atlas
mongoose.connect(uri)
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
  //config multer
const storage = multer.memoryStorage();
const upload = multer({ storage });
  //api
  app.use(express.json());
  app.use('/api/blog/', RouterBlog.createBlog);
  


  app.get('/api/blog/download/:filename', async (req,res) => {
    try {
      const file = await File.findOne({ filename: req.params.filename });
  
      if (!file) {
        return res.status(404).json({ message: 'File not found' });
      }
      res.set('Content-Type', file.contentType);
      res.send(file.data);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving file', error });
    }
  });
  app.post('/api/blog/upload', upload.single('file'), async (req,res,) => {
    const { originalname, mimetype, buffer } = req.file;
    console.log(req.file.originalname)
  
    const newFile = new File({
      filename: originalname,
      contentType: mimetype,
      data: buffer,
    });
  
    try {
      await newFile.save();
      res.status(201).json({ message: 'File uploaded successfully', file: req.file.originalname });
    } catch (error) {
      res.status(500).json({ message: 'Error uploading file', error });
    }
    return;
  });



// Démarrer le serveur
app.listen(port, () => {
  console.log(`L'application écoute sur http://localhost:${port}`);
});
