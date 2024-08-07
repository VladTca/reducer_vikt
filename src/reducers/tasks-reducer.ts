import {TasksStateType} from '../App'
import {v1} from "uuid";


export type RemoveTaskActionsType = ReturnType<typeof removeTaskAC>
export type AddTaskActionsType = ReturnType<typeof addTaskAC>

type ActionType =
    AddTaskActionsType |
    RemoveTaskActionsType

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
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
                [action.payload.todolistId]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.todolistId]]
            }
        }
        default:
            throw new Error('I don\'t understand this type')
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

