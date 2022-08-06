import { FirebaseApp } from "firebase/app";
import { Auth } from "firebase/auth";
import { Database, DatabaseReference } from "firebase/database";

export type ReatRealtimeCursorApp = {
    firebase: FirebaseApp;
    database: Database;
    roomId: string;
    roomRef: DatabaseReference;
    roomIdRef: DatabaseReference;
    auth: Auth;
};

export type CursorData = {
    id: string;
    x: number;
    y: number;
    userName?: string;
}


export type CursorHandler = {
    initialize: (currentUserId: string | null, onUserIdChanged: (userId: string | null) => void, handleCursor: (eventName: string, key: string | null, value: any) => void) => void;
    disconnect: () => void;
    onCursorPositionChanged: (data: CursorData) => void;
}