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

    let [filter, setFilter] = useState<FilterValueType>('all');

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        };

        setTasks([newTask, ...tasks]);

    }

    const changeTaskStatus = (taskId: string, isChecked: boolean) => {
        setTasks(tasks.map(item => taskId === item.id ? {...item, isDone: isChecked} : item));
    }

    const removeTask = (id: string) => {
        const filteredTasks = tasks.filter((item) => id !== item.id);
        setTasks(filteredTasks);
    }

    const changeFilter = (value: FilterValueType) => {
        setFilter(value);
    }


    const getFilteredTasksForRender = (taskList: TaskType[], filterValue: FilterValueType) => {
        switch (filterValue) {
            case 'active':
                return taskList.filter(item => item.isDone);
            case 'completed':
                return taskList.filter(item => !item.isDone);
            default:
                return taskList;
        }

    }

    return (
        <div className={'App'}>
            <Todolist title={'Заголовок 1'} tasks={getFilteredTasksForRender(tasks, filter)} filter={filter} changeTaskStatus={changeTaskStatus}
                      addTask={addTask} removeTask={removeTask} changeFilter={changeFilter}/>
        </div>
    );

}

export default App;
