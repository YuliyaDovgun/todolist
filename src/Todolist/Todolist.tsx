import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterType, tasksType} from "../App";
import s from "./Todolist.module.css"

type TodolistPropsType = {
    id: string
    title: string
    tasks: tasksType[]
    deleteTask: (id: string, todolistId: string) => void
    filterTasks: (filter: filterType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: filterType
    removeTodolist: (todolistId: string) => void
}
export const Todolist = (props: TodolistPropsType) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onClickHandler = () => {
        if (taskTitle.trim() !== "") {
            props.addTask(taskTitle, props.id)
            setTaskTitle('')
        } else {
            setError('Title is required!')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value.trim())
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.code === "Enter" && e.currentTarget.value.trim() !== "") {
            onClickHandler()
        } else {
            setError('Title is required!')
        }
    }

    const onClickAll = () => props.filterTasks('All', props.id)
    const onClickCompleted = () => props.filterTasks('Completed', props.id)
    const onClickInProgress = () => props.filterTasks('InProgress', props.id)

    const onClickButtonHandler = () => {
        props.removeTodolist(props.id)
    }
    return <div className={s.Todolist}>
            <h3>{props.title}<button onClick={onClickButtonHandler}>X</button></h3>
        <div>
            <input className={error ? s.input : ""} value={taskTitle} onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}/>
            <button onClick={onClickHandler}>+</button>
            {error && <div className={error ? s.error : ""}>{error}</div>}
        </div>
        <ul>
            {props.tasks.map(t => {

                const onClickButtonHandler = () => props.deleteTask(t.id, props.id)
                const onClickInputHandler = () => props.changeStatus(t.id, !t.isDone, props.id)

                return <li key={t.id}>
                    <input type={'checkbox'} checked={t.isDone} onClick={onClickInputHandler}/>
                    <span className={t.isDone ? s.isDone : ""}>{t.title}</span>
                    <button onClick={onClickButtonHandler}>X</button>
                </li>
            })}
        </ul>
        <div>
            <button className={props.filter === 'All' ? s.active : ""} onClick={onClickAll}>All</button>
            <button className={props.filter === 'Completed' ? s.active : ""} onClick={onClickCompleted}>Completed
            </button>
            <button className={props.filter === 'InProgress' ? s.active : ""} onClick={onClickInProgress}>InProgress
            </button>
        </div>

    </div>
}