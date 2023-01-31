import React from "react";
import {tasksType} from "../App";
import s from "./Todolist.module.css"

type TodolistPropsType = {
    tasks: tasksType[]
}
export const Todolist = (props: TodolistPropsType) => {
    return <div className={s.Todolist}>
        <h3>What to buy</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map(t => <li key={t.id}>
                <input type={'checkbox'} checked={t.isDone}/>
                <span>{t.title}</span>
            </li>)}
        </ul>
        <div>
            <button>All</button>
            <button>Completed</button>
            <button>InProgress</button>
        </div>

    </div>
}