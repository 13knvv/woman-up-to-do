import { makeAutoObservable } from 'mobx'

export interface IToDo {
  id: number
  title: string
  text: string
  completionDate: string
  completed: boolean
  files: Array<any>
}

const todoList = [
  {
    id: 0,
    title: 'Заголовок большой ну очень при очень',
    text: 'Сделать ToDo лист',
    completionDate: '2022-11-25',
    completed: false,
    files: [],
  },
  {
    id: 1,
    title: 'Загол',
    text: 'Сделать ToDo лист',
    completionDate: '2022-12-25',
    completed: false,
    files: [],
  },
]

class ToDoStore {
  toDoList: IToDo[] = todoList

  intermediateToDo: IToDo = {
    id: Date.now(),
    title: '',
    text: '',
    completionDate: '',
    completed: false,
    files: [],
  }

  constructor() {
    makeAutoObservable(this)
  }

  setToDoList(toDoList: IToDo[]) {
    this.toDoList = toDoList
  }

  getToDoList() {
    this.setToDoList(todoList)
  }

  getToDoById(id: number) {
    return this.toDoList.find((toDo) => toDo.id === id)
  }

  changeCompletedToDo(id: number, e: any) {
    this.toDoList.forEach((toDo, index, arr) => {
      if (toDo.id === id) {
        arr[index].completed = e.target.checked
      }
    })
  }

  changeIntermediateToDo(field: string, e: any) {
    this.intermediateToDo = { ...this.intermediateToDo, [field]: e.target.value }
  }

  addIntermediateFileToDo(e: any) {
    this.intermediateToDo = {
      ...this.intermediateToDo,
      files: [...this.intermediateToDo.files, ...Array.from(e.target.files)],
    }
  }

  deleteFileToDo(index: number) {
    const copyFiles = this.intermediateToDo.files
    copyFiles.splice(index, 1)
    this.intermediateToDo = {
      ...this.intermediateToDo,
      files: copyFiles,
    }
  }

  setIntermediateToDo(id: number) {
    const toDo = this.getToDoById(id)
    if (toDo) {
      this.intermediateToDo = toDo
    }
  }

  saveEditedToDo() {
    this.toDoList.forEach((toDo, index, arr) => {
      if (toDo.id === this.intermediateToDo?.id) {
        arr[index] = this.intermediateToDo
      }
    })
  }

  saveNewToDo() {
    this.toDoList.push(this.intermediateToDo)
    this.clearIntermediateToDo()
  }

  clearIntermediateToDo() {
    this.intermediateToDo = {
      id: Date.now(),
      title: '',
      text: '',
      completionDate: '',
      completed: false,
      files: [],
    }
  }
}

export default ToDoStore
