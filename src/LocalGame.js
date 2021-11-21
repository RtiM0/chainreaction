import { useCallback, useMemo, useState } from "react";
import logic from './game.js';

const LocalGame = ({options}) => {
  const board = useMemo(() => new logic(options), [options]);
  const [game, setGame] = useState({
    game: board.game,
    players: board.players,
    turn: board.turn
  })

  const add = useCallback((event)=>{
    var pos = JSON.parse(event.target.id);
    board.add(pos);
    setGame({
      game: board.game,
      players: board.players,
      turn: board.turn
    });
  },[board]);

  const draw = () => {
      return (
        <>
          {game.game.map((x, i) => {
            return (
              <tr key={i}>
                {x.map((y, j) => {
                  return (
                    <td id={`[${i},${j}]`} key={j} onClick={add.bind(this)} className={`p-5 border-4 border-${game.players[game.turn]}-600 text-${game.game[i][j].player}-600`}>{y.mass}</td>
                  )
                })}
              </tr>
            )
          })}
        </>
      );
  }
  

  return (
    <div className="flex h-screen">
      <table className={`m-auto border-collapse border-4 border-${game.players[game.turn]}-600 text-gray-300 font-extrabold text-2xl`}>
        <thead><tr><th className="text-2xl p-1" colSpan={6}>Chain Reaction</th></tr></thead>
        <tbody>{draw()}</tbody>
        <tfoot></tfoot>
      </table>
      {/* for purgecss to include css */}
      <div className="border-red-600 text-green-600 hidden"></div>
      <div className="border-green-600 text-red-600 hidden"></div>
      <div className="border-blue-600 text-red-600 hidden"></div>
      <div className="border-yellow-600 text-red-600 hidden"></div>
      <div className="border-pink-600 text-red-600 hidden"></div>
      <div className="border-indigo-600 text-red-600 hidden"></div>
      <div className="border-purple-600 text-red-600 hidden"></div>
      <div className="border-gray-600 text-red-600 hidden"></div>
    </div>
  );
}

export default LocalGame;