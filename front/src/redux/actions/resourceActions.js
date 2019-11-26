/* eslint-disable no-console */
import Resource from '../../api/Resource';
import {
  TYPE_GAMES,
  TYPE_GAMES_SUCCESS,
  TYPE_GAMES_FAILED,
} from '../../api/Types';
import BasicNotification from '../../shared/components/Notifications/BasicNotification';
import closeSesion from '../../helper/functions';

export const getTypesGames = (query, cb) => async (dispatch) => {
  dispatch({ type: TYPE_GAMES });
  try {
    const { body } = await Resource.getTypesGames(query);
    if (cb) {
      cb(body);
    }
    dispatch({ type: TYPE_GAMES_SUCCESS, payload: { typesGames: body } });
  } catch (error) {
    dispatch({ type: TYPE_GAMES_FAILED, payload: { error } });
    if (error.status === 401) { closeSesion(); }
    BasicNotification.error('Ocurrió un error al intentar obtener los tipos de juegos');
  }
};

