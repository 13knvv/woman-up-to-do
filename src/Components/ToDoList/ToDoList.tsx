const todoArr = [
  { id: 0, title: 'Заголовок', text: 'Сделать ToDo лист', completionDate: '28.11.2022', files: [] },
  { id: 0, title: 'Заголовок', text: 'Сделать ToDo лист', completionDate: '28.11.2022', files: [] },
  { id: 0, title: 'Заголовок', text: 'Сделать ToDo лист', completionDate: '28.11.2022', files: [] },
]

const ToDoList = () => {
  const toDoList = todoArr.map((toDo) => {
    return (
      <li key={toDo.id}>
        <h2>{toDo.title}</h2>
        <div>{toDo.text}</div>
      </li>
    )
  })

  const onClickAddToDo = () => {}
  const onClickOpenPopupAddToDo = () => {}

  return (
    <div>
      <ul>{toDoList}</ul>
      <div>
        <button onClick={onClickOpenPopupAddToDo}>Добавить</button>
        <button onClick={onClickAddToDo}>Готово</button>
      </div>
    </div>
  )
}

export default ToDoList
