import express from 'express';
import RouterBlog  from '../router/blog.router.js';
import Stripe from 'stripe';
import 'dotenv/config';
import RouterAuth  from '../router/auth.router.js';
import RouterFile from '../router/file.router.js';
import RouterEmail from '../router/email.router.js';

import connectDatabase from '../config/database.js';
import { authenticate } from '../middleware/authenticate.js';
import cors from 'cors';

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
const app = express();
app.use(cors());

app.use(express.json());
// connexion à la base de données
connectDatabase();

app.use('/', (req, res) => {
    res.send('Backend Comme un rêve works');
});
// la fonction authenticate permet de verifier si le token a été envoye de la part du front sinon une erreur est envoyé
  app.use('/api/auth/', RouterAuth)
  app.use('/api/blog', RouterBlog);
  app.use('/api/file', RouterFile);
  app.use('/api/email', RouterEmail);






  

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
  
//   if (process.env.NODE_ENV !== 'production') { 

//   app.listen(process.env.SERVER_PORT, () => {
//     console.log(`L'application écoute sur http://localhost:${process.env.SERVER_PORT}`);
//   });
// }
  
export default app;

