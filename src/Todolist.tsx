import React, {ChangeEvent, ChangeEventHandler, useRef, useState, KeyboardEvent} from "react";
import {FilterValueType} from "./App";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
};

type PropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changeFilter: (value: FilterValueType) => void
};

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState('');

    const todoListItems: JSX.Element[] = props.tasks.map(item => {

        const removeTaskHandler = () => {
            props.removeTask(item.id)
        };

        return (
            <li>
                <input type="checkbox" checked={item.isDone}/><span>{item.title}</span>
                <button onClick={removeTaskHandler}>-</button>
            </li>
        );
    });

    const recommendedTitleLang = 20;
    const isAddTaskPossible = title.length === 0 || title.length > recommendedTitleLang;

    const addTaskHandler = () => {
        if (title.trim().length === 0 || title.trim().length > recommendedTitleLang) {
            return;
        }
        props.addTask(title);
        setTitle('');
    }
    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => isAddTaskPossible ? undefined : e.key === 'Enter' && addTaskHandler();
    const longTitle = title.length > recommendedTitleLang ? <h2>Is big(</h2> : ''

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input placeholder={'Write task'} value={title} onChange={setLocalTitleHandler}
                       onKeyDown={onKeyDownAddTaskHandler}/>
                <button onClick={addTaskHandler} disabled={isAddTaskPossible}>+</button>
                {longTitle}
            </div>

            <ul>
                {todoListItems}
            </ul>

            <button onClick={() => props.changeFilter('all')}>All</button>
            <button onClick={() => props.changeFilter('active')}>Active</button>
            <button onClick={() => props.changeFilter('completed')}>Completed</button>
        </div>
    );
}