import React from 'react';
import Toggle from "../toggle/Toggle.jsx";

function Navbar({toggleDarkMode, toggleDarkTheme}) {
    return (
        <div className='todo-navbar'>
            <h1 className='todo-navbar-brand'>ToDo List</h1>
            <Toggle toggleDarkMode={toggleDarkMode} toggleDarkTheme={toggleDarkTheme}/>
        </div>
    );
}

export default Navbar;
