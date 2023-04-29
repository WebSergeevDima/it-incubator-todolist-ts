import React from 'react';
import {TasksType} from "../App";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolists-resucer";

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
type AddTaskActionType = ReturnType<typeof addTaskAC>;
type ChangeStatusTaskActionType = ReturnType<typeof changeStatusTaskAC>;
type ChangeTitleTaskActionType = ReturnType<typeof changeTitleTaskAC>;

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeStatusTaskActionType
    | ChangeTitleTaskActionType
    | AddTodolistACType
    | RemoveTodolistACType;

export const tasksReducer = (state: TasksType, action: ActionsType) => {

    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(item => {
                    return item.id !== action.taskId
                })
            };
        case 'ADD-TASK':
            const newTodolist = {
                id: v1(),
                title: action.title,
                isDone: false
            };
            return {
                ...state,
                [action.todolistId]: [newTodolist, ...state[action.todolistId]]
            };
        case 'CHANGE-STATUS-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(item => item.id === action.taskId ? {
                    ...item,
                    isDone: action.status
                } : item)
            };
        case 'CHANGE-TITLE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(item => item.id === action.taskId ? {
                    ...item,
                    title: action.title
                } : item)
            };
        case 'ADD-TODOLIST':
            return {
                ...state,
                [v1()]: []
            };
        case 'REMOVE-TODOLIST':
            let copyState = {...state};
            delete copyState[action.payload.id];
            return copyState;
        default:
            throw new Error('Not action in tasks reducer!');
    }

}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        todolistId,
        taskId
    } as const;
}

export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        todolistId,
        title
    } as const;
}

export const changeStatusTaskAC = (todolistId: string, taskId: string, status: boolean) => {
    return {
        type: 'CHANGE-STATUS-TASK',
        todolistId,
        taskId,
        status
    } as const;
}

export const changeTitleTaskAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TITLE-TASK',
        todolistId,
        taskId,
        title
    } as const;
}
