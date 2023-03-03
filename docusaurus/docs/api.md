# API

## Firebase

### `initializeFirebaseApp`

```ts
type FirebaseAppOptions = {
  database: Database;
  auth: Auth;
  roomId: string;
};
export declare const initializeFirebaseApp: (
  options: FirebaseAppOptions
) => FirebaseApp;
```

### `ReactRealtimeCursor`

```ts
type Props = MouseEvents<HTMLDivElement> & {
  firebaseApp: FirebaseApp;
  autoSignIn?: boolean;
  cursors?: {
    me?: {
      visible?: boolean;
    };
  };
  userName?: string;
  onMouseMove?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  style?: CSSProperties;
  useAbsolutePosition?: boolean;
  offsetX?: number;
  offsetY?: number;
  beforeSaveCurrentPosition?: (event: CursorChangeEvent) => CursorChangeEvent;
  beforeRenderOtherCursor?: OtherCursorProps["beforeRenderOtherCursor"];
};
```

## Amplify

### `ReactRealtimeCursor`

```ts
type Props = MouseEvents<HTMLDivElement> & {
  amplifyRoomId?: string;
  cognitoUser?: CognitoUserAmplify;
  cursors?: {
    me?: {
      visible?: boolean;
    };
  };
  userName?: string;
  onMouseMove?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  style?: CSSProperties;
  useAbsolutePosition?: boolean;
  offsetX?: number;
  offsetY?: number;
  beforeSaveCurrentPosition?: (event: CursorChangeEvent) => CursorChangeEvent;
  beforeRenderOtherCursor?: OtherCursorProps["beforeRenderOtherCursor"];
};
```

## Supabase

### `ReactRealtimeCursor`

```ts
type Props = MouseEvents<HTMLDivElement> & {
  supabaseApp: SupabaseApp;
  cursors?: {
    me?: {
      visible?: boolean;
    };
  };
  userName?: string;
  onMouseMove?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  style?: CSSProperties;
  useAbsolutePosition?: boolean;
  offsetX?: number;
  offsetY?: number;
  beforeSaveCurrentPosition?: (event: CursorChangeEvent) => CursorChangeEvent;
  beforeRenderOtherCursor?: OtherCursorProps["beforeRenderOtherCursor"];
};
```
