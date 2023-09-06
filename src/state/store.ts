import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-resucer";
import {combineReducers, legacy_createStore} from "redux";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolist: todolistsReducer
});

export const store = legacy_createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>;