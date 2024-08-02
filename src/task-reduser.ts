import { TaskType } from './App'
import {v1} from "uuid";

export const tasksReducer = (state: TaskType[], action: ActionsType): TaskType[] => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return state.filter(task => task.id !== action.payload.id)
        case 'ADD-TASK':
            const newTask = {
                id: v1(),
                title: action.payload.title,
                isDone: false,
            }
            return [newTask, ...state]
        default:
            return state
    }
}
type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    payload: {
        id: string
    }
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    payload: {
        title: string
    }
}


type ActionsType = RemoveTaskActionType | AddTaskActionType
export const removeTaskAC = (id: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            id: id,
        },
    } as const
}

export const addTaskAC = (title: string): AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        payload: {
            title: title,
        },
    } as const
}


