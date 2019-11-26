/* eslint-disable max-len */
import {
  TYPE_GAMES,
  TYPE_GAMES_SUCCESS,
  TYPE_GAMES_FAILED,
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
    case TYPE_GAMES:
      return { ...state, cargando: true };
    case TYPE_GAMES_SUCCESS:
      return { ...state, cargando: false, typesGames: action.payload.typesGames };
    case TYPE_GAMES_FAILED:
      return { ...state, cargando: false, error: action.payload.error };
    default:
      return state;
  }
};
