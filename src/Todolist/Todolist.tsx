import React, {useState} from "react";
import {filterType, tasksType, taskType} from "../App";
import s from "./Todolist.module.css"
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, Checkbox, IconButton } from "@mui/material";
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";


type TodolistPropsType = {
    id: string
    title: string
    filterTasks: (filter: filterType, todolistId: string) => void
    filter: filterType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}
export const Todolist = (props: TodolistPropsType) => {

    const dispatch = useDispatch()
    const tasks = useSelector<AppStoreType, tasksType>( state => state.tasks)

    const [todoListTitle, setTodolistTitle] = useState<string>(props.title)

    let filteredTasks: taskType[] = tasks[props.id]
    if (props.filter === 'Completed') {
        filteredTasks = tasks[props.id].filter(t => t.isDone)
    }
    if (props.filter === 'InProgress') {
        filteredTasks = tasks[props.id].filter(t => !t.isDone)
    }

    const onClickAll = () => props.filterTasks('All', props.id)
    const onClickCompleted = () => props.filterTasks('Completed', props.id)
    const onClickInProgress = () => props.filterTasks('InProgress', props.id)

    const onClickButtonHandler = () => {
        props.removeTodolist(props.id)
    }

    const addTask = (titleTask: string) => {
        dispatch(addTaskAC(titleTask, props.id))
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
            {filteredTasks.map(t => {

                const classNameIsDone = t.isDone ? s.isDone : ""

                const onClickButtonHandler = () => {
                    dispatch(removeTaskAC(t.id, props.id))
                }
                const onClickInputHandler = () => {
                    dispatch(changeTaskStatusAC(t.id, !t.isDone, props.id))
                }
                const setNewTaskTitle = (newTitle: string) => {
                    dispatch(changeTaskTitleAC(t.id, newTitle, props.id))
                }

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

