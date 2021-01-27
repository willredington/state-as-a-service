export type StateEvent = {
  registryName: string
  actionName: string
  payload?: any
}

export type CommonState = {
  date: string
  todos: string[]
}
