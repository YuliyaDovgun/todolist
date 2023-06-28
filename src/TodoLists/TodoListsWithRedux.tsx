import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Todolist} from "../Todolist/Todolist";
import {filterType, tasksType} from "../App";
import {Grid, Paper} from "@mui/material";
import {
    addTodolistTC,
    changeStatusTodoListAC,
    changeTitleTodoListTC,
    fetchTodoListsTC,
    removeTodolistTC,
    todolistDomainType
} from "../state/todoList-reducer";
import {useSelector} from "react-redux";
import {AppStoreType} from "../state/store";
import {useAppDispatch} from "../hooks/useAppDispatch";

export function TodoListsWithRedux() {

    const dispatch = useAppDispatch()
    const todoLists = useSelector<AppStoreType, todolistDomainType[]>(state => state.todoLists)
    const tasks = useSelector<AppStoreType, tasksType>( state => state.tasks)

    useEffect(() => {
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

    return <Grid container>
        <Grid container>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        {todoLists.map(tl => {
            return <Grid item style={{margin: "20px"}}  key={tl.id}>
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
                    />
                </Paper>
            </Grid>
        })}
    </Grid>
}