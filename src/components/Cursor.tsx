import React from 'react';
import { CursorData } from '../types';
import { CURSOR_SIZE } from '../const';
import { getStyle } from '../utils';

type Props = CursorData & { children?: React.ReactNode };

export const Cursor = (
  { id, x, y, children }: Props = { id: '0', x: 0, y: 0 }
) => {
  return (
    <div
      style={{
        top: y,
        left: x,
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        position: 'absolute',
        userSelect: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'none',
        pointerEvents: 'none',
      }}
    >
      <svg
        width={CURSOR_SIZE}
        height={CURSOR_SIZE}
        style={{
          filter: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .5))',
          transform: 'rotate(315deg)',
        }}
      >
        <path
          d={`M${CURSOR_SIZE /
            2} 0 L0 ${CURSOR_SIZE} L${CURSOR_SIZE} ${CURSOR_SIZE} Z`}
          fill={getStyle(id).color.default}
        />
      </svg>
      {children}
    </div>
  );
};
