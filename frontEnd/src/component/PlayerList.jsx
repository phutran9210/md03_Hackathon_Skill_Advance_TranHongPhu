import React from "react";

const PlayerList = ({ players, onUpdateScore }) => {
  const handleIncreaseScore = (playerId, roundIndex) => {
    onUpdateScore(
      playerId,
      roundIndex,
      players[playerId].rounds[roundIndex].score + 1
    );
  };

  const handleDecreaseScore = (playerId, roundIndex) => {
    onUpdateScore(
      playerId,
      roundIndex,
      players[playerId].rounds[roundIndex].score - 1
    );
  };

  return (
    <div>
      {players.map((player, playerId) => (
        <div key={playerId}>
          <h2>{player.name}</h2>
          {player.rounds.map((round, roundIndex) => (
            <p key={roundIndex}>
              Round {round.roundIndex + 1}: {round.score}
              <button onClick={() => handleIncreaseScore(playerId, roundIndex)}>
                Increase Score
              </button>
              <button onClick={() => handleDecreaseScore(playerId, roundIndex)}>
                Decrease Score
              </button>
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PlayerList;
