import User from "../models/User.js";

export const register = async (req,res)=>{
    const {username, email, password} = req.body;
    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({message: "User already exists"})
    }
    const newUser = new User ({username,email,password});
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



