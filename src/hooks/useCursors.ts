import { useState } from "react";
import { CursorData } from "../types";

export const useCursors = () => {
    const [cursors, setCursors] = useState<
    Record<string, CursorData>
  >({});

  const handleCursor = (
    event: string,
    userId: string | null,
    posData?: any
  ) => {
    if (!userId) {
      return;
    }

    switch (event) {
      case 'add':
      case 'change':
        setCursors(prev => {
          const copied = { ...prev };
          copied[userId] = posData;
          return copied;
        });
        break;
      case 'remove':
        setCursors(prev => {
          const { [userId]: _, ...rest } = prev;
          return rest;
        });
        break;
      default:
        break;
    }
  };

  return {
    cursors,
    setCursors,
    handleCursor
  }
}