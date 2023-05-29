import {addTaskAC, changeStatusTaskAC, changeTitleTaskAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {TasksType} from "../App";
import {addTodolistAC, removeTodolistAC} from "./todolists-resucer";

let startState: TasksType;

beforeEach(() => {

    startState = {
        "todolistId1": [
            {
                id: '1', title: 'Title', isDone: false
            },
            {
                id: '2', title: 'Title TEST', isDone: false
            },
            {
                id: '3', title: 'Title', isDone: false
            }
        ],
        "todolistId2": [
            {
                id: '1', title: 'Title 2', isDone: true
            },
            {
                id: '2', title: 'Title 2', isDone: true
            },
            {
                id: '3', title: 'Title 2', isDone: true
            }
        ]
    }

});

test('Correct REMOVE task', () => {

    const action = removeTaskAC("todolistId2", "2");

    const endState = tasksReducer(startState, action);

    expect(endState).toEqual({
        "todolistId1": [
            {
                id: '1', title: 'Title', isDone: false
            },
            {
                id: '2', title: 'Title TEST', isDone: false
            },
            {
                id: '3', title: 'Title', isDone: false
            }
        ],
        "todolistId2": [
            {
                id: '1', title: 'Title 2', isDone: true
            },
            {
                id: '3', title: 'Title 2', isDone: true
            }
        ]
    });
})


test('Correct ADD task', () => {

    const action = addTaskAC("todolistId2", "juce");

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('juce');
    expect(endState['todolistId2'][0].isDone).toBe(false);

})


test('Correct CHANGE STATUS task', () => {

    const action = changeStatusTaskAC("todolistId2", "2", false);

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'][1].isDone).toBe(false);
    expect(endState['todolistId2'][1].isDone).toBe(false);

})


test('Correct CHANGE TITLE task', () => {

    const action = changeTitleTaskAC("todolistId2", "2", 'JS');

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'][1].title).toBe('Title TEST');
    expect(endState['todolistId2'][1].title).toBe('JS');

})


test('Correct ADD ARRAY TODOLIST task', () => {

    const action = addTodolistAC("New todolist");

    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);

    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2');

    if (!newKey) {
        throw Error('New key should be added');
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);

})


test('Correct REMOVE TODOLIST', () => {

    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();

})
