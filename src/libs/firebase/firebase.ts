import { Auth } from "firebase/auth";
import { child, Database, ref } from "firebase/database";
import { FirebaseApp } from "../../types";

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
