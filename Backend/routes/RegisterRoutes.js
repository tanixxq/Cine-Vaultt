import express from "express";
import { register, getUser } from "../controllers/authController.js";


const router = express.Router();

router.post("/", register);
router.get("/",getUser)


export default router;