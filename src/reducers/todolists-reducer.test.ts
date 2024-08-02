import {AddTodolistAC, RemoveTodolistAC, todolistsReducer} from './todolists-reducer'
import {v1} from 'uuid'
import {TodolistType} from '../App'

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    // 1. Стартовый state
    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    // 2. Действие
    const action = {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todolistId1,
        },
    } as const
    const endState = todolistsReducer(startState, action)

    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, а не любой
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    // const action = {
    //     type: 'ADD-TODOLIST',
    //     payload: {
    //         title: 'New Todolist',
    //         id: v1(),
    //     },
    // } as const;

    //
    // const endState = todolistsReducer(startState, action)

    const newTodolistTitle = 'New Todolist'

    const endState = todolistsReducer(startState, AddTodolistAC(v1(), newTodolistTitle))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
})
test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    // const action = {
    //     type: 'CHANGE-TODOLIST-TITLE',
    //     payload: {
    //         id: todolistId2,
    //         title: 'New Todolist',
    //     },
    // } as const
    // const endState = todolistsReducer(startState, action)

    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1)

    expect(endState[0].id).toBe(todolistId2)
})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id: todolistId2,
            filter: 'completed',
        },
    } as const
    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(action.payload.filter)
})

