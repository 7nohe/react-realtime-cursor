import "./App.css";
import "../../../src/styles/react-realtime-cursor.css";
import {
  ReactRealtimeCursor,
  initializeFirebaseApp,
} from "../../../src/firebase";
import { firebaseApp } from "../firebase";
import { getAuth, signInAnonymously, User } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { useState } from "react";

const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const app = initializeFirebaseApp({ database, auth, roomId: "myRoomId" });

function App() {
  const [userName, setUserName] = useState("");
  const [currentUser, setCurrentUser] = useState<User>();

  if (!currentUser) {
    return (
      <div>
        <div>Please enter your name</div>
        <input
          type="text"
          onChange={(input) => setUserName(input.target.value)}
        />
        <button
          onClick={async () => {
            const credential = await signInAnonymously(auth);
            setCurrentUser(credential.user);
          }}
        >
          Start
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      <ReactRealtimeCursor
        firebaseApp={app}
        autoSignIn={false}
        userName={userName}
        style={{
          backgroundColor: "white",
          maxWidth: 860,
          maxHeight: 640,
          padding: 20,
        }}
      >
        <button onClick={() => console.log("Clicked")}>Click me</button>
      </ReactRealtimeCursor>
    </div>
  );
}

export default App;
