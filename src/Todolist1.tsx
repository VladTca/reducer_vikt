import {FilterValuesType, TaskType} from "./App";
import {useCallback, useMemo} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import Box from "@mui/material/Box";
import {filterButtonsContainerSx} from "./Todolist.styles";
import {TodolistType} from "./AppWithRedux";
import {AppRootStateType} from "./state/store";
import {useDispatch, useSelector} from "react-redux";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./state/todolists-reducer";
import {addTaskAC} from "./state/tasks-reducer";
import {MemoButton} from "./MemoButton";
import {Task} from "./Task";


type PropsType = {
    todolist: TodolistType
};

export const Todolist1 = ({todolist}: PropsType) => {
    const {
        id,
        title,
        filter,
    } = todolist;

    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id]);

    const dispatch = useDispatch();

    const changeFilterTasksHandler = useCallback((filter: FilterValuesType) => {
        dispatch(ChangeTodolistFilterAC(id, filter));
    }, [dispatch, id]);

    const removeTodolistHandler = useCallback(() => {
        dispatch(RemoveTodolistAC(id));
    }, [dispatch, id]);

    const addTaskCallback = useCallback((title: string) => {
        dispatch(addTaskAC(title, id));
    }, [dispatch, id]);

    const updateTodolistHandler = useCallback((title: string) => {
        dispatch(ChangeTodolistTitleAC(id, title));
    }, [dispatch, id]);

    const onAllTasksClickHandler = useCallback(() => {
        changeFilterTasksHandler('all');
    }, [changeFilterTasksHandler]);

    const onActiveTasksClickHandler = useCallback(() => {
        changeFilterTasksHandler('active');
    }, [changeFilterTasksHandler]);

    const onCompletedTasksClickHandler = useCallback(() => {
        changeFilterTasksHandler('completed');
    }, [changeFilterTasksHandler]);

    const filteredTasks = useMemo(() => {
        switch (filter) {
            case 'active':
                return tasks.filter(task => !task.isDone);
            case 'completed':
                return tasks.filter(task => task.isDone);
            case 'all':
            default:
                return tasks;
        }
    }, [tasks, filter]);

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
                filteredTasks.length === 0
                    ? <p>Тасок нет</p>
                    : <List>
                        {filteredTasks.map((task) => (
                            <Task key={task.id} task={task} id={id}/>
                        ))}
                    </List>
            }
            <Box sx={filterButtonsContainerSx}>
                <MemoButton
                    variant={filter === 'all' ? 'outlined' : 'text'}
                    color={'inherit'}
                    onClick={onAllTasksClickHandler}
                    title={'All'}
                />
                <MemoButton
                    variant={filter === 'active' ? 'outlined' : 'text'}
                    color={'primary'}
                    onClick={onActiveTasksClickHandler}
                    title={'Active'}
                />
                <MemoButton
                    variant={filter === 'completed' ? 'outlined' : 'text'}
                    color={'secondary'}
                    onClick={onCompletedTasksClickHandler}
                    title={'Completed'}
                />
            </Box>
        </div>
    );
};
