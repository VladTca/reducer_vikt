import {FilterValuesType, TodolistType} from '../App'
import {v1} from 'uuid'

let todolistID1 = v1()
let todolistID2 = v1()

const initState: TodolistType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export type AddTodolistActionsType = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
        id: string
    }
}
export type RemoveTodolistActionsType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    }
}
type ChangeTodolistTitleActionsType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        id: string
        title: string
    }
}
type ChangeTodolistFilterActionsType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        id: string
        filter: FilterValuesType
    }
}

export type ActionType =
    AddTodolistActionsType
    | RemoveTodolistActionsType
    | ChangeTodolistTitleActionsType
    | ChangeTodolistFilterActionsType

const initialState: Array<TodolistType> = []


export const todolistsReducer = (state = initialState, action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id)

        }
        case 'ADD-TODOLIST': {
            const {id, title} = action.payload
            return [{id, title, filter: 'all'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const {id, title} = action.payload
            return state.map(tl => tl.id === id ? {...tl, title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const {id, filter} = action.payload
            return state.map(tl => tl.id === id ? {...tl, filter} : tl)
        }

        default:
            return state
    }
}

export const AddTodolistAC = (id : string, title: string): AddTodolistActionsType => ({type: 'ADD-TODOLIST', payload: {title, id: v1()}}) as const
export const RemoveTodolistAC = (id: string): RemoveTodolistActionsType => ({type: 'REMOVE-TODOLIST', payload: {id}}) as const
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionsType => ({
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {id, title}
}) as const
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionsType => ({
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {id, filter}
}) as const