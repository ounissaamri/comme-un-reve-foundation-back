import express from "express";
import { loginCtrl} from "./../controller/user.controller.js";
import { createUserCtrl} from "./../controller/user.controller.js";

// Methode from express
const router = express.Router();

// API for user
const createUser = router.post('/',createUserCtrl);
const loginUser = router.post('/login', loginCtrl);
// const getUser = router.get('/getUsr', getUsr);

// Export 
export const RouterUser = {
    createUser,
    loginUser,
    // getUser
}

