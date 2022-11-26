import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStores } from '../../MobX/stores'
import Button from '../Button/Button'
import FormToDo from '../FormToDo/FormToDo'

const NewToDo = () => {
  const { toDoStore } = useStores()
  const newToDo = toDoStore.intermediateToDo
  const navigate = useNavigate()

  useEffect(() => {
    toDoStore.clearIntermediateToDo()
    return () => toDoStore.clearIntermediateToDo()
  }, [])

  const onClickSave = () => {
    toDoStore.saveNewToDo()
    navigate(`/`)
  }

  const onClickСancel = () => {
    navigate(`/`)
  }

  return (
    <div>
      <FormToDo />
      <div className="to-do__buttons">
        <Button type="back" onClick={onClickСancel}>
          Отмена
        </Button>
        <Button type="save" onClick={onClickSave}>
          Сохранить
        </Button>
      </div>
    </div>
  )
}

export default observer(NewToDo)
