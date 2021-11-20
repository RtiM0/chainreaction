import { useCallback, useContext, useEffect, useState } from "react";
import {SocketContext} from './socket.js';

const LocalGame = ({options}) => {
    const [game, setGame] = useState({
        game: [...Array(9)].map(() => [...Array(6)].map(() => { return { player: null, mass: 0 } })),
        players: ['red', 'green'],
        turn: 0,
    });
    const socket = useContext(SocketContext);

    const add = useCallback((event) => {socket.emit('pos',event.target.id)},[socket]);

    useEffect(()=>{
        socket.emit("message","YO");
        socket.on('game',(msg)=>{
            setGame(msg);
        });
    },[socket]);

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
        {/* for tailwind include css */}
        <div className="border-green-600 text-green-600"></div>
        <div className="border-red-600 text-red-600"></div>
      </div>
    );
}

export default LocalGame;