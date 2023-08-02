import React from 'react';
import {TasksType} from "../App";
import {v1} from "uuid";
import {TodolistTypeAction} from "./todolists-resucer";

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
type AddTaskActionType = ReturnType<typeof addTaskAC>;
type ChangeStatusTaskActionType = ReturnType<typeof changeStatusTaskAC>;
type ChangeTitleTaskActionType = ReturnType<typeof changeTitleTaskAC>;

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeStatusTaskActionType
    | ChangeTitleTaskActionType
    | TodolistTypeAction;

export const tasksReducer = (state: TasksType, action: ActionsType) => {

    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(item => {
                        return item.id !== action.payload.taskId;
                    })
            };
        case 'ADD-TASK':
            const newTask = {
                id: v1(),
                title: action.payload.title,
                isDone: false
            };
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]?.length ? [...state[action.payload.todolistId], newTask]: [newTask]
            };
        case 'CHANGE-STATUS-TASK':
            console.log('action!!: ', action);
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(item => item.id === action.payload.taskId ? {
                        ...item,
                        isDone: action.payload.status
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
        default:
            return state;
            //throw new Error('Not action in tasks reducer!');
    }

}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId,
            taskId
        }
    } as const;
}

export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId,
            title
        }
    } as const;
}

export const changeStatusTaskAC = (todolistId: string, taskId: string, status: boolean) => {
    return {
        type: 'CHANGE-STATUS-TASK',
        payload: {
            todolistId,
            taskId,
            status
        }
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
