import './App.css';
import {
  ReactRealtimeCursor,
  initializeRRCApp,
} from '@7nohe/react-realtime-cursor';
import { firebaseConfig } from '../firebase.config';
const app = initializeRRCApp({ firebaseConfig, roomId: 'myRoomId' });

function App() {

  return (
    <div className="App">
      <ReactRealtimeCursor app={app} />
    </div>
  );
}

export default App;
