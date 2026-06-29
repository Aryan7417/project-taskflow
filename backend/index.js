import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connedtDB from "./src/config/db.config.js"
import routes from "./src/routes/auth.routes.js"
import cookieParser from "cookie-parser";
import router from "./src/routes/project.routes.js"
import taskRoutes from "./src/routes/task.routes.js";


dotenv.config();

const app = express();
connedtDB();



app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "https://aryan-taskflow.vercel.app",
    ],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth",routes)
app.use("/api/projects", router);
app.use("/api/tasks", taskRoutes);



app.get("/",(req , res)=>{
    res.send("hay khushi!!")
})




const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}🚀🚀🚀`)
})