import "dotenv/config";

import mongoose from "mongoose";
import app from "./src/app.js";

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Server running");
        });
    })
    .catch(err => console.error(err));