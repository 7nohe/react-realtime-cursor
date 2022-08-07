import React from 'react';
import { CursorData } from "../types"
import { Cursor } from "./Cursor"

type Props = CursorData & { visible: boolean};

export const MyCursor = ({ visible = true, ...props }: Props) => {
    if (!visible) {
        return null;
    }

    return (
        <Cursor {...props} />
    )
}