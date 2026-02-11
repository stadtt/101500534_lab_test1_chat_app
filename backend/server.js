const express = require("express")
const mongoose = require("mongoose")
const userRoutes = require("./routes/user.js")
const cors = require("cors")

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

app.get("/" , (req,res) => {
    res.send("<h1> Welcome to assignment1 </h1>")
    
})

mongoose.connect (DB_CONNECTION_STRING, {
    
}). then ( () =>{
    console.log("Connected to MongoDB")
    app.listen(SERVER_PORT, () =>{
        console.log(`Server running at port ${SERVER_PORT}/`)
    })
}).catch((err) => {
    console.log("Error: " , err)
})