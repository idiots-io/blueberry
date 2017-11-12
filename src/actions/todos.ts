export const addTodo = todoItem => ({
  type: 'ADD_TODO',
  payload: todoItem
})

// For Development
export const resetTodos = () => ({
  type: 'RESET_TODOS'
})
