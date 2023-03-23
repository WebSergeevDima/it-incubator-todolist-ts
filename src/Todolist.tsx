import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValueType} from "./App";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
};

type PropsType = {
    title: string,
    tasks: Array<TaskType>
    filter: FilterValueType
    removeTask: (id: string) => void
    changeTaskStatus: (taskId: string, isChecked: boolean) => void
    addTask: (title: string) => void
    changeFilter: (value: FilterValueType) => void
};

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<boolean>(false);

    const recommendedTitleLang = 20;
    const isAddTaskPossible:boolean = !title.length || title.length > recommendedTitleLang;

    const todoListItems: JSX.Element[] = props.tasks.map(item => {

        const removeTaskHandler = () => {
            props.removeTask(item.id)
        };

        const changeTaskStatusHandler =  (e: ChangeEvent<HTMLInputElement>)=> {
            error && setError(false);
            props.changeTaskStatus(item.id, e.currentTarget.checked);
        }

        return (
            <li>
                <input type="checkbox" checked={item.isDone} onChange={changeTaskStatusHandler}/>
                <span className={item.isDone ? 'task task-done' : 'task'}>{item.title}</span>
                <button onClick={removeTaskHandler}>-</button>
            </li>
        );
    });

    const addTaskHandler = () => {

        const trimmedTitle = title.trim();

        if(trimmedTitle) {
            props.addTask(trimmedTitle);
        } else {
            setError(true);
        }
        setTitle('');

    }
    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>  setTitle(e.currentTarget.value);
    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => isAddTaskPossible ? undefined : e.key === 'Enter' && addTaskHandler();
    const longTitle = title.length > recommendedTitleLang ? <h2>Is big(</h2> : '';
    const errorTitleMessage = error && <h2>Is HARD!!(</h2>;


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input placeholder={'Write task'} value={title} onChange={setLocalTitleHandler}
                       onKeyDown={onKeyDownAddTaskHandler} className={error ? 'input-error' : ''}/>
                <button onClick={addTaskHandler} disabled={isAddTaskPossible}>+</button>
                {longTitle}
                {errorTitleMessage}
            </div>

            <ul>
                {todoListItems}
            </ul>

            <button onClick={() => props.changeFilter('all')}
                    className={props.filter === 'all' ? 'btn-active' : ''}>All
            </button>
            <button onClick={() => props.changeFilter('active')}
                    className={props.filter === 'active' ? 'btn-active' : ''}>Active
            </button>
            <button onClick={() => props.changeFilter('completed')}
                    className={props.filter === 'completed' ? 'btn-active' : ''}>Completed
            </button>
        </div>
    );
}