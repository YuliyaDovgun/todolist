import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist/Todolist";

export type tasksType = {
    id: number
    title: string
    isDone: boolean
}
export type filterType = 'All' | 'Completed' | 'InProgress'

function App() {
    let [tasks, setTasks] = useState([
        {id: 1, title: 'Milk', isDone: false},
        {id: 2, title: 'Beer', isDone: true},
        {id: 3, title: 'Fish', isDone: true},
    ])
    let [filter, setFilter] = useState('All')
    let filteredTasks: tasksType[] = tasks
    if(filter === 'Completed'){
        filteredTasks = tasks.filter(t => t.isDone)
    }
    if(filter === 'InProgress'){
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    const deleteTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id))
    }
    const filterTasks = (filter: filterType) => {
        setFilter(filter)
    }
    return (
        <div className="App">
            <Todolist
                title={'What to buy'}
                tasks={filteredTasks}
                deleteTask={deleteTask}
                filterTasks={filterTasks}
            />
        </div>
    );
}

export default App;

