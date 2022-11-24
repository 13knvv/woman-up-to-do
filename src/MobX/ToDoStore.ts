import { makeAutoObservable } from 'mobx'

export interface IToDo {
  id: number
  title: string
  text: string
  completionDate: string
  files: Array<any>
}

const todoList = [
  { id: 0, title: 'Загол', text: 'Сделать ToDo лист', completionDate: '28.11.2022', files: [] },
]

class ToDoStore {
  toDoList: IToDo[] = todoList

  editableToDo: IToDo  = { id: -1, title: '', text: '', completionDate: '', files: [] }
  newToDo: IToDo = { id: Date.now(), title: '', text: '', completionDate: '', files: [] }

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

  // changeToDoList(id: number, field: string, e: any) {
  //   const newToDoArr = this.toDoList.map((toDo) => {
  //     if (toDo.id === id) {
  //       return { ...toDo, [field]: e.target.value }
  //     }
  //     return toDo
  //   })
  //   this.setToDoList(newToDoArr)
  // }

  changeEditableToDo(field: string, e: any) {
    if (this.editableToDo) {
      this.editableToDo = { ...this.editableToDo, [field]: e.target.value }
    }
  }

  setEditableToDo(id: number) {
    const toDo = this.getToDoById(id)
    if (toDo) {
      this.editableToDo = toDo
    }
  }

  saveEditedToDo() {
    this.toDoList.forEach((toDo, index, arr) => {
      if (toDo.id === this.editableToDo?.id) {
        arr[index] = this.editableToDo
      }
    })
  }

  saveNewToDo() {
    this.toDoList.push(this.newToDo)
    this.clearNewToDo()
  }

  changeNewToDo(field: string, e: any) {
    this.newToDo = { ...this.newToDo, [field]: e.target.value }
  }

  clearNewToDo() {
    this.newToDo = { id: Date.now(), title: '', text: '', completionDate: '', files: [] }
  }
}

export default ToDoStore
