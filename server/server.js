// ------ packages -------------------------------
const express = require("express");
const path = require("path");
const ip = require("my-local-ip")();

const PORT = 8080;

const INDEX = path.join(__dirname, "../webcontent/index.html");
const NOTFOUND = path.join(__dirname, "../webcontent/notFound.html");

function fnRouting(req, res) {
    if (req.url === "/") {
        res.sendFile(INDEX);
    } else {
        res.sendFile(NOTFOUND);
    }
}

// Start server
const
    app = express()
        .use(express.static("webcontent"))
        .use(fnRouting)
        .listen(PORT, () => console.log("Listening on " + ip + ":" + PORT + "\n." + "\n." + "\n.\n"));

const io = require("socket.io")(app);

io.on("connection", function (socket) {
    console.log("User connected: " + socket.handshake.address);
});