import { ResetToken, UnofficialUser, User } from "../models/user_model.js";
import { forgotPasswordValidator, resetPasswordValidator, updateUserValidator, userSchema} from "../schema/user_schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { mailTransport } from "../config/mail.js";



// signup controller
export const signup = async (req, res, next) => {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return res.status(422).send(error.details[0].message);
    }
    const email = value.email;
  
    const findIfUserExist = await User.findOne({ email });
  
    if (findIfUserExist) {
      return res.status(401).send("User has already signed up");
    } else {
      const hashedPassword = await bcrypt.hash(value.password, 12);
      value.password = hashedPassword;
  
      const addUser = await User.create(value);
  
      req.session.user = { id: addUser.id };
  
      return res.status(201).json({ 'message': "Registration successful", addUser});
    }
  } catch (error) {
    
  }
};




export const login = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    //  Find a user using their email or username
    const user = await User.findOne({
      $or: [{ email }, { userName }],
    });

    if (!user) {
      return res.status(401).json("User does not exist");
    } else {
      const correctPass = bcrypt.compare(password, user.password);
      if (!correctPass) {
        return res.status(401).json("Invalid login details");
      }
      // Generate a session for the user
      req.session.user = { id: user.id };

      console.log('user', req.session.user)

      res.status(201).json("Your Login was Successful");
    }
    // Return responds

  } catch (error) {
    next(error);
  }
};




export const token = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    //  Find a user using their email or username
    const user = await User.findOne({
      $or: [{ email: email }, { userName: userName }],
    });

    if (!user) {
      return res.status(401).json("User does not exist");
    } else {
      const correctPass = bcrypt.compare(password, user.password);

      if (!correctPass) {
        return res.status(401).json("Invalid login details");
      }

      // Generate a token for the user
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: "72h" }
      );

      //   Return response
      res.status(200).json(
        {
          message: 'User logged in', accessToken: token,

          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email,

          }
        });


    }

  } catch (error) {
    next(error);
  }
};





// logout controller
export const logout = async (req, res, next) => {
  try {
    //destroy user session
    await req.session.destroy()
  
    //return response
    res.status(200).json("You successfully Logged out");

  } catch (error) {
    next(error);
  }
};




//Forgot Password
export const forgotPassword = async (req, res, next) => {
  try {
    //validate user request
    const { value, error } = forgotPasswordValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error);
    }
    //find a user with the provided email
    const user = await User.findOne({ email: value.email });
    if (!user) {
      return res.status(404).json('User not found');
    }
    //generate rest token
   const resetToken= await ResetToken.create({userId: user.id})

    //send reset email
    await mailTransport.sendMail({
      to: value.email,
      subject: 'Reset your password',
      // text:`Please follow the link below to reset your password.\n{process.env.FRONTEND_URL}/reset-password/${user.id}` //the page will be prepared by frontend
      html: `<h1>Hello ${user.name}<h1>
      <h1>Please follow the link below to reset your password.<h1>
        <a href = "{process.env.FRONTEND_URL}/reset-password/${resetToken.id}">CLICK HERE</a>`
    })

    //return response
    return res.status(200).json('Password Reset Mail Sent');
    // console.log(resetToken)
  } catch (error) {
next(error);
  }
}




export const verifyResetToken = async (req, res, next)=>{
  try {
    // Find Reset Token by id
    const resetToken = await ResetToken.findById(req.params.id);
    if (!resetToken) {
        return res.status(404).json('Reset Token Not Found');
    }
    // Check if token is valid
    if (resetToken.expired || (Date.now() >= new Date(resetToken.expiresAt).valueOf())) {
        return res.status(409).json('Invalid Reset Token');
    }
    // Return response
    res.status(200).json('Reset Token is Valid!');
} catch (error) {
    next(error);
}
};






export const resetPassword = async (req, res, next) => {
  try {
      // Validate request
      const { value, error } = resetPasswordValidator.validate(req.body);
      if (error) {
          return res.status(422).json(error);
      }
      // Find Reset Token by id
      const resetToken = await ResetToken.findById(value.resetToken);
      if (!resetToken) {
          return res.status(404).json('Reset Token Not Found');
      }
      // Check if token is valid
      if (resetToken.expired || (Date.now() >= new Date(resetToken.expiresAt).valueOf())) {
          return res.status(409).json('Invalid Reset Token');
      }
      // Encrypt user password
      const hashedPassword = bcrypt.hashSync(value.password, 10);

      // Update user password
      await UserModel.findByIdAndUpdate(resetToken.userId, { password: hashedPassword });

      // Expire reset token
      await ResetToken.findByIdAndUpdate(value.resetToken, { expired: true });

      // Return response
      res.status(200).json('Password Reset Successful!');
  } catch (error) {
      next(error);
  }
}


export const getUser = async (req, res, next) => {
  try {
    const userName = req.params.userName.toLowerCase();

    // assign a variable to sort the start date
    const options = { sort: { startDate: -1 } };

    // Get user based on the user ID
    // Exclude the password and populate the education field
    const userDetails = await User
      .findOne({ userName })

      .select("-password")

      .populate({ path: "applicationStatus" })

      .populate({ path: "contact" })

      .populate({ path: "curriculum" })

      .populate({ path: "facebookLink", options })

      .populate({ path: "instagramLink", options })

      .populate({ path: "location", options })

      .populate({ path: 'school', options })

      .populate({ path: 'vacancy', options })

      .populate({ path: 'video', options })

      .populate({ path: 'websiteLink', options })

      .populate({ path: 'whatsAppLink', options });

    if (!userDetails) {
      return res.status(404).json(userDetails);
    }

    return res.status(200).json({ userDetails });
  } catch (error) {
    next(error);
  }
};




export const getUsers = async (req, res, next) => {
  try {

    const email = req.query.email?.toLowerCase()
    const userName = req.query.userName?.toLowerCase();

    const filter = {};
    if (email) {
      filter.email = email;
    }
    if (userName) {
      filter.userName = userName;
    }

    const users = await User.find(filter);

    // if (users.length === 0) {
    //     return res.status(404).send('No users found');
    // }

    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};




export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { error, value } = updateUserValidator.validate(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    if (value.password) {
      value.password = bcrypt.hash(value.password, 12);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, value, { new: true })
      .populate({ path: "applicationStatus" })

      .populate({ path: "contact" })

      .populate({ path: "curriculum" })

      .populate({ path: "facebookLink", options })

      .populate({ path: "instagramLink", options })

      .populate({ path: "location", options })

      .populate({ path: 'school', options })

      .populate({ path: 'vacancy', options })

      .populate({ path: 'video', options })

      .populate({ path: 'websiteLink', options })

      .populate({ path: 'whatsAppLink', options });


    if (!updatedUser) {
      return res.status(404).json('User not found');
    }

    return res.status(200).json('User updated successfully');
  } catch (error) {
    next(error);
  }
};




export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId)

    if (!deletedUser) {
      return res.status(404).json('User not found');
    }

    return res.status(200).json('User deleted successfully');
  } catch (error) {
    next(error);
  }
};






export const getUnregisteredUser = async(req, res, next)=>{
 try {
  const {nameOfSchool} = req.query;
  // Get all events from database
  // const schoolinfo = await UnofficialUser 
  // .find(filter ? JSON.parse(filter) : nameOfSchool)
  // .limit(limit ? parseInt(limit) : undefined)
  // .skip(skip ? parseInt(skip) : undefined);
 
   return res.status(404).json({nameOfSchool})
  
 } catch (error) {
  next(error)
 }
};
