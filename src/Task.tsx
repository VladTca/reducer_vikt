// @flow
import * as React from 'react';
import {ChangeEvent, memo} from "react";
import {getListItemSx} from "./Todolist.styles";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import {TaskType} from "./AppWithRedux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch} from "react-redux";

export type TaskPropsType = {
    task: TaskType,
    id: string
};

export const Task = memo(({task, id}: TaskPropsType) => {
    const dispatch = useDispatch();

    const removeTaskHandler = () => {
        dispatch(removeTaskAC(task.id, id));
    };

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(task.id, newStatusValue, id));
    };

    const changeTaskTitleHandler = (title: string) => {
        dispatch(changeTaskTitleAC(task.id, title, id));
    };

    return (
        <ListItem sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
            </div>
            <IconButton onClick={removeTaskHandler}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    );
});
