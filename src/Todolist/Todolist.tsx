import React, {useCallback} from "react";
import {filterType, taskType} from "../App";
import s from "./Todolist.module.css"
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import {useDispatch} from "react-redux";
import {addTaskAC} from "../state/tasks-reducer";
import {Task} from "./Task";
import {changeTitleTodoListAC} from "../state/todoList-reducer";


type TodolistPropsType = {
    id: string
    title: string
    filterTasks: (filter: filterType, todolistId: string) => void
    filter: filterType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    tasks: taskType[]
}
export const Todolist = React.memo((props: TodolistPropsType) => {

    const dispatch = useDispatch()

    const onClickAll = () => props.filterTasks('All', props.id)
    const onClickCompleted = () => props.filterTasks('Completed', props.id)
    const onClickInProgress = () => props.filterTasks('InProgress', props.id)

    const onClickButtonHandler = () => {
        props.removeTodolist(props.id)
    }

    const addTask = useCallback((titleTask: string) => {
        dispatch(addTaskAC(titleTask, props.id))
    }, [props.id])
    const setNewTodolistTitle = useCallback((newTitle: string) => {
        dispatch(changeTitleTodoListAC(props.id, newTitle))
    }, [props.id])

    return <div className={s.Todolist}>
        <h3>
            <EditableSpan title={props.title} setNewTitle={setNewTodolistTitle}/>
            <IconButton color={'secondary'} onClick={onClickButtonHandler}>
                <DeleteTwoToneIcon/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {props.tasks.map(t => <Task key = {t.id} task={t} todoListId={props.id}/>)}
        </div>
        <div>
            <Button variant={props.filter === 'All' ? "contained" : "text"} color={'secondary'} onClick={onClickAll}>All</Button>
            <Button variant={props.filter === 'Completed' ? "contained" : "text"} color={'success'} onClick={onClickCompleted}>Completed</Button>
            <Button variant={props.filter === 'InProgress' ? "contained" : "text"} onClick={onClickInProgress}>InProgress</Button>
        </div>

    </div>
})

