import React from 'react';
import {Switch} from "@mui/material";

function Toggle({toggleDarkMode, toggleDarkTheme}) {
    localStorage.setItem('isDark', toggleDarkMode)
    return (
        <div className='todo-dark-mode'>
            <span className='todo-dark-mode-icon'>🔆</span>
            <Switch checked={toggleDarkMode} onChange={toggleDarkTheme}/>
            <span className='todo-dark-mode-icon'>🌙</span>
        </div>
    );
}

export default Toggle;
