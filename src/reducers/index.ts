import { times, sample } from 'lodash'
import moment from 'moment'

const DEFAULT_STATE: State = {
  sessions: times(40, num => ({
    id: num.toString(),
    duration: moment.duration(num, 'm'),
    createdAt: moment().add(sample([-6, -5, -4, -3, -2, -1, 0]), 'days'),
    todoId: sample([0, 1, 2, 3]).toString(),
  })),
  todos: [
    {
      id: '0',
      title: '당신의 작은 성공을 응원합니다! ^-^',
      isDone: false,
      createdAt: new Date(),
    },
    {
      id: '1',
      title: '블루베리(할 일)를 먼저 등록하세요!',
      isDone: false,
      createdAt: new Date(),
    },
    {
      id: '2',
      title: '블루베리를 선택하시고 세션을 진행하세요',
      isDone: false,
      createdAt: new Date(),
    },
    {
      id: '3',
      title: '완료된 할일은 이렇게 완료 처리를 해주세요',
      isDone: true,
      createdAt: new Date(),
    },
  ],
  settings: {
    workInterval: {
      labelKor: '블루베리 시간',
      value: moment.duration(5, 's'),
    },
    breakTime: {
      labelKor: '쉬는 시간',
      value: moment.duration(3, 's'),
    },
    autoStart: {
      labelKor: '블루베리 자동 진행',
      value: true,
    },
    isSoundMode: {
      labelKor: '블루베리 진행 소리 on/off',
      value: true,
    },
    completeSound: {
      labelKor: '블루베리 완료 소리',
      value: 'Alarm clock',
    },
  },
}

export interface Session {
  id: string
  duration: moment.Duration
  createdAt: moment.Moment
  todoId: string
}

export interface Todo {
  id: string
  title: string
  isDone: boolean
  createdAt: Date
}

export interface Setting {
  workInterval: {
    labelKor: string
    value: moment.Duration
  }
  breakTime: {
    labelKor: string
    value: moment.Duration
  }
  completeSound: {
    labelKor: string
    value: string
  }
  autoStart: {
    labelKor: string
    value: boolean
  }
  isSoundMode: {
    labelKor: string
    value: boolean
  }
}

export interface State {
  sessions: Session[]
  todos: Todo[]
  settings: Setting
}

export interface Action {
  type: string
  payload: any
}

export default (state = DEFAULT_STATE, action: Action) => {
  if (action.type === 'ADD_TODO') {
    return {
      ...state,
      todos: [...state.todos, action.payload],
    }
  }
  if (action.type === 'DELETE_TODOS') {
    const deleteTodo = state.todos.filter(todo => todo.id !== action.payload)
    return {
      ...state,
      todos: [...deleteTodo],
    }
  }
  if (action.type === 'COMPLETED_TODOS') {
    const completedTodoIndex = state.todos
      .map(todo => todo.id)
      .indexOf(action.payload)
    state.todos[completedTodoIndex].isDone = true

    return {
      ...state,
    }
  }
  if (action.type === 'UNDO_IS_DONE') {
    const undoTodoIndex = state.todos
      .map(todo => todo.id)
      .indexOf(action.payload)
    state.todos[undoTodoIndex].isDone = false

    return {
      ...state,
    }
  }
  if (action.type === 'ADD_SESSION') {
    return {
      ...state,
      sessions: [...state.sessions, action.payload],
    }
  }
  if (action.type === 'CHANGE_SETTING_WITH_PICKER') {
    const nextState = { ...state }
    switch (action.payload[0]) {
      case '블루베리 시간':
        nextState.settings.workInterval.value = action.payload[1]
        break
      case '쉬는 시간':
        nextState.settings.breakTime.value = action.payload[1]
        break
      case '블루베리 완료 소리':
        nextState.settings.completeSound.value = action.payload[1]
        break
    }
    return nextState
  }

  if (action.type === 'TOGGLE_AUTO_START') {
    const nextState = { ...state }
    nextState.settings.autoStart.value = action.payload
    return nextState
  }
  if (action.type === 'TOGGLE_SOUND_MODE') {
    const nextState = { ...state }
    nextState.settings.isSoundMode.value = action.payload
    return nextState
  }

  return state
}
