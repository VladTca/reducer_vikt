import {FilterValuesType, TasksStateType, TodolistType} from '../App'
import {v1} from 'uuid'

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodolistType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export type FirstActionType = ReturnType<typeof firstAC>


type ActionType =
    FirstActionType

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case '':
            return state


        default:
            throw new Error('I don\'t understand this type')
        }
    }

export const firstAC = (todolistId: string) => {
    return {
        type: ''
    } as const
}


