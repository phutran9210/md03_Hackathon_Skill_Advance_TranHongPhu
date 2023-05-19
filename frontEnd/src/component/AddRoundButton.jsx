import React from "react";
import axios from "axios";

const AddRoundButton = ({ onAdd }) => {
  const handleAddRound = () => {
    axios
      .post("http://localhost:3004/api/players/round")
      .then((response) => {
        onAdd(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return <button onClick={handleAddRound}>Add Round</button>;
};

export default AddRoundButton;
