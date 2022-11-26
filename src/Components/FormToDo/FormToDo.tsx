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
    <div className="form">
      <div className="form__item">
        <span className="form__item-title">Срок</span>
        <input
          className="form__date"
          type="date"
          value={toDo.completionDate}
          onChange={(e) => onChangeInput('completionDate', e)}
        />
      </div>
      <div className="form__item">
        <span className="form__item-title">Тема</span>
        <input
          className="form__title"
          type="text"
          value={toDo.title}
          placeholder="Заголовок"
          onChange={(e) => onChangeInput('title', e)}
        />
      </div>
      <div className="form__item">
        <span className="form__item-title">Описание</span>
        <textarea
          className="form__text"
          value={toDo.text}
          placeholder="Что сделать?"
          onChange={(e) => onChangeInput('text', e)}
        />
      </div>
      <div>
        <div className="form__file">
          <input type="file" multiple onChange={onChangeInputFile} />
          <div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ><path d="M359.784 103.784v262.919c0 57.226-46.557 103.784-103.784 103.784S152.216 423.93 152.216 366.703V103.784c0-34.336 27.934-62.27 62.27-62.27s62.27 27.934 62.27 62.27v262.919c0 11.445-9.312 20.757-20.757 20.757s-20.757-9.311-20.757-20.757V103.784H193.73v262.919c0 34.336 27.934 62.27 62.27 62.27s62.27-27.934 62.27-62.27V103.784C318.27 46.557 271.713 0 214.487 0S110.703 46.557 110.703 103.784v262.919C110.703 446.82 175.883 512 256 512s145.297-65.18 145.297-145.297V103.784h-41.513z"/></svg>
          </div>
        </div>
        <Files toDo={toDo} editMode />
      </div>
    </div>
  )
}

export default FormToDo
