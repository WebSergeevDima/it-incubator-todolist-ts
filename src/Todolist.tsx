import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button} from "@mui/material";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
};

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isChecked: boolean) => void
    addTask: (todolistId: string, title: string) => void
    changeFilter: (todolistId: string, value: FilterValueType) => void
    removeTodo: (todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, title: string) => void
    updateTodolist: (todolistId: string, title: string) => void
};

export function Todolist(props: PropsType) {

    let [error, setError] = useState<boolean>(false);

    const todoListItems: JSX.Element[] = props.tasks.map(item => {

        const removeTaskHandler = () => {
            props.removeTask(props.todolistId, item.id);
        };

        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            error && setError(false);
            props.changeTaskStatus(props.todolistId, item.id, e.currentTarget.checked);
        }

        const updateTaskHandler = (todolistId: string, newTitle: string) => {
            props.updateTask(todolistId, item.id, newTitle);
        }


        return (
            <li>
                <input type="checkbox" checked={item.isDone} onChange={changeTaskStatusHandler}/>
                <span className={item.isDone ? 'task task-done' : 'task'}>
                    <EditableSpan title={item.title} callBack={(newTitle) => updateTaskHandler(item.id, newTitle)}/>
                </span>
                <button onClick={removeTaskHandler}>-</button>
            </li>
        );
    });

    const removeTodoHandler = () => {
        props.removeTodo(props.todolistId);
    }

    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistId, title);
    }


    const updateTodolistHandler = (newTitle: string) => {
        props.updateTodolist(props.todolistId, newTitle);
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callBack={(newTitle) => updateTodolistHandler(newTitle)}/>
                <Button variant="contained" onClick={removeTodoHandler}>Del</Button>
            </h3>

            <AddItemForm callBack={addTaskHandler}/>

            <ul>
                {todoListItems}
            </ul>

            <button onClick={() => props.changeFilter(props.todolistId, 'all')}
                    className={props.filter === 'all' ? 'btn-active' : ''}>All
            </button>
            <button onClick={() => props.changeFilter(props.todolistId, 'active')}
                    className={props.filter === 'active' ? 'btn-active' : ''}>Active
            </button>
            <button onClick={() => props.changeFilter(props.todolistId, 'completed')}
                    className={props.filter === 'completed' ? 'btn-active' : ''}>Completed
            </button>
        </div>
    );
}