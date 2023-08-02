import {FilterValueType, TodolistsType} from "../App";
import {v1} from "uuid";

const REMOVE_TODOLIST = 'REMOVE-TODOLIST';
const ADD_TODOLIST = 'ADD-TODOLIST';
const UPDATE_TODOLIST = 'UPDATE-TODOLIST';
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER';

export const todolistReducer = (state: TodolistsType[], action: TsarTypeAction): TodolistsType[] => {
    switch (action.type) {
        case REMOVE_TODOLIST: {
            return state.filter(item => {
                return item.id !== action.payload.id
            });
        }
        case ADD_TODOLIST: {

            const id = v1();
            const newTodolist: TodolistsType = {id: id, title: action.payload.title, filter: 'all'};

            console.log('3) newTodolist: ', newTodolist);

            return [...state, newTodolist];
        }
        case UPDATE_TODOLIST: {
            return state.map(item => item.id === action.payload.id ? {...item, title: action.payload.title} : item);
        }
        case CHANGE_TODOLIST_FILTER: {
            return state.map(item => item.id === action.payload.id ? {...item, filter: action.payload.filter} : item);
        }
        default:
            return state;

    }
};


type TsarTypeAction = RemoveTodolistACType
    | AddTodolistACType
    | ChangeTodolistACType
    | ChangeFilterACType;

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistACType = ReturnType<typeof addTodolistAC>;
type ChangeTodolistACType = ReturnType<typeof changeTodolistAC>;
type ChangeFilterACType = ReturnType<typeof changeFilterAC>;

export const removeTodolistAC = (id: string) => {
    return {
        type: REMOVE_TODOLIST,
        payload: {
            id
        }
    } as const
}


export const addTodolistAC = (title: string) => {

    console.log('2) title: ', title);
    return {
        type: ADD_TODOLIST,
        payload: {
            title,
            todolistId: v1()
        }
    } as const
}

export const changeTodolistAC = (id: string, title: string) => {
    return {
        type: UPDATE_TODOLIST,
        payload: {
            id,
            title
        }
    } as const
}

export const changeFilterAC = (id: string, filter: FilterValueType) => {
    return {
        type: CHANGE_TODOLIST_FILTER,
        payload: {
            id,
            filter
        }
    } as const
}

export default todolistReducer;