import { Auth } from "firebase/auth";
import { Database, DatabaseReference } from "firebase/database";
import { DOMAttributes } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import type { SupabaseClient } from "@supabase/supabase-js";

export type FirebaseApp = {
  database: Database;
  roomId: string;
  roomRef: DatabaseReference;
  roomIdRef: DatabaseReference;
  auth: Auth;
};

export type AmplifyApp = {
  roomId: string;
  cognitoUser: CognitoUserAmplify;
};

export type SupabaseApp = {
  roomId: string;
  client: SupabaseClient;
  userId: string;
};

export type CursorData = {
  id: string;
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
  ratioX: number;
  ratioY: number;
  userName?: string;
  comment?: string;
};

export type CursorChangeEvent = Omit<CursorData, "offsetX" | "offsetY"> & {
  ratioX: number;
  ratioY: number;
};

export type SupabaseCursorHandler = {
  initialize: (
    handleCursor: (eventName: string, key: string | null, value: any) => void
  ) => void;
  onCursorPositionChanged: (event: CursorChangeEvent) => void;
};

export type AmplifyCursorHandler = {
  initialize: (
    handleCursor: (eventName: string, key: string | null, value: any) => void
  ) => Promise<{ disconnect: () => void } | undefined>;
  onCursorPositionChanged: (event: CursorChangeEvent) => void;
};

export type FirebaseCursorHandler = {
  initialize: (
    currentUserId: string | null,
    onUserIdChanged: (userId: string | null) => void,
    handleCursor: (eventName: string, key: string | null, value: any) => void
  ) => Promise<{ disconnect: () => void } | undefined>;
  disconnect?: () => void;
  onCursorPositionChanged: (event: CursorChangeEvent) => void;
};

export type MouseEvents<T> = Pick<
  DOMAttributes<T>,
  | "onAuxClick"
  | "onAuxClickCapture"
  | "onClick"
  | "onClickCapture"
  | "onContextMenu"
  | "onContextMenuCapture"
  | "onDoubleClick"
  | "onDoubleClickCapture"
  | "onDrag"
  | "onDragCapture"
  | "onDragEnd"
  | "onDragEndCapture"
  | "onDragEnter"
  | "onDragEnterCapture"
  | "onDragExit"
  | "onDragExitCapture"
  | "onDragLeave"
  | "onDragLeaveCapture"
  | "onDragOver"
  | "onDragOverCapture"
  | "onDragStart"
  | "onDragStartCapture"
  | "onDrop"
  | "onDropCapture"
  | "onMouseDown"
  | "onMouseDownCapture"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onMouseMove"
  | "onMouseMoveCapture"
  | "onMouseOut"
  | "onMouseOutCapture"
  | "onMouseOver"
  | "onMouseOverCapture"
  | "onMouseUp"
  | "onMouseUpCapture"
>;

export type BackendType = "firebase" | "amplify";

interface CognitoAttributes {
  email: string;
  phone_number: string;
  [key: string]: string;
}
/** Cognito User Interface */
export interface CognitoUserAmplify extends CognitoUser {
  username?: string;
  attributes?: CognitoAttributes;
}
