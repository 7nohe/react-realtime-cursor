import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useCursors } from '../hooks/useCursors';
import { useMouseMove } from '../hooks/useMouseMove';
import { createFirebaseHandler } from '../libs/firebase';
import { ReatRealtimeCursorApp } from '../types';
import { MyCursor } from './MyCursor';
import { OtherCursor } from './OtherCursor';
import '../styles/react-realtime-cursor.css';
import { MouseEvents } from '../types';

type Props = MouseEvents<HTMLDivElement> & {
  app: ReatRealtimeCursorApp;
  autoSignIn?: boolean;
  userName?: string;
  cursors?: {
    me?: {
      visible?: boolean;
    };
  };
  onMouseMove?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  children?: React.ReactNode;
};

export const ReactRealtimeCursor = ({
  app,
  autoSignIn = true,
  userName = '',
  cursors: cursorsOption = { me: { visible: true } },
  onMouseMove,
  onMouseLeave,
  onMouseEnter,
  children,
  ...props
}: Props) => {
  // TODO: switch this handler by desired backend service
  const handler = useMemo(() => createFirebaseHandler(app, autoSignIn), [
    app,
    autoSignIn,
  ]);
  const { cursors, handleCursor } = useCursors();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [myComment, setMyComment] = useState<string>('');
  const { pos, visible, setVisible, setPositionOnMouseMove } = useMouseMove(
    currentUserId,
    handler.onCursorPositionChanged,
    userName,
    myComment
  );

  useEffect(() => {
    handler.initialize(
      currentUserId,
      userId => {
        setCurrentUserId(userId);
      },
      handleCursor
    );

    return () => {
      handler.disconnect();
    };
  }, [currentUserId, handler, handleCursor]);

  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={divRef}
      className="react-realtime-cursor"
      {...props}
      onMouseMove={e => {
        setPositionOnMouseMove(e);
        onMouseMove?.(e);
      }}
      onMouseLeave={e => {
        setVisible(false);
        onMouseLeave?.(e);
      }}
      onMouseEnter={e => {
        setVisible(true);
        onMouseEnter?.(e);
      }}
    >
      {Object.values(cursors).map(cursor => (
        <OtherCursor key={cursor.id} {...cursor} />
      ))}
      {cursorsOption?.me?.visible && currentUserId && (
        <MyCursor
          id={currentUserId}
          x={pos.x}
          y={pos.y}
          visible={visible}
          userName={userName}
          onCommentUpdated={data => {
            handler.onCursorPositionChanged(data);
            setMyComment(data.comment ?? '');
          }}
        />
      )}
      {children}
    </div>
  );
};
