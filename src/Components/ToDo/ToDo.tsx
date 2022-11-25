import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { useStores } from '../../MobX/stores'
import { IToDo } from '../../MobX/ToDoStore'
import Files from '../Files/Files'

interface IPropsToDo {
  toDo: IToDo
}

const ToDo = (props: IPropsToDo) => {
  const { toDoStore } = useStores()
  const navigate = useNavigate()


  const onClickToDo = () => {
    navigate(`edit/${props.toDo.id}`)
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={props.toDo.completed}
        onChange={(e) => toDoStore.changeCompletedToDo(props.toDo.id, e)}
      />
      <div onClick={onClickToDo}>
        <h2>{props.toDo.title}</h2>
        <div>Сделать до: {props.toDo.completionDate}</div>
        <div>{props.toDo.text}</div>
        <Files toDo={props.toDo} />
      </div>
    </li>
  )
}

export default observer(ToDo)
