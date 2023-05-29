import {v1} from "uuid";
import {FilterValueType, TodolistsType} from "../App";
import {addTodolistAC, changeFilterAC, changeTodolistAC, removeTodolistAC, todolistsReducer} from "./todolists-resucer";

let todolistId1: string;
let todolistId2: string;

let startState: TodolistsType[];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: 'Title 1', filter: 'all'},
        {id: todolistId2, title: 'Title 2', filter: 'all'}
    ];
})

test('Remove todolist', () => {

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);

});

test('Add todolist', () => {

    let newTodolistTitle = 'New todolist';

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);

});

test('Change todolist', () => {

    let newTodolistTitle = 'New title';

    const endState = todolistsReducer(startState, changeTodolistAC(todolistId2, newTodolistTitle));

    expect(endState[1].title).toBe('New title');

});

test('Change filter value', () => {

    let newFilter: FilterValueType = 'completed';

    const endState = todolistsReducer(startState, changeFilterAC(todolistId2, newFilter));

    expect(endState[1].filter).toBe('completed');

});
