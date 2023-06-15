import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Todolist} from "../Todolist/Todolist";
import {filterType, tasksType} from "../App";
import {Grid, Paper} from "@mui/material";
import {
    addTodoListAC,
    changeStatusTodoListAC,
    changeTitleTodoListAC,
    fetchTodoListsTC,
    removeTodolistAC,
    todolistDomainType
} from "../state/todoList-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../state/store";

export function TodoListsWithRedux() {

    const dispatch = useDispatch()
    const todoLists = useSelector<AppStoreType, todolistDomainType[]>(state => state.todoLists)
    const tasks = useSelector<AppStoreType, tasksType>( state => state.tasks)

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchTodoListsTC())
    }, [])

    const changeFilterTodolist = useCallback((filter: filterType, todolistId: string) => {
        dispatch(changeStatusTodoListAC(todolistId, filter))
    }, [dispatch])
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [dispatch])
    const addTodolist = useCallback((todolistTitle: string) => {
        dispatch(addTodoListAC(todolistTitle))
    }, [dispatch])
    const changeTodolistTitle = useCallback((todoListId: string, newTitle: string) => {
        dispatch(changeTitleTodoListAC(todoListId, newTitle))
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