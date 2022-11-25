import { useStores } from '../../MobX/stores'
import { IToDo } from '../../MobX/ToDoStore'

interface IPropsFiles {
  toDo: IToDo
  editMode?: boolean
}

const Files = (props: IPropsFiles) => {
  const { toDoStore } = useStores()

  const onClickDeleteFile = (index: number) => {
    toDoStore.deleteFileToDo(index)
  }

  const files = props.toDo.files?.map((fileObj, index) => {
    return (
      <div key={Date.now() + Math.random()}>
        <a href={URL.createObjectURL(fileObj)} download>
          {fileObj.name}
        </a>
        {props.editMode && <button onClick={() => onClickDeleteFile(index)}>x</button>}
      </div>
    )
  })

  return <div>{files}</div>
}

export default Files
