import { useCallback, useState } from "react";
import { CursorData } from "../types";
import { throttle } from "../utils";

export const useMouseMove = (currentUserId: string | null, onCursorPositionChanged: (data: CursorData) => void, userName?: string, comment?: string) => {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);

    const _onCursorPositionChanged = useCallback(
        ({ x, y }: { x: number; y: number }) => {
          if (!currentUserId) {
            console.error('Unable to save cursor positions because you are not logged in')
            return;
          }
          onCursorPositionChanged({ id: currentUserId, x, y, userName, comment })
        },
        [currentUserId, userName, comment]
      );
    
      const throttlePositionChange = useCallback(
        throttle(_onCursorPositionChanged, 20),
        [onCursorPositionChanged]
      );
    
      const onMouseMove = (e: { clientX: number; clientY: number }) => {
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
        onMouseMove
      }
}
