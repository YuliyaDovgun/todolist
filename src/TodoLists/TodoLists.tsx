import {v1} from "uuid";
import React, {useState} from "react";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Todolist} from "../Todolist/Todolist";
import {filterType, tasksType, taskType, TodolistType} from "../App";
import {Grid, Paper} from "@mui/material";

export function TodoLists() {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to do', filter: 'All',},
        {id: todolistId2, title: 'What to learn', filter: 'All'},
    ])

    const [tasks, setTasks] = useState<tasksType>({
        [todolistId1]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'Fish', isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'English', isDone: true},
        ],
    })
    const deleteTask = (id: string, todolistId: string) => {
        tasks[todolistId] = tasks[todolistId].filter(t => t.id !== id)
        setTasks({...tasks})
    }
    const addTask = (title: string, todolistId: string) => {
        tasks[todolistId] = [{id: v1(), title, isDone: false}, ...tasks[todolistId]]
        setTasks({...tasks})
    }
    const changeStatusTask = (id: string, isDone: boolean, todolistId: string) => {
        tasks[todolistId] = tasks[todolistId].map(t => t.id === id ? {...t, isDone} : t)
        setTasks({...tasks})
    }
    const changeTitleTask = (id: string, newTitle: string, todolistId: string) => {
        tasks[todolistId] = tasks[todolistId].map(t => t.id === id ? {...t, title: newTitle} : t)
        setTasks({...tasks})
    }

    const changeFilterTodolist = (filter: filterType, todolistId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
    }
    const removeTodolist = (todolistId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    const addTodolist = (todolistTitle: string) => {
        const newTodolist: TodolistType = {id: v1(), title: todolistTitle, filter: 'All'}
        setTodoLists([newTodolist, ...todoLists])
        setTasks({[newTodolist.id]: [], ...tasks})
    }
    const changeTodolistTitle = (todoListId: string, newTitle: string) => {
        const activeTodolist = todoLists.find(tl => tl.id === todoListId)

        if (activeTodolist) {
            return {...activeTodolist, title: newTitle}
        }
        setTodoLists([...todoLists])
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