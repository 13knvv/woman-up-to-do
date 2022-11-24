import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStores } from '../../MobX/stores'

const NewToDo = () => {
  const { toDoStore } = useStores()
  const newToDo = toDoStore.newToDo
  const navigate = useNavigate()


  const onChangeInput = (field: string, e: any) => {
    toDoStore.changeNewToDo(field, e)
  }

  const onClickSave = () => {
    toDoStore.saveNewToDo()
    navigate(`/`)
  }

  const onClickСancel = () => {
    toDoStore.clearNewToDo()
    navigate(`/`)
  }

  return (
    <li>
      <input
        type="text"
        value={newToDo.title}
        placeholder="Заголовок"
        onChange={(e) => onChangeInput('title', e)}
      />
      <input
        type="text"
        value={newToDo.text}
        placeholder="Текст"
        onChange={(e) => onChangeInput('text', e)}
      />
      <button onClick={onClickСancel}>Отмена</button>
      <button onClick={onClickSave}>Сохранить</button>
    </li>
  )
}

export default observer(NewToDo)
