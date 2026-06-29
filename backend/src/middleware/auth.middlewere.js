import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const isAuthenticate = async (req, res, next) => {
    try {

        const token = req.cookies.token;
        // console.log("Token:", token);


        if (!token) {
            return res.status(401).json({
                success: false,
                message: "login first"
            })
        }

        //verify token
        const decode = jwt.verify(token, process.env.JWT_SECRET)
       // console.log("decode",decode);

        //find user 
        const user = await User.findById(decode.id).select("-password")

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user is not foundd"
            })
        }
        //store user in request
        req.user = user

        // console.log("cookie",req.cookies);
        // console.log(req.cookies.token);
        next()
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: "invalid user or expire token"

        })
    }


}
