import React, { useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { COLORS } from '../utils';

const CURSOR_SIZE = 16;
const CURSOR_STYLE = [
  { color: COLORS.red },
  { color: COLORS.red },
  { color: COLORS.pink },
  { color: COLORS.purple },
  { color: COLORS.orange },
  { color: COLORS.orange },
  { color: COLORS.yellow },
  { color: COLORS.yellow },
  { color: COLORS.green },
  { color: COLORS.blue },
];

const getStyle = (id?: string) => {
  const index = (id?.charCodeAt(0) || 0) % CURSOR_STYLE.length;
  return CURSOR_STYLE[index];
};

export const Cursor = ({ id, x, y } = { id: '0', x: 0, y: 0 }) => {
  const posX = useMotionValue(0);
  const posY = useMotionValue(0);

  useEffect(() => {
    posX.set(x - CURSOR_SIZE / 2);
  }, [x]);

  useEffect(() => {
    posY.set(y - CURSOR_SIZE / 2);
  }, [y]);

  return (
    <motion.div
      style={{
        y: posY,
        x: posX,
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        position: 'absolute',
        userSelect: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: "none"
      }}
    >
      <svg
        width={CURSOR_SIZE}
        height={CURSOR_SIZE}
        style={{ filter: "drop-shadow( 3px 3px 2px rgba(0, 0, 0, .5))", transform: "rotate(315deg)" }}
      >
        <path
          d={`M${CURSOR_SIZE/2} 0 L0 ${CURSOR_SIZE} L${CURSOR_SIZE} ${CURSOR_SIZE} Z`}
          fill={getStyle(id).color.default}
        />
      </svg>
    </motion.div>
  );
};
