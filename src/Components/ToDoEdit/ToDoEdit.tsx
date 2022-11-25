import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStores } from '../../MobX/stores'
import Files from '../Files/Files'
import FormToDo from '../FormToDo/FormToDo'

const ToDoEdit = () => {
  const { toDoStore } = useStores()
  const toDo = toDoStore.intermediateToDo
  const files = toDoStore.intermediateToDo.files
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    toDoStore.setIntermediateToDo(Number(id))
    return () => toDoStore.clearIntermediateToDo()
  }, [])

  const onClickSave = () => {
    setIsEditMode(false)
    toDoStore.saveEditedToDo()
  }

  const onClickEdit = () => {
    setIsEditMode(true)
  }

  const onClickСancel = () => {
    setIsEditMode(false)
    toDoStore.setIntermediateToDo(Number(id))
  }

  const onClickBack = () => {
    navigate(`/`)
  }

  return (
    <div>
      {isEditMode ? (
        <>
          <FormToDo />
          <button onClick={onClickСancel}>Отмена</button>
          <button onClick={onClickSave}>Сохранить</button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={toDo.completed}
            onChange={(e) => toDoStore.changeCompletedToDo(toDo.id, e)}
          />
          <h2>{toDo.title}</h2>
          <div>Сделать до: {toDo.completionDate}</div>
          <div>{toDo.text}</div>
          <Files toDo={toDo} />

          <button onClick={onClickBack}>Назад</button>
          <button onClick={onClickEdit}>Редактировать</button>
        </>
      )}
    </div>
  )
}

export default observer(ToDoEdit)
