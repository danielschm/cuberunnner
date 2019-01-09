// ------ packages -------------------------------
const express = require("express");
const path = require("path");
const ip = require("my-local-ip")();
const Game = require("./engine/Game");

const bInstantStart = true;

const PORT = 8080;

// ------ server ---------------------------------
const
    app = express()
        .use(express.static("webcontent"))
        .listen(PORT, () => console.log("Listening on " + ip + ":" + PORT + "\n." + "\n." + "\n.\n"));

// ------ socket io ------------------------------
const io = require("socket.io")(app);

io.on("connection", function (socket) {
    const ip = socket.handshake.address;
    console.log("User connected: " + ip);

    oGame.connectPlayer(ip);

    socket.on("changeDirection", sDirection => {
        oGame.players.find(e => e.id === ip).changeDirection(sDirection);
    })
});

// ------ game -----------------------------------
const oGame = new Game(io);
if (bInstantStart) oGame.start();


