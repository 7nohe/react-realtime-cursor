import { Auth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import {
  child,
  Database,
  get,
  off,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  onDisconnect,
  ref,
  set,
} from "firebase/database";
import { CursorHandler, FirebaseApp } from "../../types";

type FirebaseAppOptions = {
  database: Database;
  auth: Auth;
  roomId: string;
};

export const initializeFirebaseApp: (
  options: FirebaseAppOptions
) => FirebaseApp = (options) => {
  const { database, auth, roomId } = options;
  const roomRef = ref(database, "roomId");
  const roomIdRef = child(roomRef, roomId);
  return {
    database,
    roomId,
    roomRef,
    roomIdRef,
    auth,
  };
};

export const createFirebaseHandler: (
  app: FirebaseApp,
  autoSignIn: boolean
) => CursorHandler = (
  { auth, roomRef, roomIdRef, roomId, database },
  autoSignIn
) => {
  return {
    initialize: async (
      currentUserId: string | null,
      onUserIdChanged: (userId: string | null) => void,
      handleCursor: (eventName: string, key: string | null, value: any) => void
    ) => {
      const init = async () => {
        // sign in anonymously if `autoSignIn` is enabled
        if (autoSignIn) {
          const credential = await signInAnonymously(auth);
          onUserIdChanged(credential.user.uid);
        }
      };

      await init();

      onAuthStateChanged(auth, (user) => {
        if (user) {
          onUserIdChanged(user.uid);
        } else {
          onUserIdChanged(null);
        }
      });

      if (!currentUserId) return;

      get(roomRef).then((snapshot) => {
        snapshot.forEach((item) => {
          Object.values(item.val()).forEach((value: any) => {
            if (value.id === currentUserId) {
              return;
            }
            handleCursor("add", value.id, value);
          });
        });
      });

      const unsubscribeOnChildAdded = onChildAdded(
        ref(database, "roomId/" + roomId),
        (snapshot) => {
          if (snapshot.key === currentUserId) {
            return;
          }
          handleCursor("add", snapshot.key, snapshot.val());
        }
      );

      const unsubscribeOnChildChanged = onChildChanged(
        ref(database, "roomId/" + roomId),
        (snapshot) => {
          if (snapshot.key === currentUserId) {
            return;
          }
          handleCursor("change", snapshot.key, snapshot.val());
        }
      );

      const unsubscriveOnChildRemoved = onChildRemoved(
        ref(database, "roomId/" + roomId),
        (snapshot) => {
          if (snapshot.key === currentUserId) {
            return;
          }
          handleCursor("remove", snapshot.key, snapshot.val());
        }
      );
      return {
        disconnect: () => {
          unsubscribeOnChildAdded();
          unsubscribeOnChildChanged();
          unsubscriveOnChildRemoved();
        },
      };
    },
    disconnect: () => {
      off(roomRef);
    },
    onCursorPositionChanged: (data) => {
      const { id } = data;
      set(child(roomIdRef, id), data);
      onDisconnect(child(roomIdRef, id)).remove();
    },
  };
};
