import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {TextField} from "@mui/material";
import {useState} from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
};

export default function CreateToDoModal({open, handleClose, dispatch}) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const submit = () => {
        dispatch({type: 'ADD', payload: {title, description}})
        handleClose()
    }
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='todo-modal'
            >
                <Box sx={style}>
                    <div className='todo-modal-items'>
                    <TextField label="Title" variant="standard" style={{margin: '24px'}} value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <TextField label="Description" variant="standard" style={{margin: '24px'}} value={description} onChange={(e) => setDescription(e.target.value)}/>
                    <Button onClick={submit}>Submit</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
