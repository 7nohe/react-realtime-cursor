import React, { useEffect, useState } from 'react';
import { useCursors } from '../hooks/useCursors';
import { useMouseMove } from '../hooks/useMouseMove';
import { createFirebaseHandler } from '../libs/firebase';
import { ReatRealtimeCursorApp } from '../types';
import { MyCursor } from './MyCursor';
import { OtherCursor } from './OtherCursor';

type Props = {
  app: ReatRealtimeCursorApp;
  autoSignIn?: boolean;
  userName?: string;
};

export const ReactRealtimeCursor = ({ app, autoSignIn = true, userName = '' }: Props) => {
  // TODO: switch this handler by desired backend service
  const handler = createFirebaseHandler(app, autoSignIn)
  const { cursors, handleCursor } = useCursors()
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [myComment, setMyComment] = useState<string>('');
  const { pos, visible, setVisible, onMouseMove } = useMouseMove(currentUserId, handler.onCursorPositionChanged, userName, myComment)

  useEffect(() => {
    handler.initialize(currentUserId, (userId) => {
      setCurrentUserId(userId);
    }, handleCursor);

    return () => {
      handler.disconnect();
    };
  }, [currentUserId]);

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseLeave={() => setVisible(false)}
      onMouseEnter={() => setVisible(true)}
      style={styles.container}
    >
      {Object.values(cursors).map(cursor => (
        <OtherCursor key={cursor.id} {...cursor} />
      ))}
      {currentUserId && <MyCursor id={currentUserId} x={pos.x} y={pos.y} visible={visible} userName={userName} onCommentUpdated={(data) => {
        handler.onCursorPositionChanged(data)
        setMyComment(data.comment ?? '')
      }} />}
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    backgroundColor: 'clear',
    overflow: 'hidden',
    cursor: 'none',
  }
}