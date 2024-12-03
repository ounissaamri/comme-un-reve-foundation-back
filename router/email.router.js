import express from "express";
import { sendEmailCtrl , sendEmailPartenaireCtrl} from './../controller/email.controller.js'


const router = express.Router();

router.post('/send-benevole',sendEmailCtrl)
router.post('/send-partenaire',sendEmailPartenaireCtrl)




export default router;