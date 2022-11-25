import { useStores } from '../../MobX/stores'
import Files from '../Files/Files'

const FormToDo = () => {
  const { toDoStore } = useStores()
  const toDo = toDoStore.intermediateToDo

  const onChangeInput = (field: string, e: any) => {
    toDoStore.changeIntermediateToDo(field, e)
  }

  const onChangeInputFile = (e: any) => {
    toDoStore.addIntermediateFileToDo(e)
  }

  return (
    <div>
      <input
        type="text"
        value={toDo.title}
        placeholder="Заголовок"
        onChange={(e) => onChangeInput('title', e)}
      />
      <input
        type="date"
        value={toDo.completionDate}
        onChange={(e) => onChangeInput('completionDate', e)}
      />
      <textarea
        value={toDo.text}
        placeholder="Что сделать?"
        onChange={(e) => onChangeInput('text', e)}
      />
      <Files toDo={toDo} editMode />
      <input type="file" multiple onChange={onChangeInputFile} />
    </div>
  )
}

export default FormToDo
