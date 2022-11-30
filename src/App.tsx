import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './Components/Header/Header'
import NewToDo from './Components/NewToDo/NewToDo'
import ToDoEdit from './Components/ToDoEdit/ToDoEdit'
import ToDoList from './Components/ToDoList/ToDoList'
import './scss/app.scss'
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { useStores } from './MobX/stores'

const app = initializeApp({
  apiKey: "AIzaSyAUv0yEka4ArEIuS0o3v_y5v5OlZ5BVSzo",
  authDomain: "womanup-todo-5749e.firebaseapp.com",
  projectId: "womanup-todo-5749e",
  storageBucket: "womanup-todo-5749e.appspot.com",
  messagingSenderId: "702773997321",
  appId: "1:702773997321:web:8546c5b7940844751b2dd8",
})

export const db = getFirestore(app);


function App() {
  const { toDoStore } = useStores()
  
  useEffect(() => {
    toDoStore.subscribeToDoList()
  }, [])

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
