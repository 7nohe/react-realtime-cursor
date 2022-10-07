import React, {
  CSSProperties,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useCursors } from "../hooks/useCursors";
import { useMouseMove } from "../hooks/useMouseMove";
import {
  CursorChangeEvent,
  MouseEvents,
  BackendType,
  FirebaseApp,
  CursorHandler,
} from "../types";
import { MyCursor } from "./MyCursor";
import { OtherCursor, OtherCursorProps } from "./OtherCursor";
import "../styles/react-realtime-cursor.css";
import { getCursorPositionRatio } from "../libs/utils";
import { CognitoUserAmplify } from "@aws-amplify/ui/dist/types/types/authenticator";

type Props = MouseEvents<HTMLDivElement> & {
  firebaseApp?: FirebaseApp;
  amplifyRoomId?: string;
  autoSignIn?: boolean;
  userName?: string;
  cognitoUser?: CognitoUserAmplify;
  cursors?: {
    me?: {
      visible?: boolean;
    };
  };
  onMouseMove?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  style?: CSSProperties;
  useAbsolutePosition?: boolean;
  offsetX?: number;
  offsetY?: number;
  beforeSaveCurrentPosition?: (event: CursorChangeEvent) => CursorChangeEvent;
  beforeRenderOtherCursor?: OtherCursorProps["beforeRenderOtherCursor"];
  backendType?: BackendType;
  children?: React.ReactNode;
};

export const ReactRealtimeCursor = ({
  firebaseApp,
  amplifyRoomId = "MyRoom",
  autoSignIn = true,
  userName = "",
  cognitoUser,
  cursors: cursorsOption = { me: { visible: true } },
  onMouseMove,
  onMouseLeave,
  onMouseEnter,
  useAbsolutePosition = false,
  offsetX,
  offsetY,
  beforeSaveCurrentPosition,
  beforeRenderOtherCursor,
  backendType = "firebase",
  children,
  ...props
}: Props) => {
  const handlerRef = useRef<CursorHandler>();
  const { cursors, handleCursor } = useCursors();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [myComment, setMyComment] = useState<string>("");
  const { pos, visible, setVisible, setPositionOnMouseMove } = useMouseMove(
    currentUserId,
    (e) => {
      if (beforeSaveCurrentPosition) {
        e = beforeSaveCurrentPosition(e);
      }
      handlerRef.current?.onCursorPositionChanged(e);
    },
    userName,
    myComment
  );

  useEffect(() => {
    (async () => {
      if (backendType === "firebase" && firebaseApp) {
        const { createFirebaseHandler } = await import(
          "../libs/firebase/handler"
        );
        handlerRef.current = createFirebaseHandler(firebaseApp, autoSignIn);
      }
      if (backendType === "amplify" && cognitoUser && amplifyRoomId) {
        const { createAmplifyHandler } = await import(
          "../libs/amplify/handler"
        );
        handlerRef.current = createAmplifyHandler({
          roomId: amplifyRoomId,
          cognitoUser,
        });
      }
    })();
  }, [firebaseApp, autoSignIn, cognitoUser, amplifyRoomId]);

  useEffect(() => {
    let disconnect: (() => void) | undefined;
    const init = async () => {
      const res = await handlerRef.current?.initialize(
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
      handlerRef.current?.disconnect?.();
    };
  }, [currentUserId, handlerRef.current, handleCursor]);

  const divRef = useRef<HTMLDivElement>(null);

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
    <div
      ref={divRef}
      className="react-realtime-cursor"
      {...props}
      onMouseMove={(e) => {
        setPositionOnMouseMove(e);
        onMouseMove?.(e);
      }}
      onMouseLeave={(e) => {
        setVisible(false);
        onMouseLeave?.(e);
      }}
      onMouseEnter={(e) => {
        setVisible(true);
        onMouseEnter?.(e);
      }}
    >
      {Object.values(cursors).map((cursor) => (
        <OtherCursor
          key={cursor.id}
          {...cursor}
          useAbsolutePosition={useAbsolutePosition}
          offsetX={scrollPosition.x}
          offsetY={scrollPosition.y}
          beforeRenderOtherCursor={beforeRenderOtherCursor}
        />
      ))}
      {cursorsOption?.me?.visible && currentUserId && (
        <MyCursor
          id={currentUserId}
          x={pos.x}
          y={pos.y}
          offsetX={scrollPosition.x}
          offsetY={scrollPosition.y}
          visible={visible}
          userName={userName}
          onCommentUpdated={(data) => {
            const { ratioX, ratioY } = getCursorPositionRatio(data.x, data.y);
            handlerRef.current?.onCursorPositionChanged({
              ...data,
              ratioX,
              ratioY,
            });
            setMyComment(data.comment ?? "");
          }}
        />
      )}
      {children}
    </div>
  );
};
