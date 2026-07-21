import express from "express";
import { register, getUser, login } from "../controllers/authController.js";


const router = express.Router();

router.post("/", register);
router.get("/",getUser);
router.post("/login",login);



export default router;