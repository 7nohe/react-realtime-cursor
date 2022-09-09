import React from 'react';
import { CursorData } from '../types';
import { getStyle } from '../utils';
import { Cursor } from './Cursor';

type Props = CursorData;

export const OtherCursor = (
  { id, x, y, userName, comment }: Props = { id: '0', x: 0, y: 0 }
) => {
  return (
    <Cursor id={id} x={x} y={y}>
      {comment && comment?.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 16,
            left: 16,
            minHeight: 30,
            boxSizing: 'border-box',
            padding: '0px 20px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            maxWidth: 370,
            borderRadius: 30,
            borderTopLeftRadius: 0,
            backgroundColor: getStyle(id).color.default,
          }}
        >
          <div
            style={{
              minWidth: 160,
              borderRadius: 8,
              position: 'relative',
              fontSize: 16,
              color: '#fff',
              padding: '10px 0',
              marginLeft: 15,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: 'fit-content',
                width: 'fit-content',
                textAlign: 'left',
              }}
            >
              {userName && (
                <div style={{ textAlign: 'left', fontSize: 14 }}>
                  {userName}
                </div>
              )}
              {comment}
            </div>
          </div>
        </div>
      )}
    </Cursor>
  );
};
