import transporter from './../config/nodemailer.config.js'


export const sendEmailCtrl = (req, res) => {
    const { emailto, phone, name, lastName,message, subject  } = req.body;
    const templateEmail = `<h2>Bonjour Godlive,</h2>
    <p>Message de ${name} ${lastName}: </p>
    <p>${message}</p>
    <p>Contact :</p>
    <p>${name} ${lastName}</p>
    <p>Numéro du contact :</p>
    <p>${phone}</p>
    `;
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: emailto,
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
    const { emailto, phone, name, lastName,message, subject  } = req.body;
    const templateEmail = `<h2>Bonjour Godlive,</h2>
    <p>Message de ${name} ${lastName}: </p>
    <p>${message}</p>
    <p>Contact :</p>
    <p>${name} ${lastName}</p>
    <p>Numéro du contact :</p>
    <p>${phone}</p>
    `;
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: emailto,
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
  