import { FirebaseApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { child, get, getDatabase, off, onChildAdded, onChildChanged, onChildRemoved, onDisconnect, ref, set } from "firebase/database";
import { CursorData, CursorHandler, ReatRealtimeCursorApp } from "../types";

type FirebaseAppOptions = {
    firebaseApp: FirebaseApp;
    roomId: string;
};

export const initializeFirebaseApp: (options: FirebaseAppOptions) => ReatRealtimeCursorApp = (options) => {
    const firebase = options.firebaseApp;
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

export const createFirebaseHandler: (app: ReatRealtimeCursorApp, autoSignIn: boolean) => CursorHandler = ({ auth, roomRef, roomIdRef, roomId, database }, autoSignIn) => {
    return {
        initialize: (currentUserId: string | null, onUserIdChanged: (userId: string | null) => void, handleCursor: (eventName: string, key: string | null, value: any) => void) => {
            const init = async () => {
                // sign in anonymously if `autoSignIn` is enabled
                if (autoSignIn) {
                    const credential = await signInAnonymously(auth);
                    onUserIdChanged(credential.user.uid)
                }
            };

            init();

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    onUserIdChanged(user.uid);
                } else {
                    onUserIdChanged(null);
                }
            })

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
        },
        disconnect: () => {
            off(roomRef);
        },
        onCursorPositionChanged: (data: CursorData) => {

            const { x, y, id, userName } = data;

            set(child(roomIdRef, id), {
                id,
                x,
                y,
                userName
            });
            set(child(roomIdRef, id), {
                id,
                x,
                y,
                userName
            });
            onDisconnect(child(roomIdRef, id)).remove();
        }
    }
}