import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './Components/Header/Header'
import ToDoEdit from './Components/ToDoEdit/ToDoEdit'
import ToDoList from './Components/ToDoList/ToDoList'
import './scss/app.scss'

function App() {
  return (
    <div className="app_container">
      <Header />
      <Routes>
        <Route path="/" element={<ToDoList />} />
        <Route path="/edit/:id" element={<ToDoEdit />} />
      </Routes>
    </div>
  )
}

export default App
