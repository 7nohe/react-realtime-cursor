# Firebase Guide

## Installation

```bash
$ npm install firebase @7nohe/react-realtime-cursor
```

## Setup

You need to create a firebaes project.

[Here](https://firebase.google.com/docs/web/setup) is the official guide to project creation.

## Usage

For example, you can create firebase.ts for initializing your firebase app.

```ts
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "xxxxx",
  authDomain: "xxxxx",
  databaseURL: "xxxxx",
  projectId: "xxxxx",
  storageBucket: "xxxxx",
  messagingSenderId: "xxxxx",
  appId: "xxxxx",
};

export const firebaseApp = initializeApp(firebaseConfig);
```

After that, create a firebase instance, and pass it to a `ReactRealtimeCursor` component.

```jsx
import "./App.css";
import {
  ReactRealtimeCursor,
  initializeFirebaseApp,
} from "@7nohe/react-realtime-cursor";
import { firebaseApp } from "../firebase";

const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const app = initializeFirebaseApp({ database, auth, roomId: "myRoomId" });

function App() {
  return (
    <div className="App">
      <ReactRealtimeCursor firebaseApp={app} />
    </div>
  );
}

export default App;
```

Optionally, you can add custom sigin logic to your application.

```jsx
import './App.css';
import {
  ReactRealtimeCursor,
  initializeFirebaseApp,
} from '@7nohe/react-realtime-cursor';
import { firebaseApp } from '../firebase';
import { getAuth, signInAnonymously, User } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { useState } from 'react';

const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const app = initializeFirebaseApp({ database, auth, roomId: 'myRoomId' });

function App() {
  const [userName, setUserName] = useState('');
  const [currentUser, setCurrentUser] = useState<User>();

  if (!currentUser) {
    return (
      <div>
        <div>Please enter your name</div>
        <input
          type="text"
          onChange={input => setUserName(input.target.value)}
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
      <ReactRealtimeCursor firebaseApp={app} autoSignIn={false} userName={userName} >
        <button onClick={() => console.log('Clicked')}>Click me</button>
      </ReactRealtimeCursor>
    </div>
  );
}

export default App;
```
