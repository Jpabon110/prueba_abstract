/* eslint-disable no-console */
import Event from '../../api/Event';
import {
  CREATE_EVENT,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAILED,
  GET_EVENTS,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAILED,
  GET_EVENT_BY_ID,
  GET_EVENT_BY_ID_SUCCESS,
  GET_EVENT_BY_ID_FAILED,
  UPDATE_EVENT,
  GET_PLAYERS_BY_ID,
  GET_PLAYERS_BY_ID_SUCCESS,
  GET_PLAYERS_BY_ID_FAILED,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAILED,
  DELETE_EVENT,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILED,
} from '../../api/Types';
import BasicNotification from '../../shared/components/Notifications/BasicNotification';
import closeSesion from '../../helper/functions';

export const createEvent = (data, cb) => async (dispatch) => {
  dispatch({ type: CREATE_EVENT, cargando: true });
  // console.log(data);
  try {
    BasicNotification.info('Creando Evento...');
    const { body } = await Event.createEvent(data);
    if (cb) {
      cb(body);
    }
    dispatch({ type: CREATE_EVENT_SUCCESS, cargando: false, payload: { event: body } });
    BasicNotification.success('Evento creado con éxito.');
  } catch (error) {
    console.error(error);
    BasicNotification.error('Ocurrió un error al intentar crear el Evento.');
    dispatch({ type: CREATE_EVENT_FAILED, cargando: false, error });
  }
};

export const getAllPlayersByIdEvent = (id, cb) => async (dispatch) => {
  dispatch({ type: GET_PLAYERS_BY_ID });
  try {
    const { body } = await Event.getAllPlayersByIdEvent(id);
    if (cb) {
      cb(body);
    }
    dispatch({ type: GET_PLAYERS_BY_ID_SUCCESS, payload: { players: body } });
  } catch (error) {
    dispatch({ type: GET_PLAYERS_BY_ID_FAILED, payload: { error } });
    BasicNotification.error('Ocurrió un error al intentar obtener los jugadores');
  }
};

export const updateEvent = (id, data, cb) => async (dispatch) => {
  BasicNotification.info('Actualizando Evento...');
  dispatch({ type: UPDATE_EVENT, cargando: true });
  try {
    await Event.updateEvent(id, data);
    if (cb) {
      cb();
    }
    dispatch({ type: UPDATE_EVENT_SUCCESS, cargando: false });
    BasicNotification.success('Evento actualizado con éxito.');
  } catch (error) {
    dispatch({ type: UPDATE_EVENT_FAILED, cargando: false, error });
    BasicNotification.error('Ocurrió un error al intentar actualizar el Evento');
  }
};

export const getAllEvents = (query, cb) => async (dispatch) => {
  dispatch({ type: GET_EVENTS });
  try {
    const { body } = await Event.getAllEvents(query);
    if (cb) {
      cb(body);
    }
    // BasicNotification.info('Eventos encontrados...');
    dispatch({ type: GET_EVENTS_SUCCESS, payload: { events: body } });
  } catch (error) {
    dispatch({ type: GET_EVENTS_FAILED, payload: { error } });
    if (error.status === 401) { closeSesion(); }
    BasicNotification.error('Ocurrió un error al intentar obtener el evento');
  }
};

export const getEventById = (id, cb) => async (dispatch) => {
  dispatch({ type: GET_EVENT_BY_ID, loadingEventInfo: true });
  try {
    const { body } = await Event.getEventById(id);
    if (cb) {
      cb(body);
    }
    dispatch({ type: GET_EVENT_BY_ID_SUCCESS, loadingEventInfo: false, payload: { eventInfo: body } });
  } catch (error) {
    dispatch({ type: GET_EVENT_BY_ID_FAILED, loadingEventInfo: false, payload: { error } });
    if (error.status === 403) {
      BasicNotification.error('No tienes permisos para ver la cotización selccionado.');
    } else {
      console.error(error);
      BasicNotification.error('Ocurrió un error al intentar obtener el evento');
    }
  }
};

export const deleteEvent = (id, cb) => async (dispatch) => {
  dispatch({ type: DELETE_EVENT, loadingEventInfo: true });
  BasicNotification.info('Eliminando evento...');
  try {
    const { body } = await Event.deleteEvent(id);
    if (cb) {
      cb(body);
    }
    BasicNotification.info('Evento eliminado');
    dispatch({ type: DELETE_EVENT_SUCCESS, loadingEventInfo: false });
  } catch (error) {
    dispatch({ type: DELETE_EVENT_FAILED, loadingEventInfo: false, payload: { error } });
      console.error(error);
      BasicNotification.error('Ocurrió un error al intentar eliminar el evento');
  }
};

