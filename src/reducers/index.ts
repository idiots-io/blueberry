import { times, sample } from 'lodash';
import * as moment from 'moment';

const DEFAULT_STATE: State = {
  sessions: times(40, num => ({
    id: num.toString(),
    duration: moment.duration(num, 'm'),
    createdAt: new Date,
    todoId: sample([0, 1, 2, 3]).toString(),
  })),
  todos: times(4, num => ({
    id: num.toString(),
    title: `Todo #${num}`,
    isDone: (num % 2 === 0),
    createdAt: new Date(),
  })),
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

export interface Session {
  id: string
  duration: moment.Duration
  createdAt: Date
  todoId: string,
}

export interface Todo {
  id: string;
  title: string
  isDone: boolean
  createdAt: Date
}

export interface State {
  sessions: Session[]
  todos: Todo[]
  settings: object
}

export interface Action {
  type: string
  payload: any
}

export default (state = DEFAULT_STATE, action: Action) => {
  if (action.type === 'ADD_TODO') {
    return {
      ...state,
      todos: [...state.todos, action.payload]
    }
  }
  if (action.type === 'RESET_TODOS') {
    return { ...state, todos: [] }
  }

  if (action.type === 'ADD_SESSION') {
    return {
      ...state,
      sessions: [...state.sessions, action.payload]
    }
  }

  return state
}
