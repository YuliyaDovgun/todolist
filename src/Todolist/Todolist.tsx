import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterType, tasksType} from "../App";
import s from "./Todolist.module.css"

type TodolistPropsType = {
    title: string
    tasks: tasksType[]
    deleteTask: (id: string) => void
    filterTasks: (filter: filterType) => void
    addTask: (title: string) => void
}
export const Todolist = (props: TodolistPropsType) => {

    const [taskTitle, setTaskTitle] = useState('')

    const onClickHandler = () => {
        props.addTask(taskTitle)
        setTaskTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.code === "Enter") onClickHandler()
    }

    const onClickAll = () => props.filterTasks('All')
    const onClickCompleted = () => props.filterTasks('Completed')
    const onClickInProgress = () => props.filterTasks('InProgress')

    return <div className={s.Todolist}>
        <h3>{props.title}</h3>
        <div>
            <input value={taskTitle} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            <button onClick={onClickHandler}>+</button>
        </div>
        <ul>
            {props.tasks.map(t => {

                const onClickButtonHandler = () => props.deleteTask(t.id)

                return <li key={t.id}>
                <input type={'checkbox'} checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={onClickButtonHandler}>X</button>
            </li>})}
        </ul>
        <div>
            <button onClick={onClickAll}>All</button>
            <button onClick={onClickCompleted}>Completed</button>
            <button onClick={onClickInProgress}>InProgress</button>
        </div>

    </div>
}