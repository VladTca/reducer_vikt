import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from "@mui/material/Box";
import {filterButtonsContainerSx, getListItemSx} from "./Todolist.styles";
import {TodolistType} from "./AppWithRedux";
import {AppRootStateType} from "./state/store";
import {useDispatch, useSelector} from "react-redux";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";


type PropsType = {
    todolist: TodolistType
}

export const Todolist1 = ({todolist}: PropsType) => {
    const {
        id,
        title,
        filter,

    } = todolist
    let tasks =
        useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])

    const dispatch = useDispatch()

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        dispatch(ChangeTodolistFilterAC(id, filter));
    };

    const removeTodolistHandler = () => {
        dispatch(RemoveTodolistAC(id));
    };

    const addTaskCallback = (title: string) => {
        dispatch(addTaskAC(title, id));
    };

    const updateTodolistHandler = (title: string) => {
        dispatch(ChangeTodolistTitleAC(id, title));
    };


const onAllTasksClickHandler = () => {
    changeFilterTasksHandler('all');
};
const onActiveTasksClickHandler = () => {
    changeFilterTasksHandler('active');
};
const onCompletedTasksClickHandler = () => {
    changeFilterTasksHandler('completed');
};


    if (filter === 'active') {
        tasks = tasks.filter(task => !task.isDone)
    }

    if (filter === 'completed') {
        tasks = tasks.filter(task => task.isDone)
    }


    return (
        <div>
            <div className={"todolist-title-container"}>
                <h3><EditableSpan value={title} onChange={updateTodolistHandler}/></h3>
                <IconButton onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <AddItemForm addItem={addTaskCallback}/>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <List>
                        {tasks.map((task) => {

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
                            return <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                                <div>
                                    <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                    <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                </div>
                                <IconButton onClick={removeTaskHandler}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>
                        })}
                    </List>
            }
            <Box sx={filterButtonsContainerSx}>
                memo(<Button
                    variant={filter === 'all' ? 'outlined' : 'text'}
                    color={'inherit'}
                    onClick={onAllTasksClickHandler}>
                    All
                </Button>)
                <Button
                    variant={filter === 'active' ? 'outlined' : 'text'}
                    color={'primary'}
                    onClick={onActiveTasksClickHandler}>
                    Active
                </Button>
                <Button
                    variant={filter === 'completed' ? 'outlined' : 'text'}
                    color={'secondary'}
                    onClick={onCompletedTasksClickHandler}>
                    Completed
                </Button>
            </Box>
        </div>
    )
}
