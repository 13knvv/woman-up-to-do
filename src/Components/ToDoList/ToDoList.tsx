import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useStores } from '../../MobX/stores'
import { IToDo } from '../../MobX/ToDoStore'
import ToDo from '../ToDo/ToDo'

const ToDoList = () => {
  const { toDoStore } = useStores()
  const toDoList = toDoStore.toDoList

  useEffect(() => {
    //toDoStore.getToDoList()
  }, [])

  const toDoComponentsList = toDoList.map((toDo: IToDo) => {
    return <ToDo key={toDo.id} toDo={toDo} />
  })

  const onClickAddToDo = () => {}

  return (
    <div>
      <ul>{toDoComponentsList}</ul>
      <div>
        <button onClick={onClickAddToDo}>+</button>
      </div>
    </div>
  )
}

export default observer(ToDoList)
