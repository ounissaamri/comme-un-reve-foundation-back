import express from "express";
import { loginCtrl} from "./../controller/user.controller.js";

// Methode from express
const router = express.Router();

// API for user
// const createUsr = router.post('/',createUserCtrl);
const loginCtrlUser = router.post('/login', loginCtrl);
// const getUser = router.get('/getUsr', getUsr);

// Export 
export const RouterUser = {
    // createUsr,
    loginCtrl,
    // getUser
}

