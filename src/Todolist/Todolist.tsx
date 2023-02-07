import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterType, tasksType} from "../App";
import s from "./Todolist.module.css"

type TodolistPropsType = {
    title: string
    tasks: tasksType[]
    deleteTask: (id: string) => void
    filterTasks: (filter: filterType) => void
    addTask: (title: string) => void
    changeStatus: (id: string, isDone: boolean) => void
    filter: filterType
}
export const Todolist = (props: TodolistPropsType) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onClickHandler = () => {
        if(taskTitle.trim() !== "") {
            props.addTask(taskTitle)
            setTaskTitle('')
        }
        else {
            setError('Title is required!')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value.trim())
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if(e.code === "Enter" && e.currentTarget.value.trim() !== "") {
            onClickHandler()
        }
        else {
            setError('Title is required!')
        }
    }

    const onClickAll = () => props.filterTasks('All')
    const onClickCompleted = () => props.filterTasks('Completed')
    const onClickInProgress = () => props.filterTasks('InProgress')

    return <div className={s.Todolist}>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? s.input : ""} value={taskTitle} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            <button onClick={onClickHandler}>+</button>
            {error && <div className={error ? s.error: ""}>{error}</div>}
        </div>
        <ul>
            {props.tasks.map(t => {

                const onClickButtonHandler = () => props.deleteTask(t.id)
                const onClickInputHandler = () => props.changeStatus(t.id, !t.isDone)

                return <li key={t.id}>
                <input type={'checkbox'} checked={t.isDone} onClick={onClickInputHandler}/>
                <span className={t.isDone ? s.isDone : ""}>{t.title}</span>
                <button onClick={onClickButtonHandler}>X</button>
            </li>})}
        </ul>
        <div>
            <button className={props.filter === 'All' ? s.active: ""} onClick={onClickAll}>All</button>
            <button className={props.filter === 'Completed' ? s.active: ""} onClick={onClickCompleted}>Completed</button>
            <button className={props.filter === 'InProgress' ? s.active: ""} onClick={onClickInProgress}>InProgress</button>
        </div>

    </div>
}