import React from 'react';
import {Button, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add.js";

function TodoHeader({handleOpen}) {
    return (
        <div className="todo-add-container">
            <Typography variant="h5" gutterBottom>ToDo List</Typography>
            <Button onClick={handleOpen}><AddIcon/></Button>
        </div>    );
}

export default TodoHeader;
