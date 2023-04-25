import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import {Container} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import {addTaskAC, changeTaskAC, removeTaskAC, TaskReducer} from "./resucers/taskReducer";

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

    const addTask = (todolistId: string, title: string) => {

        //tasksDispatch(addTaskAC(todolistId, title));

        const newTask = {id: v1(), title: title, isDone: true}

        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})

    }

    const removeTask = (todolistId: string, taskId: string) => {

        //tasksDispatch(removeTaskAC(todolistId, taskId));

        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(item => item.id !== taskId)})

    }

    const changeTaskStatus = (todolistId: string, taskId: string, isChecked: boolean) => {
        //TaskReducer(tasks, changeTaskAC(todolistId, taskId, isChecked));

        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(item => item.id === taskId ? {...item, isDone: isChecked} : item)
        })

    }

    const addTodolist = (newTitle: string) => {
        const newId = v1();
        const newTodolist: TodolistsType = {id: newId, title: newTitle, filter: 'all'};

        setTodolists([...todolists, newTodolist]); //DEBUG

        setTasks({...tasks, [newId]: [{id: v1(), title: 'CSS', isDone: true}]})
    }


    const updateTask = (todolistId: string, taskId: string, title: string) => {
        const newTask = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(item => taskId === item.id ? item.title = title : item)
        };
    }

    const updateTodolist = (todolistId: string, title: string) => {
        setTodolists(todolists.map(item => item.id === todolistId ? {...item, title: title} : item))
    }




    const changeFilter = (todolistId: string, value: FilterValueType) => {

        setTodolists(todolists.map(item => item.id === todolistId ? {...item, filter: value} : item));

    }

    const removeTodo = (todolistId: string) => {

        setTodolists(todolists.filter(item => item.id !== todolistId));
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
