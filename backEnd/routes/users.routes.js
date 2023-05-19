var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../dataUser/dataUsers.json");
let players = loadPlayers();
console.log(players);
function loadPlayers() {
  try {
    const data = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading players:", error);
    return [];
  }
}

function savePlayers() {
  try {
    const data = JSON.stringify(players, null, 2);
    fs.writeFileSync(dataFilePath, data, "utf8");
  } catch (error) {
    console.error("Error saving players:", error);
  }
}

router.get("/", (req, res) => {
  res.json(players);
});

router.post("/", (req, res) => {
  const { name } = req.body;
  const checkName = players.find(
    (player) => player.name.toLowerCase() === name.toLowerCase()
  );
  if (!name || checkName) {
    return res
      .status(400)
      .json({ message: "Name is required and must be unique" });
  }

  const newPlayer = {
    id: players.length + 1,
    name,
    rounds: [{ roundIndex: 0, score: 0 }],
  };
  players.push(newPlayer);
  savePlayers();
  res.status(201).json(newPlayer);
});

router.post("/round", (req, res) => {
  players.forEach((player) => {
    const newRound = {
      roundIndex: player.rounds.length,
      score: 0,
    };
    player.rounds.push(newRound);
    savePlayers();
  });
  res.status(201).json(players);
});

router.put("/:playerId/rounds/:roundIndex", (req, res) => {
  const { playerId, roundIndex } = req.params;
  const { score } = req.body;

  const player = players.find((player) => player.id === Number(playerId));

  if (!player) {
    return res.status(404).json({ message: "Player not found" });
  }

  const round = player.rounds.find(
    (round) => round.roundIndex === Number(roundIndex)
  );

  if (!round) {
    return res.status(404).json({ message: "Round not found" });
  }

  round.score = score;
  savePlayers();
  res.status(200).json(player);
});

module.exports = router;
