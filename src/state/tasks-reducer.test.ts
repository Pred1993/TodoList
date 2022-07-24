import {TasksStateType} from "../App";
import {
    addTasksAC, AddTasksActionType, changeTasksTitleAC,
    removeTasksAC, RemoveTasksActionType,
    tasksReducer
} from "./tasks-reducer";
import {changeTasksStatusAC} from "./tasks-reducer";
import {ChangeTasksStatusActionType} from "./tasks-reducer";
import {ChangeTasksTitleActionType} from "./tasks-reducer";
import {addTodolistAC, AddTodolistActionType, removeTodolistAC} from "./todolist-reducer";

test('Reducer has to remove the task', () => {
    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: "Meat", isDone: true},
            {id: '2', title: "Fish", isDone: true},
            {id: '3', title: "Beer", isDone: false}
        ],
        'todoListId2': [
            {id: '1', title: "HTML & CSS", isDone: true},
            {id: '2', title: "React", isDone: true},
            {id: '3', title: "JS", isDone: false}
        ],
    }
    const action: RemoveTasksActionType = removeTasksAC('todoListId2', '2')

    const endState = tasksReducer(startState, action)

    expect(endState['todoListId2'].length).toBe(2)
    expect(endState['todoListId1'].length).toBe(3)
    expect(endState['todoListId2'].every(t => t.id !== '2')).toBeTruthy()
})

test('Reducer has to add the task', () => {
    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: "Meat", isDone: true},
            {id: '2', title: "Fish", isDone: true},
            {id: '3', title: "Beer", isDone: false}
        ],
        'todoListId2': [
            {id: '1', title: "HTML & CSS", isDone: true},
            {id: '2', title: "React", isDone: true},
            {id: '3', title: "JS", isDone: false}
        ],
    }
    const action: AddTasksActionType = addTasksAC('todoListId2', "Redux")

    const endState = tasksReducer(startState, action)

    expect(endState['todoListId1'].length).toBe(3)
    expect(endState['todoListId2'].length).toBe(4)
    expect(endState['todoListId2'][0].id).toBeDefined()
    expect(endState['todoListId2'][0].title).toBe("Redux")
    expect(endState['todoListId2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: "Meat", isDone: true},
            {id: '2', title: "Fish", isDone: true},
            {id: '3', title: "Beer", isDone: false}
        ],
        'todoListId2': [
            {id: '1', title: "HTML & CSS", isDone: true},
            {id: '2', title: "React", isDone: true},
            {id: '3', title: "JS", isDone: false}
        ]
    }

    const action: ChangeTasksStatusActionType = changeTasksStatusAC('todoListId2', '2', false)

    const endState = tasksReducer(startState, action)

    expect(endState['todoListId1'][0].isDone).toBe(true)
    expect(endState['todoListId2'][1].isDone).toBe(false)
})

test('title of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: "Meat", isDone: true},
            {id: '2', title: "Fish", isDone: true},
            {id: '3', title: "Beer", isDone: false}
        ],
        'todoListId2': [
            {id: '1', title: "HTML & CSS", isDone: true},
            {id: '2', title: "React", isDone: true},
            {id: '3', title: "JS", isDone: false}
        ]
    }

    const action: ChangeTasksTitleActionType = changeTasksTitleAC('todoListId2', '2', 'Redux')

    const endState = tasksReducer(startState, action)

    expect(endState['todoListId1'][0].title).toBe("Meat")
    expect(endState['todoListId2'][1].title).toBe('Redux')
})

test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: "Meat", isDone: true},
            {id: '2', title: "Fish", isDone: true},
            {id: '3', title: "Beer", isDone: false}
        ],
        'todoListId2': [
            {id: '1', title: "HTML & CSS", isDone: true},
            {id: '2', title: "React", isDone: true},
            {id: '3', title: "JS", isDone: false}
        ]
    }

    const action: AddTodolistActionType = addTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todoListId1' && k !== 'todoListId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: "Meat", isDone: true},
            {id: '2', title: "Fish", isDone: true},
            {id: '3', title: "Beer", isDone: false}
        ],
        'todoListId2': [
            {id: '1', title: "HTML & CSS", isDone: true},
            {id: '2', title: "React", isDone: true},
            {id: '3', title: "JS", isDone: false}
        ]
    }


    const action = removeTodolistAC('todoListId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todoListId2']).not.toBeDefined()
})
