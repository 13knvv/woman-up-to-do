import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStores } from '../../MobX/stores'

const ToDoEdit = () => {
  const { toDoStore } = useStores()
  const toDo = toDoStore.editableToDo
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    toDoStore.setEditableToDo(Number(id))
  }, [])

  const onChangeInput = (field: string, e: any) => {
    toDoStore.changeEditableToDo(field, e)
  }

  const onClickSave = () => {
    setIsEditMode(false)
    toDoStore.saveEditedToDo()
  }

  const onClickEdit = () => {
    setIsEditMode(true)
  }

  const onClickСancel = () => {
    setIsEditMode(false)
    toDoStore.setEditableToDo(Number(id))
  }

  const onClickBack = () => {
    navigate(`/`)
  }

  return (
    <li>
      <button onClick={onClickBack}>back</button>
      {isEditMode ? (
        <>
          <input
            type="text"
            value={toDo?.title}
            placeholder="Заголовок"
            onChange={(e) => onChangeInput('title', e)}
          />
          <input
            type="text"
            value={toDo?.text}
            placeholder="Текст"
            onChange={(e) => onChangeInput('text', e)}
          />
          <button onClick={onClickСancel}>Отмена</button>
          <button onClick={onClickSave}>Сохранить</button>
        </>
      ) : (
        <>
          <h2>{toDo?.title}</h2>
          <div>{toDo?.text}</div>
          <button>Выполненно</button>
          <button onClick={onClickEdit}>Редактировать</button>
        </>
      )}
    </li>
  )
}

export default observer(ToDoEdit)
