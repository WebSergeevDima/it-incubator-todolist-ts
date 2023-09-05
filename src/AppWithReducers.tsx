import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import {Container} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
//import {addTaskAC, changeTaskAC, removeTaskAC, TaskReducer} from "./resucers/taskReducer";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-resucer";
import {tasksReducer, removeTaskAC, addTaskAC, changeStatusTaskAC, changeTitleTaskAC} from "./state/tasks-reducer";

export type FilterValueType = 'all' | 'completed' | 'active';

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksType = {
    [key: string]: TaskType[]
}

function App() {

    let todolistD1: string = v1();
    let todolistD2: string = v1();

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistD1, title: 'Name 1', filter: 'completed'},
        {id: todolistD2, title: 'Name 2', filter: 'all'}
    ]);

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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

    // let [tasks, tasksDispatch] = useReducer(TaskReducer, {
    //     [todolistD1]: [
    //         {id: v1(), title: 'CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'React', isDone: false},
    //         {id: v1(), title: 'React', isDone: false}
    //     ],
    //     [todolistD2]: [
    //         {id: v1(), title: 'CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'React', isDone: false},
    //         {id: v1(), title: 'React', isDone: false}
    //     ]
    // });

    const removeTask = (todolistId: string, taskId: string) => {
        //
        // //tasksDispatch(removeTaskAC(todolistId, taskId));
        //
        // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(item => item.id !== taskId)});

        let action = removeTaskAC(todolistId, taskId);
        dispatchToTasks(action);

    }

    const addTask = (todolistId: string, title: string) => {

        // const newTask = {id: v1(), title: title, isDone: true}
        //
        // setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})

        let action = addTaskAC(todolistId, title);
        dispatchToTasks(action);

    }

    const changeTaskStatus = (todolistId: string, taskId: string, isChecked: boolean) => {

        // setTasks({
        //     ...tasks,
        //     [todolistId]: tasks[todolistId].map(item => item.id === taskId ? {...item, isDone: isChecked} : item)
        // })

        let action = changeStatusTaskAC(todolistId, taskId, isChecked);
        dispatchToTasks(action);

    }

    const updateTask = (todolistId: string, taskId: string, title: string) => {
        // const newTask = {
        //     ...tasks,
        //     [todolistId]: tasks[todolistId].map(item => taskId === item.id ? item.title = title : item)
        // };

        let action = changeTitleTaskAC(todolistId, taskId, title);
        dispatchToTasks(action);

    }

    const removeTodo = (todolistId: string) => {

        // setTodolists(todolists.filter(item => item.id !== todolistId));
        // delete tasks[todolistId];

        dispatchToTodolists(removeTodolistAC(todolistId));
        dispatchToTasks(removeTodolistAC(todolistId));


    }

    const addTodolist = (newTitle: string) => {
        // const newId = v1();
        // const newTodolist: TodolistsType = {id: newId, title: newTitle, filter: 'all'};
        //
        // setTodolists([...todolists, newTodolist]); //DEBUG
        //
        // setTasks({...tasks, [newId]: [{id: v1(), title: 'CSS', isDone: true}]})

        let action = addTodolistAC(newTitle);

        dispatchToTodolists(action);
       //dispatchToTasks(action); //WHY????
    }

    const updateTodolist = (todolistId: string, title: string) => {
        //setTodolists(todolists.map(item => item.id === todolistId ? {...item, title: title} : item))

        let action = changeTodolistAC(todolistId,title );
        dispatchToTodolists(action);
    }

    const changeFilter = (todolistId: string, value: FilterValueType) => {

        //setTodolists(todolists.map(item => item.id === todolistId ? {...item, filter: value} : item));

        let action = changeFilterAC(todolistId, value);
        dispatchToTodolists(action);
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

    return (
        <div className={'App'}>

            <ButtonAppBar/>

            <Container fixed>

                <Grid xs={12}>
                    <AddItemForm callBack={addTodolist}/>
                </Grid>

                <Grid container spacing={2}>

                    {todolists.map(item => {
                        return (
                            <Grid xs={4} key={item.id}>
                                <Paper elevation={3} style={{padding: '20px'}}>
                                    <Todolist
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
                                </Paper>
                            </Grid>
                        );
                    })}

                </Grid>

            </Container>

        </div>
    );

}

export default App;
