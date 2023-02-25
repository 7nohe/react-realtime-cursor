import React, { useMemo } from "react";
import { CursorData } from "../types";
import { CURSOR_HEIGHT, CURSOR_WIDTH } from "../const";
import { getStyle } from "../libs/utils";

export type CursorProps = Omit<CursorData, "ratioX" | "ratioY"> & {
  children?: React.ReactNode;
  x: number;
  y: number;
  color?: string;
};

export function Cursor(
  { id, x, y, offsetX, offsetY, children, color }: CursorProps = {
    id: "0",
    x: 0,
    y: 0,
    offsetX: 0,
    offsetY: 0,
  }
) {
  const defaultColor = useMemo(() => getStyle(id).color.default, [id]);
  return (
    <div
      style={{
        top: y + offsetY,
        left: x + offsetX - 2,
        width: CURSOR_WIDTH,
        height: CURSOR_HEIGHT,
        position: "absolute",
        userSelect: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "none",
        pointerEvents: "none",
        zIndex: 999999999,
      }}
    >
      <svg
        width={CURSOR_WIDTH}
        height={CURSOR_HEIGHT}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_103_28)">
          <path
            d="M2.64616 0.738445C2.56143 0.333479 2.99494 0.0185095 3.35391 0.224235L17.658 8.42208C18.022 8.63067 17.9615 9.17306 17.5606 9.29639L10.618 11.432C10.5105 11.4651 10.418 11.5349 10.3568 11.6292L6.88216 16.9817C6.64914 17.3407 6.0983 17.2377 6.01065 16.8188L2.64616 0.738445Z"
            fill={color ?? defaultColor}
          />
          <path
            d="M6.48987 16.6677L3.14491 0.680752L17.3684 8.83239L10.471 10.9541C10.2514 11.0217 10.0625 11.1643 9.93741 11.357L6.48987 16.6677Z"
            stroke="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_103_28"
            x="0.635422"
            y="0.15947"
            width="19.2637"
            height="21.0409"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_103_28"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_103_28"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
      {children}
    </div>
  );
}
