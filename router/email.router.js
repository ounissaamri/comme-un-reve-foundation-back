import express from "express";
import { sendEmailBenevoleCtrl , sendEmailPartenaireCtrl} from './../controller/email.controller.js'


const router = express.Router();

router.post('/send-benevole',sendEmailBenevoleCtrl)
router.post('/send-partenaire',sendEmailPartenaireCtrl)




export default router;