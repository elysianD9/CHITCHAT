// entry point for our Server
// whole code for the server

const express = require("express");
const app = express(); // instance of an express
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, { //connecting express server here with socket.io
        cors: {
            origin: "http://localhost:3000",  //here we are passing the react server on which it will run and telling socket.io to accept this connection which on this url
            methods: ["GET","POST"],
        }
});


io.on("connection", (socket) => {      //if someone connect for that  & () => is callback function
    console.log(`User Connected : ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`user with id : ${socket.id} joined room: ${data}`);
     }
    );
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("recieve_message", data);
    });
   
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});     


server.listen(3001, () =>{  //react works best at server 3001
    console.log("SERVER RUNNING");
});
