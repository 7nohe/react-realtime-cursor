import { useState } from "react";
import { getCursorPositionRatio, throttle } from "../libs/utils";
import { CursorChangeEvent } from "../types";

export const useMouseMove = (
  currentUserId: string | null | undefined,
  onCursorPositionChanged: (data: CursorChangeEvent) => void,
  userName?: string,
  comment?: string
) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const _onCursorPositionChanged = ({ x, y }: { x: number; y: number }) => {
    if (!currentUserId) {
      console.error(
        "Unable to save cursor positions because you are not logged in"
      );
      return;
    }
    const { ratioX, ratioY } = getCursorPositionRatio(x, y);
    onCursorPositionChanged({
      id: currentUserId,
      userName,
      comment,
      ratioX,
      ratioY,
      x,
      y,
    });
  };

  const throttlePositionChange = throttle(_onCursorPositionChanged, 20);

  const setPositionOnMouseMove = (e: { clientX: number; clientY: number }) => {
    if (!visible) {
      setVisible(true);
    }
    throttlePositionChange({ x: e.clientX, y: e.clientY });
    setPos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return {
    pos,
    setPos,
    visible,
    setVisible,
    setPositionOnMouseMove,
  };
};
