import express from 'express'
import {registerUser,loginUser,logoutUser,getCurrentUser} from '../controllers/auth.controllers.js'
import {isAuthenticate} from '../middleware/auth.middlewere.js'


const routes = express.Router();

routes.post("/signup",registerUser)
routes.post("/login",loginUser)
routes.post("/logout",logoutUser)
// routes.get("/me",isAuthenticate,(res,req)=>{
//     res.statusCode(200).json({
//         success:true,
//         user:req.user
//     })
// })
routes.get("/me", isAuthenticate, getCurrentUser);





export default routes
