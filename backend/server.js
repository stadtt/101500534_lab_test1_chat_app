const express = require("express")
const mongoose = require("mongoose")
const userRoutes = require("./routes/user.js")
const groupMsgRoutes = require("./routes/groupmsg.js")
const GroupMsg = require("./models/GroupMsgModel.js")
const cors = require("cors")
const { createServer } = require("http")
const { Server } = require("socket.io")

require("dotenv").config()

const DB_CONNECTION_STRING = process.env.DB_CONNECTION 
const SERVER_PORT =  3001

const app = express()

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:3000", "http://127.0.0.1:3001"],
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// app.use("/api/v1", empRoutes)
app.use("/api/v1", userRoutes)
app.use("/api/v1/groupmsg", groupMsgRoutes)

app.get("/" , (req,res) => {
    res.send("<h1> Welcome to assignment1 </h1>")
    
})

mongoose
  .connect(DB_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB");

  
    const httpServer = createServer(app);

    
    const io = new Server(httpServer, {
      cors: {
        origin: [
          "http://localhost:3000",
          "http://localhost:3001",
          "http://127.0.0.1:3000",
          "http://127.0.0.1:3001",
        ],
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

     io.on("connection", (socket) => {
      console.log("New client connected:", socket.id);

      socket.on("joinRoom", (room) => {
        socket.join(room);
        console.log(`Client ${socket.id} joined room: ${room}`);
        io.to(room).emit("message", {
          room: room,
          message: ` user joined ${room}`
        });
      });

      socket.on("chatMessage", async (msg) => {
        console.log("Received message:", msg);
        
        
        try {
          const newMsg = new GroupMsg({
            from_user: msg.username,
            room: msg.room,
            message: msg.message
          });
          await newMsg.save();
        } catch (err) {
          console.error("Error saving message:", err);
        }
        
        // Emit to room
        io.to(msg.room).emit("message", msg);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });


    httpServer.listen(SERVER_PORT, () => {
      console.log(`Server running at http://localhost:${SERVER_PORT}/`);
    });
  })
  .catch((err) => {
    console.log("Error: ", err);
  });