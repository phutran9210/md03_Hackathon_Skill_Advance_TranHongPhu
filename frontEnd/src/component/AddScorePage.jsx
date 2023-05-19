import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayerList from "./PlayerList";

const AddScorePage = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3004/api/players");
        setPlayers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleUpdateScore = (playerId, roundIndex, score) => {
    const updatedPlayers = players.map((player) => {
      if (player.id === playerId) {
        const updatedRounds = player.rounds.map((round, index) => {
          if (index === roundIndex) {
            return { ...round, score };
          }
          return round;
        });
        return { ...player, rounds: updatedRounds };
      }
      return player;
    });
    setPlayers(updatedPlayers);
  };

  return (
    <div>
      <h1>Add Score</h1>
      <PlayerList players={players} />
      {/* Add score controls */}
    </div>
  );
};

export default AddScorePage;
