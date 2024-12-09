import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"



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

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api/auth', authRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message;
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    })

})

app.listen(port, (req, res) => {
    console.log(`Server listening on port ${port}`)
})