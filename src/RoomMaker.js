import { useCallback, useContext, useEffect, useState } from "react";
import MultiGame from "./MultiGame";
import { SocketContext } from "./socket";

const RoomMaker = () => {
    const socket = useContext(SocketContext);
    const [roomId,setRoomId] = useState("");
    const [ready, setReady] = useState(false);
    const [players, setPlayers] = useState([]);
    const [game, setGame] = useState(null);

    const createRoom = useCallback(() => {
        socket.emit('create', socket.id);
        setRoomId(socket.id);
        setPlayers([{name: socket.id, color: 'red'}]);
        setReady(true);
    },[socket]);

    useEffect(()=>{
        socket.on('joined', (joined) => {
            setPlayers(joined);
        })
        socket.on('game', (game) => {
            setGame(game);
        });
    },[socket]);
    
    const joinRoom = useCallback(() => {
        socket.emit('join',roomId);
        setReady(true);
    },[socket,roomId]);

    const startGame = useCallback(()=>{
        socket.emit('create game');
    },[socket]);

    return (<>
    {game?
        <MultiGame options = {game}/>
    :
        <div className="border-red-600 border-4 rounded-sm w-screen md:w-auto h-full md:h-auto flex flex-col justify-center p-8 bg-black bg-opacity-50">
            <h1 className="text-5xl p-8 font-bold flex justify-center text-green-600">Online Multiplayer</h1>
            <div className="grid grid-cols-4 gap-4">
            {ready&&players.length>0?
                <>
                    <h1 className="col-span-4 text-lg text-green-600">ROOM ID: <span className="font-mono text-white">{roomId}</span></h1>
                    <div className="col-span-4 text-lg">Joined users:{players.map((element, index)=>{return (<p key={element.name} className={`text-${element.color}-600`}>{element.name===socket.id?` Player ${index+1} (You)`:`Player ${index+1}`}</p>)})}</div>
                    {players.findIndex(e => e.name===socket.id)===0?<button onClick={()=>{startGame();}} className="bg-green-600 p-2 col-start-2 col-span-2 text-md">Play</button>:<p className="col-span-4"> Waiting for Player 1 to start the game...</p>}
                </>
            :
                <>
                    <p className="text-2xl text-left text-green-600 font-bold col-span-4">Join a Room</p>
                    <input className="col-span-3 p-4 bg-green-600 bg-opacity-50 shadow appearance-none border rounded-sm leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Room ID" value={roomId} onChange={(event) => {setRoomId(event.target.value);}} />
                    <button onClick={()=>{joinRoom();}} className="rounded-sm font-bold bg-green-600">Join</button>
                    <p className="text-2xl text-left text-green-600 font-bold col-span-4">OR</p>
                    <button onClick={()=>{createRoom();}} className="col-span-4 font-bold bg-green-600 p-2 rounded-sm">Create Room</button>
                </>
            }
            </div>
        </div>
    }
    </>
    );
}

export default RoomMaker;