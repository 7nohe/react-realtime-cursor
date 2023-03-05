import React, { CSSProperties, useState } from "react";
import { useMouseMove } from "../hooks/useMouseMove";
import { getCursorPositionRatio } from "../libs/utils";
import {
  AmplifyCursorHandler,
  CursorChangeEvent,
  CursorData,
  FirebaseCursorHandler,
  MouseEvents,
  SupabaseCursorHandler,
} from "../types";
import { MyCursor } from "./MyCursor";
import { OtherCursor, OtherCursorProps } from "./OtherCursor";

export type CursorsProps = MouseEvents<HTMLDivElement> & {
  userName?: string;
  cursorsOption?: {
    me?: {
      visible?: boolean;
    };
  };
  cursors: Record<string, CursorData>;
  onMouseMove?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  style?: CSSProperties;
  useAbsolutePosition?: boolean;
  offsetX?: number;
  offsetY?: number;
  beforeSaveCurrentPosition?: (event: CursorChangeEvent) => CursorChangeEvent;
  beforeRenderOtherCursor?: OtherCursorProps["beforeRenderOtherCursor"];
  children?: React.ReactNode;
  cursorHandler?:
    | FirebaseCursorHandler
    | SupabaseCursorHandler
    | AmplifyCursorHandler;
  currentUserId: string | null | undefined;
  scrollPosition: {
    x: number;
    y: number;
  };
};

export function Cursors({
  userName = "",
  cursorsOption = { me: { visible: true } },
  cursors,
  onMouseMove,
  onMouseLeave,
  onMouseEnter,
  useAbsolutePosition = false,
  offsetX,
  offsetY,
  beforeSaveCurrentPosition,
  beforeRenderOtherCursor,
  children,
  cursorHandler,
  currentUserId,
  scrollPosition,
  ...props
}: CursorsProps) {
  const [myComment, setMyComment] = useState<string>("");
  const { pos, visible, setVisible, setPositionOnMouseMove } = useMouseMove(
    currentUserId,
    (e) => {
      if (beforeSaveCurrentPosition) {
        e = beforeSaveCurrentPosition(e);
      }
      cursorHandler?.onCursorPositionChanged(e);
    },
    userName,
    myComment
  );
  return (
    <div
      className="react-realtime-cursor"
      {...props}
      onMouseMove={(e) => {
        setPositionOnMouseMove(e);
        onMouseMove?.(e);
      }}
      onMouseLeave={(e) => {
        setVisible(false);
        onMouseLeave?.(e);
      }}
      onMouseEnter={(e) => {
        setVisible(true);
        onMouseEnter?.(e);
      }}
    >
      {Object.values(cursors).map((cursor) => (
        <OtherCursor
          key={cursor.id}
          {...cursor}
          useAbsolutePosition={useAbsolutePosition}
          offsetX={scrollPosition.x}
          offsetY={scrollPosition.y}
          beforeRenderOtherCursor={beforeRenderOtherCursor}
        />
      ))}
      {cursorsOption?.me?.visible && currentUserId && (
        <MyCursor
          id={currentUserId}
          x={pos.x}
          y={pos.y}
          offsetX={scrollPosition.x}
          offsetY={scrollPosition.y}
          visible={visible}
          userName={userName}
          onCommentUpdated={(data) => {
            const { ratioX, ratioY } = getCursorPositionRatio(data.x, data.y);
            cursorHandler?.onCursorPositionChanged({
              ...data,
              ratioX,
              ratioY,
            });
            setMyComment(data.comment ?? "");
          }}
        />
      )}
      {children}
    </div>
  );
}
