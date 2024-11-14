import express from 'express';
import mongoose from 'mongoose';
import { RouterBlog } from './router/blog.router.js';
import  File from './model/file.model.js';
import multer from 'multer';
import Stripe from 'stripe';
import cors from 'cors';
import 'dotenv/config';

// import * as dotenv from 'dotenv';
// dotenv.config();

// import { configDotenv } from "dotenv";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
const app = express();
const port = 3000;
app.use(cors());

// URI de connexion correct
const uri = `mongodb+srv://${process.env.MONGO_DB_ID}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER}.cjznt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

console.log('variable', process.env );
// Connexion à MongoDB Atlas
mongoose.connect(uri)
.then(() => {
    console.log('Connecté à MongoDB Atlas avec succès!');
})
.catch(err => {
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

  app.post('/api/create-checkout-session', async (req, res) => {
    try {
      const { lineItems, successUrl, cancelUrl } = req.body;
  
      // Créer une session de paiement avec Stripe
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
      });
  
      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Une erreur est survenue' });
    }
  });

  app.post('/api/create-subscription-session', async (req, res) => {
    const { customerEmail, priceId, successUrl, cancelUrl } = req.body;
  
    try {
      // Crée le client ou récupère le client existant par email
      const customer = await stripe.customers.create({
        email: 'burdy.gou@gmail.com',
      });
  
      // Crée une session de souscription
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer: customer.id,
        line_items: [
          {
            price: 'price_1QKhYfJJBS0YBp97wqPDdL0f', // ID du prix récurrent
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: successUrl,
        cancel_url: cancelUrl,
      });
  
      res.json({ sessionId: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.post('/cancel-subscription', async (req, res) => {
    const { subscriptionId } = req.body;  // Id de l'abonnement à annuler
  
    try {
      // Récupérer l'abonnement Stripe
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  
      // Annuler l'abonnement immédiatement (optionnel)
      const cancelledSubscription = await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: false,  // Si false, l'annulation est immédiate
      });
  
      // Optionnel : Annuler à la fin de la période de facturation
      // const cancelledSubscription = await stripe.subscriptions.update(subscriptionId, {
      //   cancel_at_period_end: true,  // Si true, annulation après la période de facturation
      // });
  
      res.status(200).json({ message: 'Abonnement annulé', cancelledSubscription });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de l\'annulation de l\'abonnement.' });
    }
  });

// Démarrer le serveur
app.listen(port, () => {
  console.log(`L'application écoute sur http://localhost:${port}`);
});
