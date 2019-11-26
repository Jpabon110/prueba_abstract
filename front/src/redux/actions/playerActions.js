/* eslint-disable no-console */
import Player from '../../api/Player';
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
import BasicNotification from '../../shared/components/Notifications/BasicNotification';

export const createPlayer = (data, cb) => async (dispatch) => {
  dispatch({ type: CREATE_PLAYER, cargando: true });
  // console.log(data);
  try {
    const { body } = await Player.createPlayer(data);
    if (cb) {
      cb(body);
    }
    dispatch({ type: CREATE_PLAYER_SUCCESS, cargando: false, payload: { player: body } });
    BasicNotification.success('Has sido asignado al partido éxitosamente.');
  } catch (error) {
    console.error(error);
    BasicNotification.error('Ocurrió un error al intentar asignar jugador.');
    dispatch({ type: CREATE_PLAYER_FAILED, cargando: false, error });
  }
};

export const getPlayerById = (id, cb) => async (dispatch) => {
  dispatch({ type: GET_PLAYER_BY_ID, cargando: true });
  try {
    const { body } = await Player.getPlayerById(id);
    if (cb) {
      cb(body);
    }
    dispatch({ type: GET_PLAYER_BY_ID_SUCCESS, cargando: false, payload: { player: body } });
    // BasicNotification.success('Has sido asignado al partido éxitosamente.');
  } catch (error) {
    console.error(error);
    BasicNotification.error('Ocurrió un error al intentar asignar jugador.');
    dispatch({ type: GET_PLAYER_BY_ID_FAILED, cargando: false, error });
  }
};

export const updatePlayer = (id, data, cb) => async (dispatch) => {
  BasicNotification.info('Actualizando Jugador...');
  dispatch({ type: UPDATE_PLAYER, cargando: true });
  try {
    await Player.updatePlayer(id, data);
    if (cb) {
      cb();
    }
    dispatch({ type: UPDATE_PLAYER_SUCCESS, cargando: false });
    BasicNotification.success('Jugadpr actualizado con éxito.');
  } catch (error) {
    dispatch({ type: UPDATE_PLAYER_FAILED, cargando: false, error });
    BasicNotification.error('Ocurrió un error al intentar actualizar el Jugador');
  }
};

export const deletePlayer = (id, cb) => async (dispatch) => {
  dispatch({ type: DELETE_PLAYER, loadingPlayer: true });
  BasicNotification.info('Eliminando jugador...');
  try {
    const { body } = await Player.deletePlayer(id);
    if (cb) {
      cb(body);
    }
    BasicNotification.info('Jugador eliminado');
    dispatch({ type: DELETE_PLAYER_SUCCESS, loadingPlayer: false });
  } catch (error) {
    dispatch({ type: DELETE_PLAYER_FAILED, loadingPlayer: false, payload: { error } });
      console.error(error);
      BasicNotification.error('Ocurrió un error al intentar eliminar al jugador');
  }
};

