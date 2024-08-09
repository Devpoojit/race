export default function GameBoard({ players, changeSpeed }) {

    const colors = (index) => {
        switch (index) {
            case 0:
                return "bg-success";
            case 1:
                return "bg-warning";
            case 2:
                return "bg-danger";
            default:
                return "bg-light";
        }
    };

    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Steps</th>
            <th>Speed</th>
            <th>Change Speed</th>
          </tr>
        </thead>
        <tbody>
          {players
            .sort((a, b) => b.steps - a.steps)
            .map((player, index) => (
              <tr key={index} className={colors(index)} >
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td>{player.steps}</td>
                <td>{player.speed}</td>
                <td>
                  <button
                    className="btn btn-outline-secondary btn-sm me-2"
                    onClick={() => changeSpeed(index, 1)}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => changeSpeed(index, -1)}
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
  