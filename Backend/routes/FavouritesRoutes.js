import { Router } from "express";
import Favourite from "../models/favourites.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.delete("/remove/:id", authMiddleware, async(req,res)=>{
  try{
    const favourite = await Favourite.findOneAndDelete({
      _id:req.params.id,
      userId:req.user.id
    });

    if(!favourite) return res.status(404).json({error:"Favourite not found"});

    res.json({message:"Favourite removed"});
  }catch(error){
    res.status(500).json({error:error.message});
  }
});

router.post("/", authMiddleware, async(req,res)=>{
  try{
    const favourite = await Favourite.create({
      ...req.body,
      userId:req.user.id
    });

    res.status(201).json(favourite);
  }catch(error){
    res.status(400).json({error:error.message});
  }
});

router.get("/", authMiddleware, async(req,res)=>{
  try{
    const favourites = await Favourite.find({userId:req.user.id});
    res.json(favourites);
  }catch(error){
    res.status(500).json({error:error.message});
  }
});

export default router;