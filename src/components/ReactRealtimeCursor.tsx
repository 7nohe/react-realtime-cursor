import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { Auth, getAuth, signInAnonymously } from 'firebase/auth';
import {
  child,
  Database,
  DatabaseReference,
  get,
  getDatabase,
  off,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  onDisconnect,
  ref,
  set,
} from 'firebase/database';
import React, { useCallback, useEffect, useState } from 'react';
import { throttle } from '../utils';
import { Cursor } from './Cursor';

type ReactRealtimeCursorOptions = {
  firebaseConfig: FirebaseOptions;
  roomId: string;
};

type RRCApp = {
  firebase: FirebaseApp;
  database: Database;
  roomId: string;
  roomRef: DatabaseReference;
  roomIdRef: DatabaseReference;
  auth: Auth;
};

export const initializeRRCApp = (options: ReactRealtimeCursorOptions) => {
  const firebase = initializeApp(options.firebaseConfig);
  const database = getDatabase(firebase);
  const roomId = options.roomId;
  const roomRef = ref(database, 'roomId');
  const roomIdRef = child(roomRef, roomId);
  const auth = getAuth(firebase);
  return {
    firebase,
    database,
    roomId,
    roomRef,
    roomIdRef,
    auth,
  };
};

type Props = {
  app: RRCApp;
};

export const ReactRealtimeCursor = ({ app }: Props) => {
  const { roomId, roomIdRef, database, roomRef, auth } = app;
  const [cursors, setCursors] = useState<
    Record<string, { id: string; x: number; y: number }>
  >({});
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [currentUserId, setCurrentUserId] = useState<string>();

  const onCursorPositionChanged = useCallback(
    ({ x, y }: { x: number; y: number }) => {
      if (!currentUserId) {
        return;
      }

      set(child(roomIdRef, currentUserId), {
        id: currentUserId,
        x,
        y,
      });
      set(child(roomIdRef, currentUserId), {
        id: currentUserId,
        x,
        y,
      });
      onDisconnect(child(roomIdRef, currentUserId)).remove();
    },
    [currentUserId]
  );

  const throttlePositionChange = useCallback(
    throttle(onCursorPositionChanged, 20),
    [onCursorPositionChanged]
  );

  const onMouseMove = (e: { clientX: number; clientY: number }) => {
    if (!visible) {
      setVisible(true);
    }
    throttlePositionChange({ x: e.clientX, y: e.clientY });
    setPos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleCursor = (
    event: string,
    userId: string | null,
    posData?: any
  ) => {
    if (!userId) {
      return;
    }

    switch (event) {
      case 'add':
      case 'change':
        setCursors(prev => {
          const copied = { ...prev };
          copied[userId] = posData;
          return copied;
        });
        break;
      case 'remove':
        setCursors(prev => {
          const { [userId]: _, ...rest } = prev;
          return rest;
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const init = async () => {
      const credential = await signInAnonymously(auth);
      setCurrentUserId(credential.user.uid);
    };

    init();

    get(roomRef).then(snapshot => {
      snapshot.forEach(item => {
        Object.values(item.val()).forEach((value: any) => {
          if (value.id === currentUserId) {
            return;
          }
          handleCursor('add', value.id, value);
        });
      });
    });

    onChildAdded(ref(database, 'roomId/' + roomId), snapshot => {
      if (snapshot.key === currentUserId) {
        return;
      }
      handleCursor('add', snapshot.key, snapshot.val());
    });

    onChildChanged(ref(database, 'roomId/' + roomId), snapshot => {
      if (snapshot.key === currentUserId) {
        return;
      }
      handleCursor('change', snapshot.key, snapshot.val());
    });

    onChildRemoved(ref(database, 'roomId/' + roomId), snapshot => {
      if (snapshot.key === currentUserId) {
        return;
      }
      handleCursor('remove', snapshot.key, snapshot.val());
    });

    return () => {
      off(roomRef);
    };
  }, []);

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseLeave={() => setVisible(false)}
      onMouseEnter={() => setVisible(true)}
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: 'clear',
        overflow: 'hidden',
        cursor: 'none',
      }}
    >
      {Object.values(cursors).map(cursor => (
        <Cursor key={cursor.id} id={cursor.id} x={cursor.x} y={cursor.y} />
      ))}
      {visible && <Cursor id={currentUserId || ''} x={pos.x} y={pos.y} />}
    </div>
  );
};
