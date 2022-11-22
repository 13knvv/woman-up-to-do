import { useEffect, useState } from 'react'
import ToDo from '../ToDo/ToDo'

const todoArr = [
  { id: 0, title: 'Загол', text: 'Сделать ToDo лист', completionDate: '28.11.2022', files: [] },
  { id: 1, title: 'Заголовок', text: 'Сделать ToDo лист', completionDate: '28.11.2022', files: [] },
  { id: 2, title: 'Заголовок', text: 'Сделать ToDo лист', completionDate: '28.11.2022', files: [] },
]

export interface IToDo {
  id: number
  title: string
  text: string
  completionDate: string
  files: Array<any>
}

const ToDoList = () => {
  const [toDoArr, setToDoArr] = useState<IToDo[]>([])

  useEffect(() => {
    setToDoArr(todoArr)
  }, [])

  const handleChangeInput = (id: number, field: string, e: any) => {
    const newToDoArr = toDoArr.map((toDo) => {
      if (toDo.id === id) {
        return { ...toDo, [field]: e.target.value }
      }
      return toDo
    })
    setToDoArr(newToDoArr)
  }

  const toDoList = toDoArr.map((toDo: IToDo) => {
    return <ToDo key={toDo.id} toDo={toDo} handleChangeInput={handleChangeInput} />
  })

  const onClickAddToDo = () => {}
  const onClickOpenPopupAddToDo = () => {}

  return (
    <div>
      <ul>{toDoList}</ul>
      <div>
        <button onClick={onClickOpenPopupAddToDo}>Добавить</button>
        <button onClick={onClickAddToDo}>Готово</button>
      </div>
    </div>
  )
}

export default ToDoList
