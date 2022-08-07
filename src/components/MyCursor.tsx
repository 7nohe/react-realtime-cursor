import React, { useCallback, useEffect, useState } from 'react';
import { CursorData } from "../types"
import { getStyle } from '../utils';
import { Cursor } from "./Cursor"

type Props = CursorData & { visible: boolean, onCommentUpdated?: (data: CursorData) => void };

export const MyCursor = ({ visible = true, onCommentUpdated, ...props }: Props) => {
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const onChangeInput = useCallback((e: any) => {
        const inputValue = e.target.value;
        if (inputValue === '/') {
            return;
        }
        setInputValue(inputValue);
        onCommentUpdated?.({ ...props, comment: inputValue })
    }, [props]);

    useEffect(() => {
        const keydown = (e: KeyboardEvent) => {
            if (e.code === 'Slash') {
                setShowInput(true);
            }

            if (e.code === 'Escape') {
                setShowInput(false);
                setInputValue('');
                onCommentUpdated?.({ ...props, comment: '' })
            }
        };

        document.addEventListener('keydown', keydown);

        return () => {
            document.removeEventListener('keydown', keydown);
        };
    }, [props]);

    if (!visible) {
        return null;
    }


    return (
        <Cursor {...props}>
            {showInput &&
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
                        backgroundColor: getStyle(props.id).color.default,
                    }}
                >
                    <div style={{
                        minWidth: 100,
                        height: 32,
                        width: 'fit-content',
                        borderRadius: 8,
                        position: "relative",
                        fontSize: 16,
                        color: "#fff",
                        padding: "5px 0",
                        marginLeft: 15,
                    }}>
                        <span style={{
                            display: "inline-block",
                            visibility: "hidden",
                            fontSize: "inherit",
                            fontFamily: "inherit",
                        }}>{inputValue}</span>
                        <input
                            autoFocus
                            placeholder="Say something"
                            value={inputValue}
                            onChange={onChangeInput}
                            style={{
                                height: "100%",
                                width: '100%',
                                position: "absolute",
                                backgroundColor: "inherit",
                                left: 0,
                                top: 0,
                                outline: 0,
                                border: 0,
                                margin: 0,
                            }}
                        />
                    </div>
                </div>}
        </Cursor >
    )
}