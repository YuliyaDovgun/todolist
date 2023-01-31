import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist/Todolist";

export type tasksType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    let [tasks, setTasks] = useState([
        {id: 1, title: 'Milk', isDone: false},
        {id: 2, title: 'Beer', isDone: true},
        {id: 3, title: 'Fish', isDone: true},
    ])
    const deleteTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id))
    }
    return (
        <div className="App">
            <Todolist tasks={tasks} deleteTask={deleteTask}/>
        </div>
    );
}

export default App;

