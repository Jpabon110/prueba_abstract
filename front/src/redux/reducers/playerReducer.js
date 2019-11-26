/* eslint-disable max-len */
import {
  CREATE_PLAYER,
  CREATE_PLAYER_SUCCESS,
  CREATE_PLAYER_FAILED,
  GET_PLAYER_BY_ID,
  GET_PLAYER_BY_ID_SUCCESS,
  GET_PLAYER_BY_ID_FAILED,
  UPDATE_PLAYER,
  UPDATE_PLAYER_SUCCESS,
  UPDATE_PLAYER_FAILED,
  DELETE_PLAYER,
  DELETE_PLAYER_SUCCESS,
  DELETE_PLAYER_FAILED,
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
    case CREATE_PLAYER:
      return { ...state, loadingCurrentPlayer: true };
    case CREATE_PLAYER_SUCCESS:
      return {
        ...state,
        loadingCurrentPlayer: false,
        player: action.payload.player,
      };
    case CREATE_PLAYER_FAILED:
      return { ...state, loadingCurrentPlayer: false, error: action.payload.error };
    case UPDATE_PLAYER:
      return { ...state, loading: true };
    case UPDATE_PLAYER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_PLAYER_FAILED:
      return { ...state, loading: false, error: action.payload.error };
    case GET_PLAYER_BY_ID:
      return { ...state, loadingCurrentPlayer: true };
    case GET_PLAYER_BY_ID_SUCCESS:
      return {
        ...state,
        loadingCurrentPlayer: false,
        player: action.payload.player,
      };
    case GET_PLAYER_BY_ID_FAILED:
      return { ...state, loadingCurrentPlayer: false, error: action.payload.error };
    case DELETE_PLAYER:
      return { ...state };
    case DELETE_PLAYER_SUCCESS:
      return { ...state };
    case DELETE_PLAYER_FAILED:
      return { ...state };
    default:
      return state;
  }
};
