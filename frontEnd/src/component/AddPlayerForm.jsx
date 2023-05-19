import React, { useState } from "react";
import axios from "axios";

const AddPlayerForm = ({ onAdd }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      return;
    }
    try {
      const response = await axios.post("http://localhost:3004/api/players", {
        name,
      });
      onAdd(response.data);
      setName("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter player name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add Player</button>
    </form>
  );
};

export default AddPlayerForm;
