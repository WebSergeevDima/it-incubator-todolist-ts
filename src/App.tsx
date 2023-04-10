import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";

export type FilterValueType = 'all' | 'completed' | 'active';

type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

type TasksType = {
    [key: string]: TaskType[]
}

function App() {

    let todolistD1: string = v1();
    let todolistD2: string = v1();

    let [todolists, setTodolists] = useState<TodolistsType[]>([
        {id: todolistD1, title: 'Name 1', filter: 'completed'},
        {id: todolistD2, title: 'Name 2', filter: 'all'}
    ]);

    let [tasks, setTasks] = useState<TasksType>({
        [todolistD1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'React', isDone: false}
        ],
        [todolistD2]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'React', isDone: false}
        ]
    });

    const addTask = (todolistId: string, title: string) => {

        const newTask = {id: v1(), title: title, isDone: true}

        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})

    }

    const updateTask = (todolistId: string, taskId: string,  title: string) => {
        const newTask = {...tasks, [todolistId]: tasks[todolistId].map(item => taskId === item.id ? item.title = title : item)};
    }

    const updateTodolist = (todolistId: string, title: string) => {
            setTodolists(todolists.map(item => item.id === todolistId ? {...item, title:title} : item))
    }


    const changeTaskStatus = (todolistId: string, taskId: string, isChecked: boolean) => {

        setTasks({...tasks, [todolistId]: tasks[todolistId].map(item => item.id === taskId ? {...item, isDone: isChecked} : item)})

    }

    const removeTask = (todolistId: string, taskId: string) => {

        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(item => item.id !== taskId )})

    }

    const changeFilter = (todolistId: string, value: FilterValueType) => {

        setTodolists(todolists.map(item => item.id === todolistId ? {...item, filter: value} : item));

    }

    const removeTodo = (todolistId: string) => {

        setTodolists(todolists.filter(item=> item.id !== todolistId));
        delete tasks[todolistId];

    }


    const getFilteredTasksForRender = (taskList: TaskType[], filterValue: FilterValueType): TaskType[] => {
        switch (filterValue) {
            case 'active':
                return taskList.filter(item => item.isDone);
            case 'completed':
                return taskList.filter(item => !item.isDone);
            default:
                return taskList;
        }

    }

    const addTodolist = (newTitle: string) => {
        const newId = v1();
        const newTodolist: TodolistsType = {id: newId, title: newTitle, filter: 'all'};
        setTodolists([...todolists, newTodolist]);
        setTasks({...tasks, [newId]: [{id: v1(), title: 'CSS', isDone: true}]})
    }




    return (
        <div className={'App'}>

            <AddItemForm callBack={addTodolist} />

            {todolists.map(item => {
                return (
                    <div>

                        <Todolist key={item.id}
                                  todolistId={item.id}
                                  title={item.title}
                                  tasks={getFilteredTasksForRender(tasks[item.id], item.filter)}
                                  filter={item.filter}
                                  changeTaskStatus={changeTaskStatus}
                                  addTask={addTask}
                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  removeTodo={removeTodo}
                                  updateTask={updateTask}
                                  updateTodolist={updateTodolist}/>
                    </div>
                );
            })}
        </div>
    );

}

export default App;
