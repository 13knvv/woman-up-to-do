import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { useStores } from '../../MobX/stores'
import { IToDo } from '../../MobX/ToDoStore'
import Deadline from '../Deadline/Deadline'
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

  const onChangeCompletedToDo = (e: any) => {
    toDoStore.changeCompletedToDo(props.toDo.id, e)
  }

  const onClickDeleteToDo = () => {
    toDoStore.deleteToDo(props.toDo.id)
  }

  return (
    <li className={props.toDo.completed ? 'todo todo__completed' : 'todo'}>
      <div className="todo__checkbox-wrapp">
        <input type="checkbox" checked={props.toDo.completed} onChange={onChangeCompletedToDo} />
      </div>

      <div className="todo__info" onClick={onClickToDo}>
        <div className="todo__header">
          <h2>{props.toDo.title}</h2>
          <Deadline completionDate={props.toDo.completionDate} />
        </div>

        <div className="todo__text">{props.toDo.text}</div>
        <Files toDo={props.toDo} />
      </div>
      <span className="todo__delete" onClick={onClickDeleteToDo}>
        Удалить
      </span>
    </li>
  )
}

export default observer(ToDo)
