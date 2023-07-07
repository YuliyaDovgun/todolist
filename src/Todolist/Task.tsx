import React, {memo, useCallback} from "react";
import s from "./Todolist.module.css";
import {removeTackTC, taskDomainType, updateTaskTC} from "../state/tasks-reducer";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import {TaskStatuses} from "../api/task-api";
import {useAppDispatch} from "../hooks/useAppDispatch";

type TaskPropsType = {
    task: taskDomainType
    todoListId: string
}
export const Task: React.FC<TaskPropsType> = memo(({task, todoListId}) => {
    const classNameIsDone = task.status ? s.isDone : ""
    const dispatch = useAppDispatch()


    const onClickButtonHandler = () => {
        dispatch(removeTackTC(todoListId, task.id))
    }
    const onClickInputHandler = () => {
        dispatch(updateTaskTC(todoListId, task.id, {status: task.status === TaskStatuses.New ? TaskStatuses.InProgress : TaskStatuses.New}))
    }
    const setNewTaskTitle = useCallback((newTitle: string) => {
        dispatch(updateTaskTC(todoListId, task.id, {title: newTitle}))
    }, [])

    return <div key={task.id}>
        <Checkbox checked={task.status !== TaskStatuses.New} onClick={onClickInputHandler} color="secondary" disabled={task.entityStatus === 'loading'}/>
        <EditableSpan className={classNameIsDone} title={task.title} setNewTitle={setNewTaskTitle} disabled={task.entityStatus === 'loading'}/>
        <IconButton color={'secondary'} onClick={onClickButtonHandler} disabled={task.entityStatus === 'loading'}>
            <DeleteTwoToneIcon/>
        </IconButton>
    </div>
})