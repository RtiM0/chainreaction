import {SocketContext, socket} from './socket.js';
import './App.css';
import LocalGame from './LocalGame.js';
import { useState } from 'react';

const App = () => {
  const [gameMode,setGameMode] = useState("local");
  const [players,setPlayers] = useState(2);
  const [ready,setReady] = useState(false);

  return(
    <SocketContext.Provider value = {socket}>
      <div className={`App text-white ${ready && gameMode==="local"?'bg-black':'h-screen flex'}`}>
        {
          ready && gameMode==="local"?
            <LocalGame options={{players:players}}/>
          :
            <div className="border-red-600 border-4 m-auto p-8 bg-black bg-opacity-50">
              <h1 className="text-7xl p-8 font-bold text-green-600">Chain Reaction</h1>
              <div className="grid grid-cols-10 gap-4">
                <p className="text-2xl text-left sm:col-start-1 sm:col-span-2 text-green-600 font-bold col-span-10">Game Mode</p>
                <span onClick={()=>{setGameMode("local");}} className={`hover:bg-green-600 hover:bg-opacity-50 cursor-pointer p-2 text-lg col-span-5 sm:col-span-4 ${gameMode==="local"?'bg-green-600 bg-opacity-50':''}`}>Local Multiplayer</span>
                <span onClick={()=>{setGameMode("multi");}} className={`hover:bg-green-600 hover:bg-opacity-50 cursor-pointer p-2 text-lg col-span-5 sm:col-span-4 ${gameMode==="multi"?'bg-green-600 bg-opacity-50':''}`}>Online Multiplayer</span>
                {
                  gameMode==="local"?
                  <>
                    <p className="text-2xl text-left col-span-10 sm:col-start-1 sm:col-span-3 text-green-600 font-bold">Players</p>
                    <span onClick={()=>{setPlayers(2);}} className={`hover:bg-green-600 hover:bg-opacity-50 cursor-pointer p-2 text-lg col-span-1 ${players===2?'bg-green-600 bg-opacity-50':''}`}>2</span>
                    <span onClick={()=>{setPlayers(3);}} className={`hover:bg-blue-600 hover:bg-opacity-50 cursor-pointer p-2 text-lg ${players===3?'bg-blue-600 bg-opacity-50':''}`}>3</span>
                    <span onClick={()=>{setPlayers(4);}} className={`hover:bg-yellow-600 hover:bg-opacity-50 cursor-pointer p-2 text-lg ${players===4?'bg-yellow-600 bg-opacity-50':''}`}>4</span>
                    <span onClick={()=>{setPlayers(5);}} className={`hover:bg-pink-600 hover:bg-opacity-50 cursor-pointer p-2 text-lg ${players===5?'bg-pink-600 bg-opacity-50':''}`}>5</span>
                    <span onClick={()=>{setPlayers(6);}} className={`hover:bg-indigo-600 hover:bg-opacity-50 cursor-pointer p-2 text-lg ${players===6?'bg-indigo-600 bg-opacity-50':''}`}>6</span>
                    <span onClick={()=>{setPlayers(7);}} className={`hover:bg-purple-600 hover:bg-opacity-50 cursor-pointer p-2 text-lg ${players===7?'bg-purple-600 bg-opacity-50':''}`}>7</span>
                    <span onClick={()=>{setPlayers(8);}} className={`hover:bg-gray-600 hover:bg-opacity-50 cursor-pointer p-2 text-lg ${players===8?'bg-gray-600 bg-opacity-50':''}`}>8</span>
                  </>
                  :<></>
                }
                <button onClick={()=>{if (gameMode==="local") { setReady(true); }}} className="bg-red-600 col-start-4 col-end-8 p-2">{gameMode==="local"?'Play':'Coming Soon'}</button>
              </div>
            </div>
        }
      </div>
    </SocketContext.Provider>
    );
}

export default App