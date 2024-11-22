import express from "express";
import { loginCtrl} from "../controller/user.controller.js";
import { createUserCtrl} from "../controller/user.controller.js";

// Methode express router
const router = express.Router();

// API pour authentification
router.post('/create',createUserCtrl);
router.post('/signin', loginCtrl);

export default router

