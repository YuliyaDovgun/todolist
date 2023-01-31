import React from "react";
import {tasksType} from "../App";
import s from "./Todolist.module.css"

type TodolistPropsType = {
    tasks: tasksType[]
    deleteTask: (id: number) => void
}
export const Todolist = (props: TodolistPropsType) => {
    return <div className={s.Todolist}>
        <h3>What to buy</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map(t => {
                const onClickButtonHandler = () => {
                    props.deleteTask(t.id)
                }

                return <li key={t.id}>
                <input type={'checkbox'} checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={onClickButtonHandler}>X</button>
            </li>})}
        </ul>
        <div>
            <button>All</button>
            <button>Completed</button>
            <button>InProgress</button>
        </div>

    </div>
}