# API

## `initializeFirebaseApp` options

```ts
declare type FirebaseAppOptions = {
  database: Database;
  auth: Auth;
  roomId: string;
};
declare const initializeFirebaseApp: (
  options: FirebaseAppOptions
) => FirebaseApp;
```

## `ReatRealtimeCursorApp` props

```ts
declare type BackendType = "firebase" | "amplify";

declare type Props = MouseEvents<HTMLDivElement> & {
  firebaseApp?: FirebaseApp;
  amplifyRoomId?: string;
  autoSignIn?: boolean;
  userName?: string;
  cognitoUser?: CognitoUserAmplify;
  cursors?: {
    me?: {
      visible?: boolean;
    };
  };
  onMouseMove?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  style?: CSSProperties;
  useAbsolutePosition?: boolean;
  offsetX?: number;
  offsetY?: number;
  beforeSaveCurrentPosition?: (event: CursorChangeEvent) => CursorChangeEvent;
  beforeRenderOtherCursor?: OtherCursorProps["beforeRenderOtherCursor"];
  backendType?: BackendType;
  children?: React.ReactNode;
};
```
