import React from 'react'
import Header from './Components/Header/Header'
import ToDoList from './Components/ToDoList/ToDoList'
import './scss/app.scss'

function App() {
  return (
    <div className="app_container">
      <Header />
      <ToDoList />
    </div>
  )
}

export default App
