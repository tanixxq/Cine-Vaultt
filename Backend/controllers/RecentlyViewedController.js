import RecentlyViewed from "../models/RecentlyViewed.js";

export const addRecentlyViewed=async(req,res)=>{
  try{
    const {omdbID,title,poster,year,genre,rating}=req.body;
    const userID=req.user.id;

    const existingEntry=await RecentlyViewed.findOne({userID,omdbID});

    if(existingEntry){
      existingEntry.viewedAt=new Date();
      await existingEntry.save();

      return res.json({message:"Recently viewed updated"});
    }

    await RecentlyViewed.create({
      userID,
      omdbID,
      title,
      poster,
      year,
      genre,
      rating
    });

    const allMovies=await RecentlyViewed.find({userID})
      .sort({viewedAt:-1});

    if(allMovies.length>10){
      await RecentlyViewed.deleteMany({
        _id:{
          $in:allMovies.slice(10).map(movie=>movie._id)
        }
      });
    }

    res.status(201).json({
      message:"Recently viewed added"
    });

  }catch(error){
    res.status(500).json({
      error:error.message
    });
  }
};


export const getRecentlyViewed=async(req,res)=>{
  try{
    const recentlyViewed=await RecentlyViewed.find({
      userID:req.user.id
    })
    .sort({viewedAt:-1})
    .limit(10);

    res.json(recentlyViewed);

  }catch(error){
    res.status(500).json({
      error:error.message
    });
  }
};