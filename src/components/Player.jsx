import { useState } from "react";

export default function Player({ initialname, symbol, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialname);

  function handleEditClick() {
    setIsEditing((prev) => !prev);
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let nameControl = <span className="player-name">{playerName}</span>;
  let btnLabel = "edit";

  if (isEditing) {
    nameControl = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
    btnLabel = "save";
  }

  return (
    <li className={isActive ? "active player" : "player"}>
      <span className="player-info">
        {nameControl}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{btnLabel}</button>
    </li>
  );
}
