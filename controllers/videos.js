import { videos } from "../schema/videos.js";
import { Videos } from "../models/videos.js";
import { User } from "../models/user_model.js";



export const postVideo = async (req, res) => {
  try {
    const { error, value } = videos.validate({
      ...req.body,
      videos: req.file.filename,
    });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userId = req.session?.user?.id || req?.user.id;
   

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const addVideo = await Videos.create({ ...value, user: userId });

    // user.Videos = addVideo._id;

    await user.save();

    res.status(201).json(addVideo);
  } catch (error) {
    console.log(error);
  }
};



  // controller to get user video
export const getUserVideo = async (req, res, next) => {
    try {
      const allVideos= await Videos.find();
      res.status(200).json(allVideos);
    } catch (error) {
      next(error)
    }
  };



// //Get one video
//     export const getOneVideo = async (req, res) => {
//     try {
//       const getAVideo = await Videos.findById(req.params.id);
//       if (!getAVideo) {
//         return res.status(404).send('Video not found');
//       }
//       res.status(200).json({getAVideo})
//       console.error('Error fetching video:', error);
//       res.status(500).send(error.message);
//     }, cat{
        
//     }
//   };




  export const patchVideo = async (req, res, next) => {
    try {
      const { error, value } = videos.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const updatedVideo = await Videos.findByIdAndUpdate(
        req.params.userId,
        value,
        { new: true }
      );
  
      if (!updatedPicture) {
        return res.status(404).send('Video not found');
      }
  
      res.status(200).json({ message:"Video has been updated.", updatedVideo});
    } catch (error) {
      next(error)
    }
  };


  // Delete a video
export const deleteVideo = async (req, res, next) => {
    try {
      const deleteAVideo= await Pictures.findByIdAndDelete(req.params.userProfileId);
  
      if (!deleteAVideo) {
        return res.status(404).send('Picture not found');
      }
  
      // Remove video reference from user
      const user = await User.findById(deleteAVideo.user);
      if (user) {
        user.Videos = null;
        await user.save();
      }
  
      res.status(200).json(deleteAVideo);
    } catch (error) {
      next(error)    
    }
  };
  
  
