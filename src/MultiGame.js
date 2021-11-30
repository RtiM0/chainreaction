import { useCallback, useContext, useEffect, useState } from "react";
import {SocketContext} from './socket.js';

const MultiGame = ({options}) => {
    const [game, setGame] = useState(options);
    const socket = useContext(SocketContext);

    const add = useCallback((event) => {
      if (game.players[game.turn].name === socket.id) {
        socket.emit('add',event.target.id);
      }
    },[socket,game]);

    useEffect(()=>{
      socket.on("game", (game) => {
        setGame(game);
      });
    },[socket]);

    const draw = () => {
        return (
          <>
            {game.game.map((x, i) => {
              return (
                <tr key={i}>
                  {x.map((y, j) => {
                    var text = y.player?`text-${y.player.color}-600`:'';
                    return (
                      <td id={`[${i},${j}]`} key={j} onClick={add.bind(this)} className={`p-5 border-4 border-${game.players[game.turn].color}-600 ${text}`}>{y.mass}</td>
                    )
                  })}
                </tr>
              )
            })}
          </>
        );
    }
    

    return (<>
      {game.players.length>1?
        <div className="flex h-screen">
          <table className={`m-auto border-collapse border-4 border-${game.players[game.turn].color}-600 text-gray-300 font-extrabold text-2xl`}>
            <thead><tr><th className="text-2xl p-1" colSpan={6}>Chain Reaction</th></tr></thead>
            <tbody>{draw()}</tbody>
            <tfoot></tfoot>
          </table>
        </div>
      :
      <div className={`border-${game.players[0].color}-600 border-4 rounded-sm w-screen md:w-auto h-full md:h-auto flex flex-col justify-center p-8 bg-black bg-opacity-50`}>
        <h1 className="text-5xl p-8 font-bold flex justify-center text-green-600">GAME OVER</h1>
        <h1 className={`col-span-4 text-lg text-${game.players[0].color}-600`}>{game.players[0].color.toUpperCase()} WON</h1>
        <button onClick={() => {window.location.reload()}} className={`bg-green-600 bg-opacity-50 hover:bg-opacity-100 mt-16 py-2 rounded-sm`}>Return to Main Menu</button>
      </div>
      }
      </>
    );
}

export default MultiGame;