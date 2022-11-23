import { createContext, useContext } from "react"
import ToDoStore from "./ToDoStore"

class RootStore {

  toDoStore: ToDoStore

  constructor() {
    this.toDoStore  = new ToDoStore
  }
}

const StoresContext = createContext(new RootStore())

export const useStores = () => useContext(StoresContext)