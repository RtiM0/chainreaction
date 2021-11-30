import {SocketContext, socket} from './socket.js';
import './App.css';
import LocalGame from './LocalGame.js';
import { useState } from 'react';
import RoomMaker from './RoomMaker.js';

const App = () => {
  const [gameMode,setGameMode] = useState("local");
  const [players,setPlayers] = useState(2);
  const [ready,setReady] = useState(false);

  return(
    <SocketContext.Provider value = {socket}>
      <div className={`App text-white ${ready?'bg-black':''} h-screen grid place-items-center`}>
        {
          ready?
            gameMode === "local"?
              <LocalGame options={{players:players}}/>
            :
              <RoomMaker/>
          :
            <div className="border-red-600 border-4 rounded-sm w-screen md:w-auto h-full md:h-auto flex flex-col justify-center p-8 bg-black bg-opacity-50">
              <h1 className="text-7xl p-8 font-bold flex justify-center text-green-600">Chain Reaction</h1>
              <div className="grid grid-cols-10 gap-4">
                <p className="text-2xl text-left sm:col-start-1 sm:col-span-2 text-green-600 font-bold col-span-10">Game Mode</p>
                <button onClick={()=>{setGameMode("local");}} className={`hover:bg-green-600 hover:bg-opacity-75 p-2 rounded-sm text-lg col-span-5 sm:col-span-4 ${gameMode==="local"?'bg-green-600 bg-opacity-50':''}`}>Local Multiplayer</button>
                <button onClick={()=>{setGameMode("multi");}} className={`hover:bg-green-600 hover:bg-opacity-75 p-2 rounded-sm text-lg col-span-5 sm:col-span-4 ${gameMode==="multi"?'bg-green-600 bg-opacity-50':''}`}>Online Multiplayer</button>
                {
                  gameMode==="local"?
                  <>
                    <p className="text-2xl text-left col-span-10 sm:col-start-1 sm:col-span-3 text-green-600 font-bold">Players</p>
                    <button onClick={()=>{setPlayers(2);}} className={`hover:bg-green-600 hover:bg-opacity-75 p-2 rounded-sm text-lg ${players===2?'bg-green-600 bg-opacity-50':''}`}>2</button>
                    <button onClick={()=>{setPlayers(3);}} className={`hover:bg-blue-600 hover:bg-opacity-75 p-2 rounded-sm text-lg ${players===3?'bg-blue-600 bg-opacity-50':''}`}>3</button>
                    <button onClick={()=>{setPlayers(4);}} className={`hover:bg-yellow-600 hover:bg-opacity-75 p-2 rounded-sm text-lg ${players===4?'bg-yellow-600 bg-opacity-50':''}`}>4</button>
                    <button onClick={()=>{setPlayers(5);}} className={`hover:bg-pink-600 hover:bg-opacity-75 p-2 rounded-sm text-lg ${players===5?'bg-pink-600 bg-opacity-50':''}`}>5</button>
                    <button onClick={()=>{setPlayers(6);}} className={`hover:bg-indigo-600 hover:bg-opacity-75 p-2 rounded-sm text-lg ${players===6?'bg-indigo-600 bg-opacity-50':''}`}>6</button>
                    <button onClick={()=>{setPlayers(7);}} className={`hover:bg-purple-600 hover:bg-opacity-75 p-2 rounded-sm text-lg ${players===7?'bg-purple-600 bg-opacity-50':''}`}>7</button>
                    <button onClick={()=>{setPlayers(8);}} className={`hover:bg-gray-600 hover:bg-opacity-75 p-2 rounded-sm text-lg ${players===8?'bg-gray-600 bg-opacity-50':''}`}>8</button>
                  </>
                  :<></>
                }
                <button onClick={()=>{setReady(true);}} className="bg-red-600 bg-opacity-75 col-start-4 col-end-8 p-2">Play</button>
              </div>
            </div>
        }
        {/* for purgecss to include css */}
        <div className="border-red-600 text-red-600 hidden"></div>
        <div className="border-green-600 text-green-600 hidden"></div>
        <div className="border-blue-600 text-blue-600 hidden"></div>
        <div className="border-yellow-600 text-yellow-600 hidden"></div>
        <div className="border-pink-600 text-pink-600 hidden"></div>
        <div className="border-indigo-600 text-indigo-600 hidden"></div>
        <div className="border-purple-600 text-purple-600 hidden"></div>
        <div className="border-gray-600 text-gray-600 hidden"></div>
      </div>
    </SocketContext.Provider>
    );
}

export default App