import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { IToDo } from '../../MobX/ToDoStore'

interface IPropsToDo {
  toDo: IToDo
}

const ToDo = (props: IPropsToDo) => {
  const navigate = useNavigate()

  const changeEditMode = () => {
    navigate(`edit/${props.toDo.id}`)
  }

  return (
    <li>
      <input type="checkbox" name="" id="" />
      <h2 onClick={changeEditMode}>{props.toDo.title}</h2>
      <div onClick={changeEditMode}>{props.toDo.text}</div>
    </li>
  )
}

export default observer(ToDo)
