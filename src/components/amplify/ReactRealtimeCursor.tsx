import React, { useEffect, useLayoutEffect, useState } from "react";
import { useCursors } from "../../hooks/useCursors";
import { MouseEvents, CursorHandler, CognitoUserAmplify } from "../../types";
import "../../styles/react-realtime-cursor.css";
import { Cursors, CursorsProps } from "../Cursors";

type Props = MouseEvents<HTMLDivElement> & {
  amplifyRoomId?: string;
  cognitoUser?: CognitoUserAmplify;
  cursors?: {
    me?: {
      visible?: boolean;
    };
  };
} & Omit<
    CursorsProps,
    | "currentUserId"
    | "cursorHandler"
    | "scrollPosition"
    | "cursorsOption"
    | "cursors"
  >;

export function ReactRealtimeCursor({
  amplifyRoomId = "MyRoom",
  cognitoUser,
  cursors: cursorsOption = { me: { visible: true } },
  ...props
}: Props) {
  const { cursors, handleCursor } = useCursors();
  const [handler, setHandler] = useState<CursorHandler>();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (cognitoUser && amplifyRoomId) {
        const { createAmplifyHandler } = await import(
          "../../libs/amplify/handler"
        );
        setHandler(
          createAmplifyHandler({
            roomId: amplifyRoomId,
            cognitoUser,
          })
        );
      }
    })();
  }, [cognitoUser, amplifyRoomId]);

  useEffect(() => {
    let disconnect: (() => void) | undefined;
    const init = async () => {
      const res = await handler?.initialize(
        currentUserId,
        (userId) => {
          setCurrentUserId(userId);
        },
        handleCursor
      );
      disconnect = res?.disconnect;
    };

    init();

    return () => {
      disconnect?.();
      handler?.disconnect?.();
    };
  }, [currentUserId, handler, handleCursor]);

  const [scrollPosition, setPosition] = useState({ x: 0, y: 0 });
  useLayoutEffect(() => {
    const updatePosition = () => {
      setPosition({ y: window.scrollY, x: window.scrollX });
    };
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return (
    <Cursors
      {...props}
      cursors={cursors}
      currentUserId={currentUserId}
      scrollPosition={scrollPosition}
      cursorHandler={handler}
    />
  );
}
