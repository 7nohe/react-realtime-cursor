import React, {
  CSSProperties,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useCursors } from "../hooks/useCursors";
import { useMouseMove } from "../hooks/useMouseMove";
import { createFirebaseHandler } from "../libs/firebase/firebase";
import {
  CursorChangeEvent,
  MouseEvents,
  BackendType,
  FirebaseApp,
  AmplifyApp,
} from "../types";
import { MyCursor } from "./MyCursor";
import { OtherCursor, OtherCursorProps } from "./OtherCursor";
import "../styles/react-realtime-cursor.css";
import { getCursorPositionRatio } from "../libs/utils";
import { createAmplifyHandler } from "../libs/amplify/amplify";
import { CognitoUserAmplify } from "@aws-amplify/ui/dist/types/types/authenticator";

type Props = MouseEvents<HTMLDivElement> & {
  app: FirebaseApp | AmplifyApp;
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
  app,
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
  const handler = useMemo(() => {
    if (backendType === "firebase" && "database" in app) {
      return createFirebaseHandler(app, autoSignIn);
    }
    if (backendType === "amplify" && cognitoUser) {
      return createAmplifyHandler({ ...app, cognitoUser });
    }
    return;
  }, [app, autoSignIn]);
  const { cursors, handleCursor } = useCursors();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [myComment, setMyComment] = useState<string>("");
  const { pos, visible, setVisible, setPositionOnMouseMove } = useMouseMove(
    currentUserId,
    (e) => {
      if (beforeSaveCurrentPosition) {
        e = beforeSaveCurrentPosition(e);
      }
      handler?.onCursorPositionChanged(e);
    },
    userName,
    myComment
  );

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
      handler?.disconnect();
    };
  }, [currentUserId, handler, handleCursor]);

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
            handler?.onCursorPositionChanged({ ...data, ratioX, ratioY });
            setMyComment(data.comment ?? "");
          }}
        />
      )}
      {children}
    </div>
  );
};
