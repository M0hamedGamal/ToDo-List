import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {Button, IconButton, Stack, Typography} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import {useReducer} from "react";
import CreateToDoModal from "./CreateToDo";
import TodoHeader from "./TodoHeader.jsx";
import Weather from "../weather/Weather.jsx";

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            const AddToState = [...state]

            const {title, description} = action.payload

            const now = new Date();
            const currentDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
            const currentTime = now.getHours() + ":" + now.getMinutes();
            const currentDateTime = currentDate + ' ' + currentTime;

            const newTodo = {id: AddToState.length + 1, title, description, createdAt: currentDateTime}
            AddToState.push(newTodo)
            localStorage.setItem('todo', JSON.stringify(AddToState))
            return AddToState

        case 'CHECKED':
            const newState = [...state]

            const rowId = action.payload.id

            const item = newState.find((row) => row.id === rowId)
            item.checked = !item.checked

            if (item.checked) {
                const today = new Date();
                const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                const time = today.getHours() + ":" + today.getMinutes();
                const dateTime = date + ' ' + time;
                item.finishedAt = dateTime
            } else {
                item.finishedAt = ''
            }

            localStorage.setItem('todo', JSON.stringify(newState))

            return newState
        case 'ACTION':
            const copiedState = [...state]

            const rowItem = action.payload.id

            const stateWithoutItem = copiedState.filter((row) => row.id !== rowItem)

            if (stateWithoutItem.length === 0)
                localStorage.clear()


            return stateWithoutItem
        default:
            return state
    }
}

const TodoList = () => {
    const cashedData = JSON.parse(localStorage.getItem('todo'))
    const [state, dispatch] = useReducer(reducer, cashedData || [])


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const columns = [
        {
            field: 'id', headerName: 'ID',
            minWidth: 150,
            sortable: false,
            flex: 1
        },
        {
            field: 'title', headerName: 'Title',
            minWidth: 150,
            sortable: false,
            flex: 1,

        },
        {
            field: 'description', headerName: 'Description',
            minWidth: 150,
            sortable: false,
            flex: 1,

        },
        {
            field: 'checked',
            headerName: 'Checked',
            type: 'boolean',
            minWidth: 150,
            sortable: false,
            flex: 1,
            renderCell: (cell) => {
                return (
                    <IconButton
                        onClick={() => {
                            dispatch({type: 'CHECKED', payload: cell.row})
                        }}
                    >
                        {cell.row.checked ? <DoneIcon/> : <CloseIcon/>}
                    </IconButton>
                );
            }

        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            sortable: false,
            flex: 1,
            minWidth: 150,

        },
        {
            field: 'finishedAt',
            headerName: 'Finished At',
            sortable: false,
            flex: 1,
            minWidth: 150,

        },
        {
            field: 'archivedAt',
            headerName: 'Archived At',
            sortable: false,
            flex: 1,
            minWidth: 150,

        },
        {
            field: "action",
            headerName: 'Action',
            minWidth: 150,
            sortable: false,
            flex: 1,
            renderCell: (cell) => {
                return (
                    <IconButton
                        onClick={() => {
                            dispatch({type: 'ACTION', payload: cell.row})
                        }}
                    >
                        <DeleteForeverIcon/>
                    </IconButton>
                );
            }
        }
    ];


    return (
        <div style={{height: 400, width: '100%'}}>
            <TodoHeader handleOpen={handleOpen}/>
            <DataGrid
                rows={state}
                columns={columns}
                disableColumnMenu
                initialState={{
                    pagination: {
                        paginationModel: {page: 0, pageSize: 5},
                    },
                }}
                pageSizeOptions={[5, 10]}
                components={{
                    NoRowsOverlay: () => (
                        <Stack height="100%" alignItems="center" justifyContent="center">
                            Create Your Todo List
                        </Stack>
                    )
                }}
            />
            <Weather/>
            <CreateToDoModal open={open} handleClose={handleClose} dispatch={dispatch}/>
        </div>
    );
}

export default TodoList
