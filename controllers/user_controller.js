import { User } from "../models/user_model.js";
import { userSchema } from "../schema/user_schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"



// Login controller
export const signup = async (req, res, next) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
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

    return res.status(201).json({ 'message': "Registration successful" });
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
            otherNames: user.otherNames,
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
    await req.session.destroy()
    // if (error) {
    //     return res.status(500).json("Failed to logout");
    // }

    // Clear the session cookie
    res.status(200).json("You successfully Logged out");

  } catch (error) {
    next(error);
  }
};




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

      .populate({ path: "applicationStatus"})

      .populate({path:"contact"})

      .populate({path: "curriculum"})

      .populate({ path: "facebookLink", options})

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
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    if (value.password) {
      value.password = bcrypt.hash(value.password, 12);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, value, { new: true })
    .populate({ path: "applicationStatus"})

    .populate({path:"contact"})

    .populate({path: "curriculum"})

    .populate({ path: "facebookLink", options})

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
