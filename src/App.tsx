import React from 'react';
import './App.css';
import {Todolist} from "./Todolist/Todolist";

export type tasksType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    const tasks: tasksType[] = [
        {id: 1, title: 'Milk', isDone: false},
        {id: 2, title: 'Beer', isDone: true},
        {id: 3, title: 'Fish', isDone: true},
    ]
    return (
        <div className="App">
            <Todolist tasks={tasks}/>
        </div>
    );
}

export default App;

