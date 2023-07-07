import React, {useCallback, useEffect} from "react";
import s from "./Todolist.module.css"
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import {addTackTC, fetchTasksTC, taskDomainType} from "../state/tasks-reducer";
import {Task} from "./Task";
import {TaskStatuses} from "../api/task-api";
import {useAppDispatch} from "../hooks/useAppDispatch";
import {appStatusType} from "../state/app-reducer";
import {filterType} from "../state/todoList-reducer";


type TodolistPropsType = {
    id: string
    title: string
    filterTasks: (filter: filterType, todolistId: string) => void
    filter: filterType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    tasks: taskDomainType[]
    entityStatus: appStatusType
}
export const Todolist = React.memo((props: TodolistPropsType) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
            dispatch(fetchTasksTC(props.id))
    }, [props.id])

    const onClickAll = () => props.filterTasks('All', props.id)
    const onClickCompleted = () => props.filterTasks('Completed', props.id)
    const onClickInProgress = () => props.filterTasks('InProgress', props.id)

    const onClickButtonHandler = () => {
        props.removeTodolist(props.id)
    }

    const addTask = useCallback((titleTask: string) => {
        dispatch(addTackTC(props.id, titleTask))
    }, [props.id])
    const setNewTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.id, props.changeTodolistTitle])

    let tasksForTodolist = props.tasks

    if (props.filter === 'InProgress') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'Completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.InProgress)
    }

    return <div className={s.Todolist}>
        <h3>
            <EditableSpan title={props.title} setNewTitle={setNewTodolistTitle}/>
            <IconButton color={'secondary'} onClick={onClickButtonHandler} disabled={props.entityStatus === 'loading'}>
                <DeleteTwoToneIcon/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {tasksForTodolist.map(t => <Task key={t.id} task={t} todoListId={props.id}/>)}
        </div>
        <div>
            <Button variant={props.filter === 'All' ? "contained" : "text"} color={'secondary'}
                    onClick={onClickAll}>All</Button>
            <Button variant={props.filter === 'Completed' ? "contained" : "text"} color={'success'}
                    onClick={onClickCompleted}>Completed</Button>
            <Button variant={props.filter === 'InProgress' ? "contained" : "text"}
                    onClick={onClickInProgress}>InProgress</Button>
        </div>

    </div>
})

