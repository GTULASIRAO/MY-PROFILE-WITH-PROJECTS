import { useState, useMemo} from "react"
import GameBoard from "./components/GameBoard";
import Player from "./components/player";
import Log from "./Log";

const WINNING_COMBINATIONS = [
  // rows
  [ [0,0], [0,1], [0,2] ],
  [ [1,0], [1,1], [1,2] ],
  [ [2,0], [2,1], [2,2] ],
  // cols
  [ [0,0], [1,0], [2,0] ],
  [ [0,1], [1,1], [2,1] ],
  [ [0,2], [1,2], [2,2] ],
  // diagonals
  [ [0,0], [1,1], [2,2] ],
  [ [0,2], [1,1], [2,0] ],
];

const EMPTY_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(turns) {
  // X always starts; if turns taken are even, it's X's turn.
  return turns.length % 2 === 0 ? "X" : "O";
}

function boardFromTurns(turns) {
  const board = EMPTY_BOARD.map(row => [...row]);
  for (const t of turns) {
    const { row, col } = t.square;
    board[row][col] = t.player;
  }
  return board;
}

function findWinner(board) {
  for (const combo of WINNING_COMBINATIONS) {
    const [a,b,c] = combo;
    const v1 = board[a[0]][a[1]];
    const v2 = board[b[0]][b[1]];
    const v3 = board[c[0]][c[1]];
    if (v1 && v1 === v2 && v1 === v3) {
      return v1; // 'X' or 'O'
    }
  }
  return null;
}

export default function App() {
  const [turns, setTurns] = useState([]); // [{square:{row,col}, player:'X'|'O'}]
  const activePlayer = deriveActivePlayer(turns);
  const board = useMemo(() => boardFromTurns(turns), [turns]);
  const winner = useMemo(() => findWinner(board), [board]);
  const isDraw = !winner && turns.length === 9;

  function handleSelectSquare(row, col) {
    // ignore if already filled or game over
    if (board[row][col] || winner) return;

    setTurns(prev => [
      { square: { row, col }, player: deriveActivePlayer(prev) },
      ...prev,
    ]);
  }

  function handleRestart() {
    setTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        {(winner || isDraw) && (
          <div id="game-over">
            <h2>Game Over</h2>
            <p>{winner ? `Player ${winner} wins!` : "It's a draw!"}</p>
            <button onClick={handleRestart}>Rematch</button>
          </div>
        )}

        <ol id="players" className="highlight-player">
          <Player initialname="Player 1" symbol="X" isActive={activePlayer === "X"} />
          <Player initialname="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </ol>

        <GameBoard board={board} onSelectSquare={handleSelectSquare} />
      </div>

      <Log turns={turns} />
    </main>
  );
}
