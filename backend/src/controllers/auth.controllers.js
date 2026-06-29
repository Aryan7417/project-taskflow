//import { Suspense } from "react";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"


//----------------------------sigup user-----------------------
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10)

        //-----------------------------------------------------------------
        //check all fiels

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All filed are required",
            })

        }
        //-----------------------------------------------------------------
        //Check existing user 

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "User ALready Exist"
            })
        }
        //-----------------------------------------------------------------
        //Create User

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        //console.log(user)
        res.status(200).json({
            success: true,
            message: "User Register Successful"
        })

    }

    //-----------------------------------------------------------------
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}



//
//-------------------------------------------------login user -----------------------------

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //check if all fields  are require
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Emaoil and password is not required'
            })
        }
        // console.log(req.body);

        //find user
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user is not found"
            })
        }


        //compare password
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or passoword"
            })
        }

        //generate JWT token
        const token = jwt.sign(
            {
                id:user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"7d"
            }
        )

        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge:7 * 24 * 60 * 60 * 1000,
        })

        res.status(200).json({
            success:true,
            message:"LOGIN SUCCESSFUL",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        })
        


    }


    catch (error){
        res.status(500).json({
            success:false,
            message:error.message
        })

    }
}


// ---------------------------------------------logout-------------------------------------------------

export const logoutUser = async (req , res)=>{
    try{
        res.cookie("token","",{
            httpOnly:true,
            expires:new Date(0)
        })
        return res.status(200).json({
            success:true,
            message:"Logout Successful"
        })

    }

    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message 
        })
    }
}

export const getCurrentUser = async (req, res) => {
    try {

        return res.status(200).json({
            success: true,
            user: req.user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};








