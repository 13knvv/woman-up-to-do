import { useStores } from '../../MobX/stores'
import { IToDo } from '../../MobX/ToDoStore'

interface IPropsFiles {
  toDo: IToDo
  editMode?: boolean
}

const Files = (props: IPropsFiles) => {
  const { toDoStore } = useStores()

  const onClickDeleteFile = (index: number, file: string) => {
    toDoStore.deleteIntermediateFileToDo(index, file, props.toDo.id)
  }

  // if ((typeof props.toDo.files[0] ) === "string") {
  //   return <></>
  // }

  const files = props.toDo.files.map( (fileObj: any, index: number) => {
     let format = 'a'//fileObj.name.split('.')[1]
     let imgUrl = fileObj
// console.log(imgUrl)
//     switch (format) {
//       case 'img':
//       case 'png':
//       case 'jpeg':
//       case 'jpg':
//       case 'svg':
//         imgUrl = URL.createObjectURL(fileObj)
//         break
//     }

    return (
      <div key={Date.now() + Math.random()} className="files__item">
        <a href={fileObj} download>
          {imgUrl ? (
            <img src={imgUrl} alt="" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511 511">
              <path d="M454.962 110.751c-.018-.185-.05-.365-.081-.545-.011-.06-.016-.122-.028-.182a7.298 7.298 0 0 0-.159-.632c-.007-.025-.012-.052-.02-.077a7.357 7.357 0 0 0-.224-.625l-.023-.064a7.61 7.61 0 0 0-.269-.57c-.016-.031-.029-.063-.045-.094a7.977 7.977 0 0 0-.301-.504c-.027-.042-.05-.086-.077-.127a7.546 7.546 0 0 0-.33-.446c-.037-.048-.07-.098-.109-.145a7.864 7.864 0 0 0-.45-.498l-.042-.046-104-104c-.018-.018-.038-.033-.057-.051a7.503 7.503 0 0 0-.486-.44c-.055-.045-.113-.083-.169-.126-.138-.107-.275-.214-.42-.311-.051-.034-.105-.062-.156-.095a7.352 7.352 0 0 0-.475-.284c-.036-.019-.074-.035-.111-.053a7.79 7.79 0 0 0-.554-.262c-.024-.01-.049-.017-.074-.027a7.637 7.637 0 0 0-.616-.221l-.081-.021a7.686 7.686 0 0 0-.628-.158c-.063-.013-.128-.018-.192-.029a7.203 7.203 0 0 0-.536-.08A7.468 7.468 0 0 0 343.5 0h-248C73.72 0 56 17.72 56 39.5v432c0 21.78 17.72 39.5 39.5 39.5h320c21.78 0 39.5-17.72 39.5-39.5v-360c0-.251-.013-.501-.038-.749zM351 25.606 429.394 104H375.5c-13.509 0-24.5-10.99-24.5-24.5V25.606zM415.5 496h-320C81.991 496 71 485.01 71 471.5v-432C71 25.99 81.991 15 95.5 15H336v64.5c0 21.78 17.72 39.5 39.5 39.5H440v352.5c0 13.51-10.991 24.5-24.5 24.5z" />
            </svg>
          )}
        </a>
        {'.' + format}
        {props.editMode && (
          <button onClick={() => onClickDeleteFile(index, fileObj)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 348.333 348.334">
              <path d="M336.559 68.611 231.016 174.165l105.543 105.549c15.699 15.705 15.699 41.145 0 56.85-7.844 7.844-18.128 11.769-28.407 11.769-10.296 0-20.581-3.919-28.419-11.769L174.167 231.003 68.609 336.563c-7.843 7.844-18.128 11.769-28.416 11.769-10.285 0-20.563-3.919-28.413-11.769-15.699-15.698-15.699-41.139 0-56.85l105.54-105.549L11.774 68.611c-15.699-15.699-15.699-41.145 0-56.844 15.696-15.687 41.127-15.687 56.829 0l105.563 105.554L279.721 11.767c15.705-15.687 41.139-15.687 56.832 0 15.705 15.699 15.705 41.145.006 56.844z" />
            </svg>
          </button>
        )}
      </div>
    )
  })

  return <div className="files">{files}</div>
}

export default Files
