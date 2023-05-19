import React, { useEffect, useState } from "react";
import axios from "axios";
import AddPlayerForm from "./component/AddPlayerForm";
import AddRoundButton from "./component/AddRoundButton";
import PlayerList from "./component/PlayerList";
axios.defaults.baseURL = "http://localhost:3004";
axios.defaults.withCredentials = true;

function App() {
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

    if (players.length === 0) {
      fetchData();
    }
  }, [players]);

  const addPlayer = async (name) => {
    try {
      const response = await axios.post("http://localhost:3004/api/players", {
        name,
      });
      setPlayers([...players, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const addRound = () => {
    axios.post("http://localhost:3004/api/players/round").then((response) => {
      setPlayers(response.data);
    });
  };
  const updateScore = async (playerId, roundIndex, score) => {
    try {
      const parsedScore = parseInt(score, 10);
      if (isNaN(parsedScore)) {
        throw new Error("Invalid score");
      }
      await axios.put(`/api/players/${playerId}/rounds/${roundIndex}`, {
        score: parsedScore,
      });
      const updatedPlayers = players.map((player) => {
        if (player.id === playerId) {
          const updatedRounds = player.rounds.map((round, index) => {
            if (index === roundIndex) {
              return { ...round, score: parsedScore };
            }
            return round;
          });
          return { ...player, rounds: updatedRounds };
        }
        return player;
      });
      setPlayers(updatedPlayers);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <>
        <div>
          <AddPlayerForm onAdd={addPlayer} />
          <div className="players-container">
            {players.map((player) => (
              <div className="player" key={player.id}>
                <h2>{player.name}</h2>
                {player.rounds.map((round, roundIndex) => (
                  <p key={roundIndex}>
                    Round {round.roundIndex + 1}: {round.score}
                    <button
                      className="btn themBtn"
                      onClick={() =>
                        updateScore(
                          player.id,
                          round.roundIndex,
                          round.score + 1
                        )
                      }
                    >
                      Tăng
                    </button>
                    <button
                      className="btn giamBtn"
                      onClick={() =>
                        updateScore(
                          player.id,
                          round.roundIndex,
                          round.score - 1
                        )
                      }
                    >
                      Giảm
                    </button>
                  </p>
                ))}
              </div>
            ))}
          </div>
          <AddRoundButton onAdd={addRound} />
        </div>
      </>
    </>
  );
}

export default App;
// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import AddPlayerPage from "./component/AddPlayerPage";
// import AddScorePage from "./component/AddScorePage";
// import AddRoundButton from "./component/AddRoundButton";

// const App = () => {
//   return (
//     <div>
//       <Routes>
//         <Route path="/" element={<AddPlayerPage />}></Route>
//         <Route path="/add-score" element={<AddScorePage />}></Route>
//         <Route ></Route>
//       </Routes>
//     </div>
//   );
// };

// export default App;
