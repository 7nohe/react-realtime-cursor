<p align="center">
  <img src="https://user-images.githubusercontent.com/9207663/190860564-dc2b3516-28a2-4249-a420-d8f33b4f6c69.png" >
  <p align="center">Figma-like cursor chat for React<p>
  <p align="center">
    <a href="https://www.npmjs.com/package/@7nohe/react-realtime-cursor">
      <img src="https://img.shields.io/npm/v/@7nohe/react-realtime-cursor.svg" />
    </a>
    <a href="https://github.com/7nohe/react-realtime-cursor/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/7nohe/react-realtime-cursor.svg" />
    </a>
    <a href="https://github.com/7nohe/react-realtime-cursor/actions/workflows/main.yml">
      <img src="https://github.com/7nohe/react-realtime-cursor/actions/workflows/main.yml/badge.svg" />
    </a>
  </p>
</p>

## Features

- Real-time cursor sharing
- Sending temporary messages with cursor
  - Press `/` to show an input box
  - Press `ESC` to close an input box

## Installation

```bash
$ npm install firebase @7nohe/react-realtime-cursor
```

## Setup

This library uses firebase as its backend.
Therefore, you need to create a firebaes project.

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
      <ReactRealtimeCursor app={app} />
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
      <ReactRealtimeCursor app={app} autoSignIn={false} userName={userName} >
        <button onClick={() => console.log('Clicked')}>Click me</button>
      </ReactRealtimeCursor>
    </div>
  );
}

export default App;
```

## Documentation

### `initializeFirebaseApp` options

```ts
declare type FirebaseAppOptions = {
  database: Database;
  auth: Auth;
  roomId: string;
};
export declare const initializeFirebaseApp: (
  options: FirebaseAppOptions
) => ReatRealtimeCursorApp;
```

### `ReatRealtimeCursorApp` props

```ts
declare type Props = MouseEvents<HTMLDivElement> & {
  app: ReatRealtimeCursorApp;
  autoSignIn?: boolean;
  userName?: string;
  cursors?: {
    me?: {
      visible?: boolean;
    };
  };
};
```
