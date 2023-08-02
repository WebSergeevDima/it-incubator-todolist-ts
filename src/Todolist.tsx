import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import SuperCheckbox from "./Components/SuperCheckbox";

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

    const changeTaskStatusHandler = (id: string, isChecked: boolean) => {
        error && setError(false);
        props.changeTaskStatus(props.todolistId, id, isChecked);
    }

    const todoListItems: JSX.Element[] = props.tasks?.map(item => {

        const removeTaskHandler = () => {
            props.removeTask(props.todolistId, item.id);
        };

        const updateTaskHandler = (todolistId: string, newTitle: string) => {
            props.updateTask(todolistId, item.id, newTitle);
        }

        return (
            <li>
                {/*<Checkbox checked={item.isDone} onChange={changeTaskStatusHandler} />*/}
                <SuperCheckbox callback={(isChecked)=>changeTaskStatusHandler(item.id, isChecked)} isDone={item.isDone}/>

                <span className={item.isDone ? 'task task-done' : 'task'}>
                    <EditableSpan title={item.title} callBack={(newTitle) => updateTaskHandler(item.id, newTitle)}/>
                </span>
                <IconButton onClick={removeTaskHandler} aria-label="delete" size="small">
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
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
                <IconButton aria-label="delete" size="small" onClick={removeTodoHandler}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </h3>

            <AddItemForm callBack={addTaskHandler}/>

            <ul>
                {todoListItems ?? null}
            </ul>
            <Button variant={props.filter === 'all' ? 'contained' : 'outlined'} color="success" onClick={() => props.changeFilter(props.todolistId, 'all')}>
                All
            </Button>
            <Button variant={props.filter === 'active' ? 'contained' : 'outlined'} color="success" onClick={() => props.changeFilter(props.todolistId, 'active')}>
                Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'contained' : 'outlined'} color="success" onClick={() => props.changeFilter(props.todolistId, 'completed')}>
                Completed
            </Button>

        </div>
    );
}