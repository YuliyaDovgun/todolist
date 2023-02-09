import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist/Todolist";
import {v1} from "uuid";

export type TodolistType = {
    id: string
    title: string
    filter: filterType
}
export type tasksType = {
    id: string
    title: string
    isDone: boolean
}
export type filterType = 'All' | 'Completed' | 'InProgress'

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to do', filter: 'All',},
        {id: todolistId2, title: 'What to learn', filter: 'Completed'},
    ])

    const [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'Fish', isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'English', isDone: true},
        ],
    })
    const deleteTask = (id: string, todolistId: string) => {
        tasks[todolistId] = tasks[todolistId].filter(t => t.id !== id)
        setTasks({...tasks})
    }

    const addTask = (title: string, todolistId: string) => {
        tasks[todolistId] = [{id: v1(), title, isDone: false}, ...tasks[todolistId]]
        setTasks({...tasks})
    }
    const changeStatusTask = (id: string, isDone: boolean, todolistId: string) => {
        tasks[todolistId] = tasks[todolistId].map(t => t.id === id ? {...t, isDone} : t)
        setTasks({...tasks})
    }
    const changeFilter = (filter: filterType, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
    }
    return (
        <div className="App">{

            todolists.map(tl => {
                let filteredTasks: tasksType[] = tasks[tl.id]
                if (tl.filter === 'Completed') {
                    filteredTasks = tasks[tl.id].filter(t => t.isDone)
                }
                if (tl.filter === 'InProgress') {
                    filteredTasks = tasks[tl.id].filter(t => !t.isDone)
                }

                return <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={filteredTasks}
                    deleteTask={deleteTask}
                    filterTasks={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatusTask}
                    filter={tl.filter}
                />
            })
        }
        </div>
    );
}

export default App;

