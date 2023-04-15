import {TaskType} from "../Todolist";
import {TasksType} from "../App";
import {v1} from "uuid";

export const TaskReducer = (state: TasksType, action: any) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(item => item.id !== action.payload.taskId)
            };
        }
        case 'ADD-TASK': {
            const newTask = {id: v1(), title: action.payload.title, isDone: true}
            return {...state, [action.payload.todolistId]: [...state[action.payload.todolistId], newTask]};
        }
        case 'CHANGE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(item => item.id === action.payload.taskId ? {
                    ...item,
                    isDone: action.payload.isChecked
                } : item)
            };
        }
        default:
            return state;
    }

}

type TsarType = RemoveTaskAC | AddTaskAC | ChangeTaskAC;

type RemoveTaskAC = ReturnType<typeof removeTaskAC>;

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId,
            taskId
        }
    } as const;
}


type AddTaskAC = ReturnType<typeof addTaskAC>;

export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId,
            title
        }
    } as const;
}

type ChangeTaskAC = ReturnType<typeof addTaskAC>;

export const changeTaskAC = (todolistId: string, taskId: string, isChecked: boolean) => {
    return {
        type: 'CHANGE-TASK',
        payload: {
            todolistId,
            taskId,
            isChecked
        }
    } as const;
}