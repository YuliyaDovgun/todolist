import React, {useState} from "react";
import {filterType, taskType} from "../App";
import s from "./Todolist.module.css"
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, Checkbox, IconButton } from "@mui/material";
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';


type TodolistPropsType = {
    id: string
    title: string
    tasks: taskType[]
    deleteTask: (id: string, todolistId: string) => void
    filterTasks: (filter: filterType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTitle: (id: string, newTitle: string, todolistId: string) => void
    filter: filterType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}
export const Todolist = (props: TodolistPropsType) => {

    const [todoListTitle, setTodolistTitle] = useState<string>(props.title)

    const onClickAll = () => props.filterTasks('All', props.id)
    const onClickCompleted = () => props.filterTasks('Completed', props.id)
    const onClickInProgress = () => props.filterTasks('InProgress', props.id)

    const onClickButtonHandler = () => {
        props.removeTodolist(props.id)
    }

    const addTask = (titleTask: string) => {
        props.addTask(titleTask, props.id)
    }
    const setNewTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
        setTodolistTitle(newTitle)
    }

    return <div className={s.Todolist}>
        <h3>
            <EditableSpan title={todoListTitle} setNewTitle={setNewTodolistTitle}/>
            <IconButton color={'secondary'} onClick={onClickButtonHandler}>
                <DeleteTwoToneIcon/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {props.tasks.map(t => {

                const classNameIsDone = t.isDone ? s.isDone : ""

                const onClickButtonHandler = () => props.deleteTask(t.id, props.id)
                const onClickInputHandler = () => props.changeStatus(t.id, !t.isDone, props.id)
                const setNewTaskTitle = (newTitle: string) => props.changeTitle(t.id, newTitle, props.id)

                return <div key={t.id}>
                    <Checkbox checked={t.isDone} onClick={onClickInputHandler} color="secondary" />
                    <EditableSpan className={classNameIsDone} title={t.title} setNewTitle={setNewTaskTitle}/>
                    <IconButton color={'secondary'} onClick={onClickButtonHandler}>
                        <DeleteTwoToneIcon/>
                    </IconButton>
                </div>
            })}
        </div>
        <div>
            <Button variant={props.filter === 'All' ? "contained" : "text"} color={'secondary'} onClick={onClickAll}>All</Button>
            <Button variant={props.filter === 'Completed' ? "contained" : "text"} color={'success'} onClick={onClickCompleted}>Completed</Button>
            <Button variant={props.filter === 'InProgress' ? "contained" : "text"} onClick={onClickInProgress}>InProgress</Button>
        </div>

    </div>
}

