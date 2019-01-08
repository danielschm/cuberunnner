// ------ packages -------------------------------
const express = require("express");
const path = require("path");
const ip = require("my-local-ip")();

const PORT = 8080;

// Start server
const
    app = express()
        .use(express.static("webcontent"))
        .listen(PORT, () => console.log("Listening on " + ip + ":" + PORT + "\n." + "\n." + "\n.\n"));

const io = require("socket.io")(app);

io.on("connection", function (socket) {
    console.log("User connected: " + socket.handshake.address);
});