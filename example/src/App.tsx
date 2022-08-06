import './App.css';
import {
  ReactRealtimeCursor,
  initializeFirebaseApp,
} from '@7nohe/react-realtime-cursor';
import { firebaseApp } from '../firebase';
import { signInAnonymously, User } from 'firebase/auth';
import { useState } from 'react';

const app = initializeFirebaseApp({ firebaseApp, roomId: 'myRoomId' });

const auth = app.auth;

function App() {
  const [userName, setUserName] = useState('')
  const [currentUser, setCurrentUser] = useState<User>()

  if (!currentUser) {
    return <div style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <div>Please enter your name</div>
      <div style={{ marginBottom: '10px' }}>
        <input type="text" onChange={input => setUserName(input.target.value)} />
      </div>
      <button onClick={async () => {
        const credential = await signInAnonymously(auth)
        setCurrentUser(credential.user)
      }}>Start</button>
    </div>
  }

  return (
    <div className="App">
      <ReactRealtimeCursor app={app} autoSignIn={false} userName={userName}/>
    </div>
  );
}

export default App;
