import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStores } from '../../MobX/stores'
import Button from '../Button/Button'
import Deadline from '../Deadline/Deadline'
import Files from '../Files/Files'
import FormToDo from '../FormToDo/FormToDo'

const ToDoEdit = () => {
  const { toDoStore } = useStores()
  const toDo = toDoStore.intermediateToDo
  const completed = toDoStore.intermediateToDo.completed
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    toDoStore.setIntermediateToDo(Number(id))
    return () => toDoStore.clearIntermediateToDo()
  }, [])

  const onChangeCompleted = async (e: any) => {
    if (id) {
     await  toDoStore.updateCompletedToDo(Number(id), e)
     toDoStore.setIntermediateToDo(Number(id))
    }
  }

  const onClickSave = () => {
    setIsEditMode(false)
    toDoStore.saveToDo()
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
console.log(toDo.files)
  return (
    <div>
      {isEditMode ? (
        <>
          <FormToDo />
          <div className="to-do__buttons">
            <Button type="back" onClick={onClickСancel}>
              Отмена
            </Button>
            <Button type="save" onClick={onClickSave}>
              Сохранить
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="to-do-viewing__header">
            <div className="to-do-viewing__checkbox">
              <input
                type="checkbox"
                checked={completed}
                onChange={onChangeCompleted}
              />{' '}
              <span>Выполненно</span>
            </div>

            <div className="to-do-viewing__deadline-wrapp">
              { toDo.completionDate && <span>Срок:</span> }
              <Deadline completionDate={toDo.completionDate} />
            </div>
          </div>
          <div className="to-do-viewing__line"></div>

          <h2 className="to-do-viewing__title">{toDo.title}</h2>
          <div className="to-do-viewing__text">{toDo.text}</div>
          <Files toDo={toDo} />

          <div className="to-do__buttons">
            <Button type="back" onClick={onClickBack}>
              Назад
            </Button>
            <Button type="edit" onClick={onClickEdit}>
              Редактировать
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default observer(ToDoEdit)
