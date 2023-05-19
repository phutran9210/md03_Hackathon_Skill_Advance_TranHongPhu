import React, { useEffect, useState } from "react";
import axios from "axios";
import AddPlayerForm from "./AddPlayerForm";
import PlayerList from "./PlayerList";

const AddPlayerPage = () => {
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

  const handleAddPlayer = (newPlayer) => {
    setPlayers([...players, newPlayer]);
  };

  return (
    <div>
      <h1>Add Player</h1>
      <AddPlayerForm onAdd={handleAddPlayer} />
      <PlayerList players={players} />
    </div>
  );
};

export default AddPlayerPage;
