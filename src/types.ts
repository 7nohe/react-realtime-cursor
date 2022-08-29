import { Auth } from 'firebase/auth';
import { Database, DatabaseReference } from 'firebase/database';
import { DOMAttributes } from 'react';

export type ReatRealtimeCursorApp = {
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
  comment?: string;
};

export type CursorHandler = {
  initialize: (
    currentUserId: string | null,
    onUserIdChanged: (userId: string | null) => void,
    handleCursor: (eventName: string, key: string | null, value: any) => void
  ) => void;
  disconnect: () => void;
  onCursorPositionChanged: (data: CursorData) => void;
};

export type MouseEvents<T> = Pick<
  DOMAttributes<T>,
  | 'onAuxClick'
  | 'onAuxClickCapture'
  | 'onClick'
  | 'onClickCapture'
  | 'onContextMenu'
  | 'onContextMenuCapture'
  | 'onDoubleClick'
  | 'onDoubleClickCapture'
  | 'onDrag'
  | 'onDragCapture'
  | 'onDragEnd'
  | 'onDragEndCapture'
  | 'onDragEnter'
  | 'onDragEnterCapture'
  | 'onDragExit'
  | 'onDragExitCapture'
  | 'onDragLeave'
  | 'onDragLeaveCapture'
  | 'onDragOver'
  | 'onDragOverCapture'
  | 'onDragStart'
  | 'onDragStartCapture'
  | 'onDrop'
  | 'onDropCapture'
  | 'onMouseDown'
  | 'onMouseDownCapture'
  | 'onMouseEnter'
  | 'onMouseLeave'
  | 'onMouseMove'
  | 'onMouseMoveCapture'
  | 'onMouseOut'
  | 'onMouseOutCapture'
  | 'onMouseOver'
  | 'onMouseOverCapture'
  | 'onMouseUp'
  | 'onMouseUpCapture'
>;
