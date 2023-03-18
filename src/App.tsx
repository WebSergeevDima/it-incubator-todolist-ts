import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'completed' | 'active';

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'React', isDone: false}
    ]);

    let [filter, setFilter] = useState('all');

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        };

        setTasks([newTask, ...tasks]);

    }

    const removeTask = (id: string) => {
        const filteredTasks = tasks.filter((item) => id !== item.id);
        setTasks(filteredTasks);
    }

    const changeFilter = (value: FilterValueType) => {
        setFilter(value);
    }

    let tasksForTodolist = tasks;

    if(filter === 'completed') {
        tasksForTodolist = tasks.filter(item => item.isDone === true);
    }

    if(filter === 'active') {
        tasksForTodolist = tasks.filter(item => item.isDone === false);
    }

    return (
        <div className={'App'}>
            <Todolist title={'Заголовок 1'} tasks={tasksForTodolist} addTask={addTask} removeTask={removeTask} changeFilter={changeFilter} />
        </div>
    );

}

export default App;
