import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
    path: "../.env"
});
mongoose.connect(
    process.env.MONGO
).then(() => {
    console.log("Db is connected")
}).catch((err) => console.log(err))

const app = express();
const port = 3000

app.listen(port, (req, res) => {
    console.log(`Server listening on port ${port}`)
})