import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './Components/Header/Header'
import NewToDo from './Components/NewToDo/NewToDo'
import ToDoEdit from './Components/ToDoEdit/ToDoEdit'
import ToDoList from './Components/ToDoList/ToDoList'
import './scss/app.scss'

function App() {
  return (
    <div className="app__container">
      <Header />
      <main className='main'>
        <Routes>
        <Route path="/" element={<ToDoList />} />
        <Route path="/edit/:id" element={<ToDoEdit />} />
        <Route path="/newToDo" element={<NewToDo />} />
      </Routes>
      </main>
      
    </div>
  )
}

export default App
