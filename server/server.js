import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {readdirSync} from "fs"

const morgan = require("morgan");
require("dotenv").config();

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors : {
        origin : 'http://localhost:3000',
        methods : ["GET","POST"],
        allowedHeaders : ["Content-type"] 
    }
});

//DB

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(() => console.log('DB CONNECTED'))
.catch((err) => console.log(err));

//MIDDLEWARE

app.use(express.json({limit : '5mb'}));
app.use(express.urlencoded({extended : true}));
app.use(cors({
    origin : ['http://localhost:3000']
}));


// AUTOLOAD ROUTES

readdirSync("./routes").map((r) => {
    app.use("/api",require(`./routes/${r}`))
});

// Socket
io.on("connect" , (socket) => {
    console.log('Socket.IO',socket.id);
    socket.on("new-post", (newPost) => {
        socket.broadcast.emit("new-post", newPost)
    })
});


// SERVER RUNNING
const port = process.env.port || 8000;

http.listen(port,() => {
    console.log(`SERVER RUNNING ON ${port}`);
});