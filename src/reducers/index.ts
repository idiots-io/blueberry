import { times, sample } from 'lodash'
import * as moment from 'moment'

const DEFAULT_STATE: State = {
  sessions: times(40, num => ({
    id: num.toString(),
    duration: moment.duration(num, 'm'),
    createdAt: new Date(),
    todoId: sample([0, 1, 2, 3]).toString(),
  })),
  todos: [
    {
      id: 1,
      title: 'text',
      isDone: false,
      createdAt: '2017.12.04 월요일',
      sessionCount: 2,
    },
    {
      id: 2,
      title: 'text2',
      isDone: false,
      createdAt: '2017.12.04 월요일',
      sessionCount: 4,
    },
    {
      id: 3,
      title: 'text3',
      isDone: false,
      createdAt: '2017.12.03 일요일',
      sessionCount: 10,
    },
  ],
  settings: {
    workInterval: {
      labelKor: '블루베리 시간',
      value: '25분',
    },
    breakTime: {
      labelKor: '쉬는 시간',
      value: '5분',
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
  createdAt: Date
  todoId: string
}

export interface Todo {
  id: string
  title: string
  isDone: boolean
  createdAt: string
  sessionCount: number
}

export interface Setting {
  workInterval: {
    labelKor: string
    value: string
  }
  breakTime: {
    labelKor: string
    value: string
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
  if (action.type === 'RESET_TODOS') {
    return { ...state, todos: [] }
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
