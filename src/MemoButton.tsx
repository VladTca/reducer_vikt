import {memo} from "react";
import {Button, ButtonProps} from "@mui/material";



type MemoButtonPropsType = ButtonProps & {}

export const MemoButton = memo(({...props}: MemoButtonPropsType) => {

    return (
    <Button
        variant={props.variant}
        color={props.color}
        onClick={props.onClick}
        {...props}
    >
        {props.title}
    </Button>
    )
})