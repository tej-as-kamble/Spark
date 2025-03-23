const express = require("express");
const dotenv = require("dotenv");
const { mongoose } = require("mongoose");
const http = require("http"); // Import HTTP for Socket.IO
const { Server } = require("socket.io"); // Import Socket.IO
const userRouter = require("./Routes/userRoute");
const channelRouter = require("./Routes/channelRoute");
const adminRoute = require("./Routes/adminRoute");
const { fetchAllchannelController } = require("./Controllers/channelController");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
const server = http.createServer(app); // Create HTTP server

const io = new Server(server, {
    cors: { origin: process.env.SERVER_URL, credentials: true },
});

app.use(express.json());
app.use(cors({ origin: process.env.SERVER_URL, credentials: true }));
app.use(cookieParser());

// Attach `io` to `req` so controllers can use it
app.use((req, res, next) => {
    req.io = io;
    next();
});

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Server is connected to DB");
    } catch (err) {
        console.log("Server is unable to connect to DB,", err.message);
    }
};
connectDb();

app.get("/", (req, res) => {
    res.send("API is working...");
});

app.use("/user", userRouter);
app.use("/channel", channelRouter);
app.use("/admin", adminRoute);
app.get("/fetch-all-channels", fetchAllchannelController);

// Socket.IO Connection
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle message deletion
    socket.on("messageDeleted", (msgId) => {
        // console.log(`Message deleted: ${msgId}`);
        io.emit("messageDeleted", msgId);
    });

    // Handle message edit
    socket.on("messageEdited", (updatedMessage) => {
        // console.log("Message edited:", updatedMessage);
        io.emit("messageEdited", updatedMessage);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
