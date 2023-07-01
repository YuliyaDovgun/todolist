import React, {memo, useCallback} from "react";
import s from "./Todolist.module.css";
import {changeTaskStatusAC, changeTaskTitleAC, removeTackTC} from "../state/tasks-reducer";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import {taskRT, TaskStatuses} from "../api/task-api";
import {useAppDispatch} from "../hooks/useAppDispatch";

type TaskPropsType = {
    task: taskRT
    todoListId: string
}
export const Task: React.FC<TaskPropsType> = memo(({task, todoListId}) => {
    const classNameIsDone = task.status ? s.isDone : ""
    const dispatch = useAppDispatch()


    const onClickButtonHandler = () => {
        dispatch(removeTackTC(todoListId, task.id))
    }
    const onClickInputHandler = () => {
        dispatch(changeTaskStatusAC(task.id, task.status === TaskStatuses.New ? TaskStatuses.InProgress : TaskStatuses.New, todoListId))
    }
    const setNewTaskTitle = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(task.id, newTitle, todoListId))
    }, [])

    return <div key={task.id}>
        <Checkbox checked={task.status !== TaskStatuses.New} onClick={onClickInputHandler} color="secondary"/>
        <EditableSpan className={classNameIsDone} title={task.title} setNewTitle={setNewTaskTitle}/>
        <IconButton color={'secondary'} onClick={onClickButtonHandler}>
            <DeleteTwoToneIcon/>
        </IconButton>
    </div>
})