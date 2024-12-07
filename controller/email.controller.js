import transporter from './../config/nodemailer.config.js'


export const sendEmailBenevoleCtrl = (req, res) => {
    const { name, lastName,message, info  } = req.body;
    const templateEmail = `<h1>Bonjour Godlive,
    <h3>${name} ${lastName}, souhaite devenir bénévole ! </h3>
    <p>${message ? '<strong> Voici son message </strong>:  <br>' + message : null}</p>
    <h3>Ses informations complémentaires :</h3>
      <p><strong>Téléphone:</strong> <span>${info.phone ?? 'N/A'}</span></p>
      <p><strong>Email:</strong> <span>${info.email ?? 'N/A'}</span></p>
      <h3> N'hésitez pas à contacter ${name} pour avancer sur son projet de bénévolat ! </h3>
    `;
    
    const mailOptions = {
        from: "Comme un Rêve",
        to: process.env.EMAIL_USER ,
        subject: "Devenir Bénévole",
        html: templateEmail
    };   

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur lors de l\'envoi de l\'email');
        } else {
            console.log('Email envoyé : ' + info.response);
            res.status(200).send('Email envoyé avec succès');
        }
    });
  };

  
  export const sendEmailPartenaireCtrl = (req, res) => {
    const { emailto, name, lastName,message, info  } = req.body;
    const templateEmail = `<h1>Bonjour Godlive,
    <h3>${name} ${lastName}, souhaite devenir partenaire ! </h3>
    <p>${message ? '<strong> Voici son message </strong>:  <br>' + message : null}</p>
    <h3>Ses informations complémentaires :</h3>
      <p><strong>Téléphone:</strong> <span>${info.phone ?? 'N/A'}</span></p>
      <p><strong>Email:</strong> <span>${info.email ?? 'N/A'}</span></p>
      <p><strong>Type de partenariat souhaité:</strong> <span>${info.typePartenariat ?? 'N/A'}</span></p>
      <p><strong>Adresse:</strong> <span>${info.address ?? 'N/A'}</span></p>
      <p><strong>Code Postal:</strong> <span>${info.postalCode ?? 'N/A'}</span></p>
      <p><strong>Ville:</strong> <span>${info.city ?? 'N/A'}</span></p>
      <p><strong>Pays:</strong> <span>${info.country ?? 'N/A'}</span></p>

      ${
        info.company.raisonSociale ? `<h4>Company Information:</h4>
        <p><strong>Forme Juridique:</strong> <span>${info.company.formeJuridique ?? 'N/A'}</span></p>
        <p><strong>Raison Sociale:</strong> <span>${info.company.raisonSociale ?? 'N/A'}</span></p>` : ''   
      }
      <h3> N'hésitez pas à contacter ${name} pour avancer sur ce partenariat ensemble ! </h3>
    `;
    
    const mailOptions = {
        from: "Comme un Rêve",
        to: process.env.EMAIL_USER,
        subject: "Demande de partenariat",
        html: templateEmail
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur lors de l\'envoi de l\'email');
        } else {
            console.log('Email envoyé : ' + info.response);
            res.status(200).send('Email envoyé avec succès');
        }
    });
  };
