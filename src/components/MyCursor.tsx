import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CursorData } from '../types';
import { getStyle } from '../utils';
import { Cursor } from './Cursor';

type Props = CursorData & {
  visible: boolean;
  onCommentUpdated?: (data: CursorData) => void;
};

const defaultInputWidth = 128;
const defaultInputHeight = 48;
const maxInputWidth = 250;

export const MyCursor = ({
  visible = true,
  onCommentUpdated,
  ...props
}: Props) => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputWidth, setInputWidth] = useState(defaultInputWidth);
  const [inputHeight, setInputHeight] = useState(defaultInputHeight);
  const span = useRef<HTMLDivElement>(null);

  const spanHeight = span?.current?.offsetHeight ?? 0;
  const spanWidth = span?.current?.offsetWidth ?? 0;


  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const inputValue = e.target.value;
      if (inputValue === '/') {
        return;
      }

      if (spanWidth <= maxInputWidth && spanWidth >= defaultInputWidth) {
          setInputWidth(spanWidth);
      }
  
      if (spanWidth >= maxInputWidth || spanHeight >= defaultInputHeight) {
        setInputHeight(spanHeight);
      }
      setInputValue(inputValue);
      onCommentUpdated?.({ ...props, comment: inputValue });
    },
    [props, onCommentUpdated]
  );

  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      if (e.code === 'Slash') {
        setShowInput(true);
      }

      if (e.code === 'Escape') {
        setShowInput(false);
        setInputValue('');
        setInputWidth(defaultInputWidth);
        setInputHeight(defaultInputHeight);
        onCommentUpdated?.({ ...props, comment: '' });
      }
    };

    document.addEventListener('keydown', keydown);

    return () => {
      document.removeEventListener('keydown', keydown);
    };
  }, [props, onCommentUpdated]);

  if (!visible) {
    return null;
  }

  return (
    <Cursor {...props}>
      {showInput && (
        <div
          style={{
            position: 'absolute',
            top: 16,
            left: 16,
            boxSizing: 'border-box',
            padding: '0px 20px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
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
              position: 'relative',
              fontSize: 16,
              color: '#fff',
              padding: '5px 0',
              marginLeft: 15,
            }}
          >
            <div
              style={{
                position: 'absolute',
                maxWidth: maxInputWidth,
                minWidth: defaultInputWidth,
                minHeight: defaultInputHeight,
                display: 'block',
                textAlign: 'left',
                wordWrap: 'break-word',
                wordBreak: 'keep-all',
                whiteSpace: 'pre-wrap',
                visibility: 'hidden',
                fontSize: 'inherit',
                fontFamily: 'inherit',
                lineHeight: 'inherit',
              }}
              ref={span}
            >
              {inputValue}{' '}
            </div>
            <textarea
              autoFocus
              placeholder="Say something"
              value={inputValue}
              onChange={onChangeInput}
              style={{
                width: inputWidth,
                height: inputHeight,
                position: 'absolute',
                backgroundColor: 'inherit',
                left: 0,
                top: 0,
                outline: 0,
                border: 0,
                margin: 0,
                fontSize: 'inherit',
                fontFamily: 'inherit',
                resize: 'none',
                lineHeight: 'inherit'
              }}
            />
          </div>
        </div>
      )}
    </Cursor>
  );
};
