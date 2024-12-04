// Démarrer le serveur
import app from '../app.js';

app.listen(process.env.SERVER_PORT, () => {
    console.log(`L'application écoute sur http://localhost:${process.env.SERVER_PORT}`);
  });
  