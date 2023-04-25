import {v1} from "uuid";
import {FilterValueType, TodolistsType} from "../App";
import {addTodolistAC, changeFilterAC, changeTodolistAC, removeTodolistAC, todolistsReducer} from "./todolists-resucer";


test('Remove todolist', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TodolistsType[] = [
        {id: todolistId1, title: 'Title 1', filter: 'all'},
        {id: todolistId2, title: 'Title 2', filter: 'all'}
    ];

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);

});


test('Add todolist', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = 'New todolist';

    const startState: TodolistsType[] = [
        {id: todolistId1, title: 'Title 1', filter: 'all'},
        {id: todolistId2, title: 'Title 2', filter: 'all'}
    ];

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);

});


test('Change todolist', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = 'New title';

    const startState: TodolistsType[] = [
        {id: todolistId1, title: 'Title 1', filter: 'all'},
        {id: todolistId2, title: 'Title 2', filter: 'all'}
    ];

    const endState = todolistsReducer(startState, changeTodolistAC(todolistId2, newTodolistTitle));

    expect(endState[1].title).toBe('New title');

});



test('Change filter value', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValueType = 'completed';

    const startState: TodolistsType[] = [
        {id: todolistId1, title: 'Title 1', filter: 'all'},
        {id: todolistId2, title: 'Title 2', filter: 'all'}
    ];

    const endState = todolistsReducer(startState, changeFilterAC(todolistId2, newFilter));

    expect(endState[1].filter).toBe('completed');

});
