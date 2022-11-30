import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { onSnapshot } from 'firebase/firestore'
import {
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
  getBlob,
  getDownloadURL,
} from 'firebase/storage'
import { makeAutoObservable } from 'mobx'
import { db } from '../App'

export interface IToDo {
  id: number
  title: string
  text: string
  completionDate: string
  completed: boolean
  files: any
}

const todoListFake = [
  {
    id: 1,
    title: 'Первая задача',
    text: 'Добавь свою первую задачу',
    completionDate: '',
    completed: false,
    files: [],
  },
]

class ToDoStore {
  toDoList: IToDo[] = todoListFake

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
    this.toDoList.map((toDo, index) => {
      this.getFiles(toDo.id, toDo.files, index)
    })
  }

  getFiles(id: number, fileNames: string[], index: number) {
    const files: Array<File | any> = []
    fileNames.forEach(async (fileName) => {
      await getDownloadURL(ref(getStorage(), `${id}/${fileName}`))
        .then((url) => {
          const xhr = new XMLHttpRequest()
          xhr.responseType = 'blob'
          xhr.onload = (event) => {
            const blob = xhr.response
          }
          xhr.open('GET', url)
          xhr.send()

          files.push(url)
        })
        .catch((error) => {
          // Handle any errors
        })
      this.setFiles(index, files)
    })
  }
  // getFiles(id: number, fileNames: string[], index: number) {
  //   const files: Array<File | any> = []
  //   fileNames.forEach(async (fileName) => {
  //     const blob = await getBlob(ref(getStorage(), `${id}/${fileName}`))
  //     const file = new File([blob], `${fileName}`)
  //     files.push(file)
  //     this.setFiles(index, files)
  //   })
  // }

  setFiles(index: number, files: any) {
    this.toDoList[index].files = files
  }

  subscribeToDoList() {
    onSnapshot(collection(db, 'toDoList'), (collection) => {
      console.log('update')
      const toDoList: IToDo[] = []
      collection.forEach((doc) => {
        const toDoDoc = doc.data()
        toDoList.push({
          id: toDoDoc.id,
          title: toDoDoc.title,
          text: toDoDoc.text,
          completionDate: toDoDoc.completionDate,
          completed: toDoDoc.completed,
          files: toDoDoc.files, //Names,
        })
      })
      this.setToDoList(toDoList)
    })
  }

  saveToDo() {
    setDoc(doc(db, 'toDoList', `${this.intermediateToDo.id}`), {
      ...this.intermediateToDo,
      files: this.intermediateToDo.files.map((file: any) => file.name),
    })

    this.uploadFiles(this.intermediateToDo.id, this.intermediateToDo.files)
    console.log('saveToDo')
  }

  deleteToDo(id: number) {
    deleteDoc(doc(db, 'toDoList', `${id}`))
    ///delete file
  }

  deleteFile(id: string, fileName: string) {
    deleteObject(ref(getStorage(), `${id}/${fileName}`))
      .then(() => {
        console.log('File deleted successfully')
      })
      .catch((error) => {
        console.log('Uh-oh, an error occurred!')
      })

      setDoc(doc(db, 'toDoList', `${this.intermediateToDo.id}`), {
        ...this.intermediateToDo,
        files: this.intermediateToDo.files.filter((file: any) => file.name),})
  }

  uploadFiles(id: number, files: Array<File>) {
    files.forEach((file) => {
      uploadBytes(ref(getStorage(), `${id}/${file.name}`), file)
    })
  }
  // createUrlFileToDo(id: number, fileName: string) {
  //     let url: string = ''
  //     getDownloadURL(ref(getStorage(), `${id}/${fileName}`))
  //       .then((u) => {
  //         url = u

  //       })
  //       .catch((err) => console.log('getFileErr', err))
  //     return url
  //   }

  ////////////////////

  async updateCompletedToDo(id: number, e: any) {
    await updateDoc(doc(db, 'toDoList', `${id}`), {
      completed: e.target.checked,
    })
  }

  getToDoById(id: number) {
    return this.toDoList.find((toDo) => toDo.id === id)
  }

  findIndexToDo(id: number) {
    return this.toDoList.findIndex((toDo) => toDo.id === id)
  }

  setIntermediateToDo(id: number) {
    const toDo = this.getToDoById(id)
    if (toDo) {
      this.intermediateToDo = toDo
    }
  }

  changeIntermediateToDo(field: string, e: any) {
    this.intermediateToDo = {
      ...this.intermediateToDo,
      [field]: e.target.value,
    }
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

  addIntermediateFileToDo(e: any) {
    this.intermediateToDo = {
      ...this.intermediateToDo,
      files: [...this.intermediateToDo.files, ...Array.from(e.target.files)],
    }
  }

  deleteIntermediateFileToDo(index: number, file: string, id: number) {
    const copyFiles = this.intermediateToDo.files
    copyFiles.splice(index, 1)
    this.intermediateToDo = {
      ...this.intermediateToDo,
      files: copyFiles,
    }
    this.deleteFile(id+'', file)
  }
  
}

export default ToDoStore
