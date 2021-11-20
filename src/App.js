import {SocketContext, socket} from './socket.js';
import './App.css';
import LocalGame from './LocalGame';

const App = () => {
  return(
    <SocketContext.Provider value = {socket}>
        <div className="App bg-black text-white">
          <LocalGame/>
        </div>
    </SocketContext.Provider>
  );
}

export default App