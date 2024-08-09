import { useEffect, useState } from "react";
import Nav from "./Nav";
import GameBoard from "./GameBoard";

export default function App() {
  const [players, setPlayers] = useState([]);
  const [status, setStatus] = useState(false);

  const addPlayer = (name) => {
    if (name) {
      setPlayers([...players, { name, steps: 0, speed: 5 }]);
    }
  };

  const startGame = () => {
    setStatus(true);
  };

  const endGame = () => {
    setStatus(false);
  };

  const reset = () => {
    setPlayers([]);
    setStatus(false);
  }

  const changeSpeed = (index, delta) => {
    setPlayers((currPlayers) => currPlayers.map((player, i) => {
      if (i === index) {
        return {
          ...player,
          speed: Math.max(1, player.speed + delta)
        };
      }
      return player;
    }));
  };

  useEffect(() => {
    let interval;
    if (status) {
      interval = setInterval(() => {
        setPlayers((currPlayers) => currPlayers.map((player) => (
          { ...player, steps: player.steps + player.speed }
        )));
      }, 1000)
    }
    return () => clearInterval(interval);
  }, [status]);

  return (
    <div>
      <Nav />
      <div className="container mt-4">
        <div className="row g-2">
          <div className="col-auto">
            <input
              type="text"
              placeholder="Player Name"
              className="form-control"
              style={{ width: "200px" }}
              id="playerName"
            />
          </div>
          <div className="col-auto">
            <button
              className="btn btn-primary"
              onClick={() => {
                const name = document.getElementById("playerName").value;
                addPlayer(name);
                document.getElementById("playerName").value = "";
              }}
            >
              Add Player
            </button>
          </div>
        </div>
        <div className="mt-3">
          <button className="btn btn-success me-2" onClick={startGame}>
            Start Game
          </button>
          <button className="btn btn-danger ml-2" onClick={endGame}>
            End Game
          </button>
          <button className="btn btn-primary ml-2" onClick={reset}>
            Reset
          </button>
        </div>
      </div>

      <GameBoard players={players} changeSpeed={changeSpeed} />
    </div>
  );
}