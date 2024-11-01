const express = require("express");
const dotenv = require("dotenv");
const { mongoose } = require("mongoose");
const userRouter = require('./Routes/userRoute');
const cors = require('cors');
// remove cors before push

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const connectDb = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("Server is connected to DB");
    }
    catch(err){
        console.log("Server is unable to connect to DB,", err.message);
    }
}
connectDb();

app.get("/", (req, res) => {
    res.send("API is working...");
});
app.use('/user', userRouter);


const PORT = process.env.PORT;
app.listen(PORT, console.log("Server is running..."));