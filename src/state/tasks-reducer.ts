import {TasksStateType} from '../App'
import {v1} from "uuid";
import {AddTodolistActionsType, RemoveTodolistActionsType} from "./todolists-reducer";



export type RemoveTaskActionsType = ReturnType<typeof removeTaskAC>
export type AddTaskActionsType = ReturnType<typeof addTaskAC>
export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

type ActionType =
    AddTaskActionsType |
    RemoveTaskActionsType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | AddTodolistActionsType
| RemoveTodolistActionsType


const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(t => t.id !== action.payload.tasksId)
            }

        }
        case "ADD-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: [
                    {id: v1(), title: action.payload.title, isDone: false},
                    ...state[action.payload.todolistId]
                ]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.tasksId ? {...t, isDone: action.payload.isDone} : t)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.tasksId ? {...t, title: action.payload.title} : t)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.payload.id]: []
            }

        }
        case 'REMOVE-TODOLIST': {
            // const copyState = {...state}
            // delete copyState[action.payload.id]
            // return copyState

            const {[action.payload.id]: [], ...rest} = state
            return rest
        }
        default:
            // throw new Error('I don\'t understand this type')
            return state
    }
}

export const removeTaskAC = (tasksId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            tasksId,
            todolistId
        }
    } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title,
            todolistId
        }
    } as const
}
export const changeTaskStatusAC = (tasksId: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            tasksId,
            isDone,
            todolistId
        }
    } as const
}
export const changeTaskTitleAC = (tasksId: string, title: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            tasksId,
            title,
            todolistId
        }
    } as const
}

