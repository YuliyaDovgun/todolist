import React from "react";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Todolist} from "../Todolist/Todolist";
import {filterType, TodolistType} from "../App";
import {Grid, Paper} from "@mui/material";
import {
    addTodoListAC,
    changeStatusTodoListAC,
    changeTitleTodoListAC,
    removeTodolistAC
} from "../state/todoList-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../state/store";

export function TodoListsWithRedux() {
    console.log('TodoLists')
    const dispatch = useDispatch()
    const todoLists = useSelector<AppStoreType, TodolistType[]>( state => state.todoLists)

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

            return <Grid item style={{margin: "20px"}}  key={tl.id}>
                <Paper elevation={6} style={{padding: "10px"}}>
                    <Todolist
                        id={tl.id}
                        title={tl.title}
                        filterTasks={changeFilterTodolist}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
        })}
    </Grid>
}