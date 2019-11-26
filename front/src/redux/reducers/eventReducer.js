/* eslint-disable max-len */
import {
  CREATE_EVENT,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAILED,
  GET_EVENT_BY_ID,
  GET_EVENT_BY_ID_SUCCESS,
  GET_EVENT_BY_ID_FAILED,
  GET_EVENTS,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAILED,
  UPDATE_EVENT,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAILED,
  GET_PLAYERS_BY_ID,
  GET_PLAYERS_BY_ID_SUCCESS,
  GET_PLAYERS_BY_ID_FAILED,
  DELETE_EVENT,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILED,
} from '../../api/Types';

const initial = {
  collection: [],
  cargando: false,
  currentUser: {
    firstName: '',
    lastName: '',
    avatar: '',
  },
};
export default (state = initial, action) => {
  switch (action.type) {
    case CREATE_EVENT:
      return { ...state, loadingCurrentUser: true };
    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        loadingCurrentUser: false,
        currentUser: action.payload.currentUser,
      };
    case CREATE_EVENT_FAILED:
      return { ...state, loadingCurrentUser: false, error: action.payload.error };
    case GET_EVENTS:
      return { ...state, cargando: true };
    case GET_EVENTS_SUCCESS:
      return { ...state, cargando: false, events: action.payload.events };
    case GET_EVENTS_FAILED:
      return { ...state, cargando: false, error: action.payload.error };
    case GET_EVENT_BY_ID:
      return { ...state, loadingEventInfo: true };
    case GET_EVENT_BY_ID_SUCCESS:
      return {
        ...state,
        loadingEventInfo: false,
        event: action.payload.event,
      };
    case GET_EVENT_BY_ID_FAILED:
      return { ...state, loadingEventInfo: false, error: action.payload.error };
    case UPDATE_EVENT:
      return { ...state, loadingEventInfo: true };
    case UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        loadingEventInfo: false,
      };
    case UPDATE_EVENT_FAILED:
      return { ...state, loadingEventInfo: false, error: action.payload.error };
    case GET_PLAYERS_BY_ID:
      return { ...state, loadingPlayersInfo: true };
    case GET_PLAYERS_BY_ID_SUCCESS:
      return {
        ...state,
        loadingPlayersInfo: false,
        players: action.payload.players,
      };
    case GET_PLAYERS_BY_ID_FAILED:
      return { ...state, loadingPlayersInfo: false, error: action.error };
    case DELETE_EVENT:
      return { ...state };
    case DELETE_EVENT_SUCCESS:
      return { ...state };
    case DELETE_EVENT_FAILED:
      return { ...state };
    default:
      return state;
  }
};
