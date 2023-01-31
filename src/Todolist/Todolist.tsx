import React from "react";
import {filterType, tasksType} from "../App";
import s from "./Todolist.module.css"

type TodolistPropsType = {
    title: string
    tasks: tasksType[]
    deleteTask: (id: number) => void
    filterTasks: (filter: filterType) => void
}
export const Todolist = (props: TodolistPropsType) => {
    return <div className={s.Todolist}>
        <h3>{props.title}</h3>
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
            <button onClick={() => props.filterTasks('All')}>All</button>
            <button onClick={() => props.filterTasks('Completed')}>Completed</button>
            <button onClick={() => props.filterTasks('InProgress')}>InProgress</button>
        </div>

    </div>
}