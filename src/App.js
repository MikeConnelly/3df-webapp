import io from 'socket.io-client';
import Canvas from './Canvas';
import './App.css';
const socket = io();

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Canvas socket={socket} />
    </div>
  );
}

export default App;
