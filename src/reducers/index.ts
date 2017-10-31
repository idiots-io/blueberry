const DEFAULT_STATE: State = {
  sessions: [],
  todos: [],
  settings: {
    workInterval: {
      labelKorean: '세션 길이',
      value: 25
    },
    autoStart: {
      labelKorean: '자동 진행',
      value: true
    },
    isStrictMode: {
      labelKorean: '잔소리 모드',
      value: true
    }
  }
}

interface Session {
  id: String
  duration: Number
  createdAt: Date
  todoId: Number
}

interface Todo {
  title: String
  isDone: Boolean
  createdAt: Date
}

interface State {
  sessions: Session[]
  todos: Todo[]
  settings: Object
}

interface Action {
  type: String
  payload: any
}

export default (state = DEFAULT_STATE, action: Action) => {
  if (action.type === 'ADD_TODO') {
    return {
      todos: [...state.todos, action.payload],
      ...state
    }
  }

  return {
    ...state
  }
}
