import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Todolist} from "../Todolist/Todolist";
import {Grid, Paper} from "@mui/material";
import {
    addTodolistTC,
    changeStatusTodoListAC,
    changeTitleTodoListTC,
    fetchTodoListsTC, filterType,
    removeTodolistTC, todolistDomainType,
} from "../state/todoList-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {useAppDispatch} from "../hooks/useAppDispatch";
import {tasksType} from "../state/tasks-reducer";
import {Navigate} from "react-router-dom";

export function TodoListsWithRedux() {

    const dispatch = useAppDispatch()
    const todoLists = useSelector<AppRootStateType, todolistDomainType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, tasksType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(fetchTodoListsTC())
    }, [])

    const changeFilterTodolist = useCallback((filter: filterType, todolistId: string) => {
        dispatch(changeStatusTodoListAC(todolistId, filter))
    }, [dispatch])
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [dispatch])
    const addTodolist = useCallback((todolistTitle: string) => {
        dispatch(addTodolistTC(todolistTitle))
    }, [dispatch])
    const changeTodolistTitle = useCallback((todoListId: string, newTitle: string) => {
        dispatch(changeTitleTodoListTC(todoListId, newTitle))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return <Grid container>
        <Grid container>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        {todoLists.map(tl => {
            return <Grid item style={{margin: "20px"}} key={tl.id}>
                <Paper elevation={6} style={{padding: "10px"}}>
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        filterTasks={changeFilterTodolist}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                        tasks={tasks[tl.id]}
                        entityStatus={tl.entityStatus}
                    />
                </Paper>
            </Grid>
        })}
    </Grid>
}