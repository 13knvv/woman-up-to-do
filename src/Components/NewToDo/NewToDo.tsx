import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStores } from '../../MobX/stores'
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
      <button onClick={onClickСancel}>Отмена</button>
      <button onClick={onClickSave}>Сохранить</button>
    </div>
  )
}

export default observer(NewToDo)
