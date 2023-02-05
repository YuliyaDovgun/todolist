import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist/Todolist";
import {v1} from "uuid";

export type tasksType = {
    id: string
    title: string
    isDone: boolean
}
export type filterType = 'All' | 'Completed' | 'InProgress'

function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: 'Milk', isDone: false},
        {id: v1(), title: 'Beer', isDone: true},
        {id: v1(), title: 'Fish', isDone: true},
    ])
    let [filter, setFilter] = useState('All')
    let filteredTasks: tasksType[] = tasks
    if(filter === 'Completed'){
        filteredTasks = tasks.filter(t => t.isDone)
    }
    if(filter === 'InProgress'){
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    const deleteTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id))
    }
    const filterTasks = (filter: filterType) => {
        setFilter(filter)
    }
    const addTask = (title: string) => {
        setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }
    return (
        <div className="App">
            <Todolist
                title={'What to buy'}
                tasks={filteredTasks}
                deleteTask={deleteTask}
                filterTasks={filterTasks}
                addTask={addTask}
            />
        </div>
    );
}

export default App;

