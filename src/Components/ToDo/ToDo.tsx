import { useState } from 'react'
import { IToDo } from '../ToDoList/ToDoList'

interface IPropsToDo {
  toDo: IToDo
  handleChangeInput: (id: number, field: string, e: any) => void
}

const ToDo = (props: IPropsToDo) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)

  const onChangeInput = (id: number, field: string, e: any) => {
    props.handleChangeInput(id, field, e)
  }

  const changeEditMode = (boolean: boolean) => {
    setIsEditMode(boolean)
  }

  return (
    <li>
      {isEditMode ? (
        <>
          <input
            type="text"
            value={props.toDo.title}
            placeholder="Заголовок"
            onChange={(e) => onChangeInput(props.toDo.id, 'title', e)}
          />
          <input
            type="text"
            value={props.toDo.text}
            placeholder="Текст"
            onChange={(e) => onChangeInput(props.toDo.id, 'text', e)}
          />
          <button onClick={() => changeEditMode(false)}>ok</button>
        </>
      ) : (
        <>
          <h2>{props.toDo.title}</h2>
          <div>{props.toDo.text}</div>
          <button onClick={() => changeEditMode(true)}>Edit</button>
        </>
      )}
    </li>
  )
}

export default ToDo
