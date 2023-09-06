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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

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


    // [
    //     {id: todolistD1, title: 'Name 1', filter: 'completed'},
    //     {id: todolistD2, title: 'Name 2', filter: 'all'}
    // ]

    // {
    //     [todolistD1]: [
    //     {id: v1(), title: 'CSS', isDone: true},
    //     {id: v1(), title: 'JS', isDone: true},
    //     {id: v1(), title: 'React', isDone: false},
    //     {id: v1(), title: 'React', isDone: false}
    // ],
    //     [todolistD2]: [
    //     {id: v1(), title: 'CSS', isDone: true},
    //     {id: v1(), title: 'JS', isDone: true},
    //     {id: v1(), title: 'React', isDone: false},
    //     {id: v1(), title: 'React', isDone: false}
    // ]
    // }


    let todolists = useSelector<AppRootStateType, Array<TodolistsType>>((state) => state.todolist);

    let tasks = useSelector<AppRootStateType, TasksType>((state) => state.tasks);

    const dispatch = useDispatch();

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

        let action = removeTaskAC(todolistId, taskId);
        dispatch(action);

    }

    const addTask = (todolistId: string, title: string) => {

        let action = addTaskAC(todolistId, title);
        dispatch(action);

    }

    const changeTaskStatus = (todolistId: string, taskId: string, isChecked: boolean) => {
        let action = changeStatusTaskAC(todolistId, taskId, isChecked);
        dispatch(action);

    }

    const updateTask = (todolistId: string, taskId: string, title: string) => {
        let action = changeTitleTaskAC(todolistId, taskId, title);
        dispatch(action);

    }

    const removeTodo = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId));
    }

    const addTodolist = (newTitle: string) => {

        let action = addTodolistAC(newTitle);

        dispatch(action);
    }

    const updateTodolist = (todolistId: string, title: string) => {

        let action = changeTodolistAC(todolistId,title );
        dispatch(action);
    }

    const changeFilter = (todolistId: string, value: FilterValueType) => {

        let action = changeFilterAC(todolistId, value);
        dispatch(action);
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
