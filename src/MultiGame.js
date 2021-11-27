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

    useEffect(()=>{console.log(options)},[options]);

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
      {game.players.length>0?
        <div className="flex h-screen">
          <table className={`m-auto border-collapse border-4 border-${game.players[game.turn].color}-600 text-gray-300 font-extrabold text-2xl`}>
            <thead><tr><th className="text-2xl p-1" colSpan={6}>Chain Reaction</th></tr></thead>
            <tbody>{draw()}</tbody>
            <tfoot></tfoot>
          </table>
        </div>
      :<></>}
      </>
    );
}

export default MultiGame;