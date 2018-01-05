export const addTodo = todoItem => ({
  type: 'ADD_TODO',
  payload: todoItem
})

export const removeTodo = (id) => ({
  type: 'DELETE_TODOS',
  payload: id
})

export const completedTodo = (id) => ({
  type: 'COMPLETED_TODOS',
  payload: id
})

export const undoIsDone = (id) => ({
  type: 'UNDO_IS_DONE',
  payload: id
})
