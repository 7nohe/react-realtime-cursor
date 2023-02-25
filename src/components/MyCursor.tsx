import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { getStyle } from "../libs/utils";
import { Cursor, CursorProps } from "./Cursor";

type Props = CursorProps & {
  visible: boolean;
  onCommentUpdated?: (data: CursorProps) => void;
};

const defaultInputWidth = 144;
const defaultInputHeight = 48;
const maxInputWidth = 250;

export function MyCursor({
  visible = true,
  onCommentUpdated,
  ...props
}: Props) {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputWidth, setInputWidth] = useState(defaultInputWidth);
  const [inputHeight, setInputHeight] = useState(defaultInputHeight);
  const [maxWidthReached, setMaxWidthReaced] = useState(false);
  const span = useRef<HTMLDivElement>(null);

  const spanHeight = span?.current?.offsetHeight ?? 0;
  const spanWidth = span?.current?.offsetWidth ?? 0;

  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const inputValue = e.target.value;
      if (inputValue === "/") {
        return;
      }

      if (
        spanWidth <= maxInputWidth &&
        spanWidth >= defaultInputWidth &&
        !maxWidthReached
      ) {
        setInputWidth(spanWidth);
      }

      if (spanWidth >= maxInputWidth && !maxWidthReached) {
        setMaxWidthReaced(true);
      }

      if (spanWidth >= maxInputWidth || spanHeight >= defaultInputHeight) {
        setInputHeight(spanHeight);
      }
      setInputValue(inputValue);
      onCommentUpdated?.({ ...props, comment: inputValue });
    },
    [props, onCommentUpdated, maxWidthReached, spanHeight, spanWidth]
  );

  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      if (e.code === "Slash") {
        setShowInput(true);
      }

      if (e.code === "Escape") {
        setShowInput(false);
        setInputValue("");
        setInputWidth(defaultInputWidth);
        setInputHeight(defaultInputHeight);
        setMaxWidthReaced(false);
        onCommentUpdated?.({ ...props, comment: "" });
      }
    };

    document.addEventListener("keydown", keydown);

    return () => {
      document.removeEventListener("keydown", keydown);
    };
  }, [props, onCommentUpdated]);

  if (!visible) {
    return null;
  }

  return (
    <Cursor {...props} color="#000000">
      {showInput && (
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            boxSizing: "border-box",
            padding: "10px 20px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
            borderTopLeftRadius: 0,
            backgroundColor: getStyle(props.id).color.default,
          }}
        >
          <div
            style={{
              width: inputWidth,
              height: inputHeight,
              borderRadius: 8,
              position: "relative",
              fontSize: 16,
              color: "#fff",
              padding: "5px 0",
              marginLeft: 15,
            }}
          >
            <div
              style={{
                position: "absolute",
                maxWidth: maxInputWidth,
                minWidth: defaultInputWidth,
                minHeight: defaultInputHeight,
                display: "block",
                textAlign: "left",
                wordWrap: "break-word",
                wordBreak: "keep-all",
                whiteSpace: maxWidthReached ? "pre-wrap" : "pre",
                visibility: "hidden",
                fontSize: "inherit",
                fontFamily: "inherit",
                lineHeight: "inherit",
                fontWeight: "inherit",
              }}
              ref={span}
            >
              {inputValue}{" "}
            </div>
            <textarea
              autoFocus
              placeholder="Say something"
              value={inputValue}
              onChange={onChangeInput}
              className="react-realtime-cursor_chat-textarea"
              style={{
                width: inputWidth,
                height: inputHeight,
                position: "absolute",
                backgroundColor: "inherit",
                wordBreak: "keep-all",
                whiteSpace: maxWidthReached ? "pre-wrap" : "pre",
                left: 0,
                top: 0,
                outline: 0,
                border: 0,
                margin: 0,
                fontSize: "inherit",
                fontWeight: "inherit",
                fontFamily: "inherit",
                resize: "none",
                lineHeight: "inherit",
              }}
            />
          </div>
        </div>
      )}
    </Cursor>
  );
}
