import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValueType = 'all' | 'completed' | 'active';

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'React', isDone: false}
    ]);

    let [filter, setFilter] = useState('all');

    const removeTask = (id: number) => {
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
            <Todolist title={'Заголовок 1'} tasks={tasksForTodolist} removeTask={removeTask} changeFilter={changeFilter} />
        </div>
    );

}

export default App;
