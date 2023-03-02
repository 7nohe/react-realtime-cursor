import React, { useEffect, useLayoutEffect, useState } from "react";
import { useCursors } from "../../hooks/useCursors";
import { MouseEvents, SupabaseApp, SupabaseCursorHandler } from "../../types";
import "../../styles/react-realtime-cursor.css";
import { Cursors, CursorsProps } from "../Cursors";

type Props = MouseEvents<HTMLDivElement> & {
  supabaseApp: SupabaseApp;
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
  supabaseApp,
  cursors: cursorsOption = { me: { visible: true } },
  ...props
}: Props) {
  const { cursors, handleCursor } = useCursors();
  const [handler, setHandler] = useState<SupabaseCursorHandler>();
  useEffect(() => {
    (async () => {
      const { createSupabaseHandler } = await import(
        "../../libs/supabase/handler"
      );
      setHandler(createSupabaseHandler(supabaseApp));
    })();
  }, [supabaseApp]);

  useEffect(() => {
    handler?.initialize(handleCursor);
  }, [handler, handleCursor]);

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
      cursorsOption={cursorsOption}
      currentUserId={supabaseApp.userId}
      scrollPosition={scrollPosition}
      cursorHandler={handler}
    />
  );
}
