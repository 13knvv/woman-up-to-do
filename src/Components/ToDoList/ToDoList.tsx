import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStores } from '../../MobX/stores'
import { IToDo } from '../../MobX/ToDoStore'
import ToDo from '../ToDo/ToDo'

const ToDoList = () => {
  const navigate = useNavigate()
  const { toDoStore } = useStores()
  const toDoList = toDoStore.toDoList

  useEffect(() => {
    //toDoStore.getToDoList()
  }, [])

  const toDoComponentsList = toDoList.map((toDo: IToDo) => {
    return <ToDo key={toDo.id} toDo={toDo} />
  })

  const onClickAddToDo = () => {
    navigate('/newToDo')
  }

  return (
    <div className="todo-list">
      <ul className="todo-list-items">{toDoComponentsList}</ul>
      <div>
        <button className="todo-add-button" onClick={onClickAddToDo}>
        
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 455 455" ><path d="M455 212.5H242.5V0h-30v212.5H0v30h212.5V455h30V242.5H455z"/></svg>
        </button>
      </div>
    </div>
  )
}

export default observer(ToDoList)
