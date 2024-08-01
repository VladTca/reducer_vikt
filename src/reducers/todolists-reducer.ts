import { TodolistType } from '../App'
import { v1 } from 'uuid'

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodolistType[] = [
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
]

type ActionsType = {
    type: string
    payload: any
}

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case 'ADD-TODOLIST': {
            return [...state, { id: action.payload.newTodolistId, title: action.payload.title, filter: 'all' }]
        }
        default:
            throw new Error("I don't understand this type")
    }
}