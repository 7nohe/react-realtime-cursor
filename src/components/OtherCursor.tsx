import React, { useMemo } from "react";
import { getCursorPosition, getStyle } from "../libs/utils";
import { CursorData } from "../types";
import { Cursor } from "./Cursor";

type PositionData = Omit<CursorData, "id" | "comment" | "userName">;

export type OtherCursorProps = CursorData & {
  useAbsolutePosition: boolean;
  beforeRenderOtherCursor?: (data: PositionData) => PositionData;
};

export function OtherCursor(
  {
    id,
    ratioX,
    ratioY,
    comment,
    userName,
    offsetX,
    offsetY,
    useAbsolutePosition,
    x,
    y,
    beforeRenderOtherCursor,
  }: OtherCursorProps = {
    id: "0",
    ratioX: 0,
    ratioY: 0,
    offsetX: 0,
    offsetY: 0,
    useAbsolutePosition: false,
    x: 0,
    y: 0,
  }
) {
  ({ x, y } = useMemo(() => {
    if (useAbsolutePosition) {
      return {
        x,
        y,
      };
    }
    return getCursorPosition(ratioX, ratioY);
  }, [ratioX, ratioY, x, y, useAbsolutePosition]));
  if (beforeRenderOtherCursor) {
    ({ x, y, ratioX, ratioY, offsetX, offsetY } = beforeRenderOtherCursor({
      x,
      y,
      ratioX,
      ratioY,
      offsetX,
      offsetY,
    }));
  }
  return (
    <Cursor id={id} x={x} offsetX={offsetX} y={y} offsetY={offsetY}>
      {comment && comment?.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            minHeight: 30,
            boxSizing: "border-box",
            padding: "0px 20px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
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
              position: "relative",
              fontSize: 16,
              color: "#fff",
              padding: "10px 0",
              marginLeft: 15,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "fit-content",
                width: "fit-content",
                textAlign: "left",
              }}
            >
              {userName && (
                <div style={{ textAlign: "left", fontSize: 14 }}>
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
}
