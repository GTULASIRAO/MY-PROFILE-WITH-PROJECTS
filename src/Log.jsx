export default function Log({ turns = [] }) {
  return (
    <ol id="log">
      {turns.map((turn, idx) => (
        <li key={`${turn.square.row}${turn.square.col}${idx}`}>
          {turn.player} ➜ ({turn.square.row + 1}, {turn.square.col + 1})
        </li>
      ))}
    </ol>
  );
}
