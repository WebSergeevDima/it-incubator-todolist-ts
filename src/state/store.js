import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-resucer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolist: todolistsReducer
});