import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
// cookie parser will take all the cookies and add them to req object
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST","PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

import authRoutes from "./routes/authRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"
import bookMarkRoutes from "./routes/bookmarkRoutes.js"

app.use("/api/v1/user",authRoutes)
app.use("/app/v1/blogs",blogRoutes);
app.use("/app/v1/bookmark",bookMarkRoutes) 

export default app;