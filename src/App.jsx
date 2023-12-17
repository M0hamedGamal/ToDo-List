import React, {useState} from "react";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import './App.css'
import Navbar from "./navbar/Navbar.jsx";
import TodoList from "./components/todoList/TodoList.jsx";

function App() {
    const cashedMode = localStorage.getItem('isDark')

    const [toggleDarkMode, setToggleDarkMode] = useState(cashedMode === 'true');

    const toggleDarkTheme = () => {
        setToggleDarkMode(!toggleDarkMode);
    };

    const darkTheme = createTheme({
        palette: {
            mode: toggleDarkMode ? 'dark' : 'light',
            primary: {
                main: '#90caf9',
            },
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Navbar toggleDarkMode={toggleDarkMode} toggleDarkTheme={toggleDarkTheme}/>
            <div className='todo'>
                <TodoList />
            </div>
        </ThemeProvider>
    )
}

export default App
