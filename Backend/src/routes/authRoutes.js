//@ts-nocheck

import express from "express";
import User from "../models/UserModel.js";
import {createSecretToken} from '../utils/SecretToken.js'
import bcrypt from "bcrypt";

const router = express.Router()

//signup

router.post("/signup", async (req, res, next) => {
    try {
      const { email, username, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.json({ message: "user already exists" });
      }
    //   console.log(req.body)
      const user = await User.create({ email, username, password});
      const token = createSecretToken(user._id);
      res.cookie("token", token, {
        httpOnly: true,
        withCredentials: true,
      });
      console.log(User)
      res
        .status(201)
        .json({ message: "User signed in successfully", success: true, user });
      next();
    } catch (error) {
      res.status(500).json({ message: "Unable to sign up", error: error.message})
    }
  });
  
//login

router.post("/login", async (req, res, next) => {
    try {
        const {email,password} = req.body;
        if (!email||!password) {
            return res.json({message:'All fields are required'});
        }
        const user = await User.findOne({email});
        if (!user) {
            return res.json({message:'User not found',
              success:false,
            });
        }
        const auth = await bcrypt.compare(password,user.password);
        if (!auth) {
            return res.json({message:"Incorrect password or email",
              success:false,
            })
        }
        const token = createSecretToken(user._id)
        // console.log(jwttoken)
        // res.cookie("token",token)
        // res.send(token)
        res.status(201).json({message:"User logged in succesfully",success:true,
          token:token
          
        })
        next();
    } catch (error) {
        console.error(error)
    }
})


  export default router;