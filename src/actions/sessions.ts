import { Session } from '../reducers';

export const addSession = (session: Session) => ({
  type: 'ADD_SESSION',
  payload: session
})