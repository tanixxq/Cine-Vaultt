import User from "../models/User.js";
import bcrypt from "bcrypt";

export const register = async (req,res)=>{
    const {username, email, password} = req.body;
    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({message: "User already exists"})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User ({username,email,password:hashedPassword});
    await newUser.save();

    
    res.status(201).json({message:"User created successfully"})


}


export const getUser = async(req,res)=>{
    try{
        const user = await User.find();
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message:"error".messgae})

    }
};





