import React from "react";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Todolist} from "../Todolist/Todolist";
import {filterType, tasksType, taskType, TodolistType} from "../App";
import {Grid, Paper} from "@mui/material";
import {
    addTodoListAC,
    changeStatusTodoListAC,
    changeTitleTodoListAC,
    removeTodolistAC
} from "../state/todoList-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../state/store";

export function TodoListsWithRedux() {
    const dispatch = useDispatch()
    const todoLists = useSelector<AppStoreType, TodolistType[]>( state => state.todoLists)
    const tasks = useSelector<AppStoreType, tasksType>( state => state.tasks)

    const deleteTask = (id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId))
    }
    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }
    const changeStatusTask = (id: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todolistId))
    }
    const changeTitleTask = (id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId))
    }

    const changeFilterTodolist = (filter: filterType, todolistId: string) => {
        dispatch(changeStatusTodoListAC(todolistId, filter))
    }
    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }
    const addTodolist = (todolistTitle: string) => {
        dispatch(addTodoListAC(todolistTitle))
    }
    const changeTodolistTitle = (todoListId: string, newTitle: string) => {
        dispatch(changeTitleTodoListAC(todoListId, newTitle))
    }
    return <Grid container>
        <Grid container>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        {todoLists.map(tl => {
            let filteredTasks: taskType[] = tasks[tl.id]
            if (tl.filter === 'Completed') {
                filteredTasks = tasks[tl.id].filter(t => t.isDone)
            }
            if (tl.filter === 'InProgress') {
                filteredTasks = tasks[tl.id].filter(t => !t.isDone)
            }

            return <Grid item style={{margin: "20px"}}>
                <Paper elevation={6} style={{padding: "10px"}}>
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={filteredTasks}
                        deleteTask={deleteTask}
                        filterTasks={changeFilterTodolist}
                        addTask={addTask}
                        changeStatus={changeStatusTask}
                        changeTitle={changeTitleTask}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
        })}
    </Grid>
}