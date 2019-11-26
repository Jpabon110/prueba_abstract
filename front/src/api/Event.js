// import QueryString from 'query-string';
import { requests } from '../helper/Agent';

export default class Event {

  static createEvent(data) {
    return requests.post('/events', data);
  }

  static getAllEvents() {
    return requests.get(`/events/`);
  }

  static getAllPlayersByIdEvent(id) {
    return requests.get(`/events/${id}/players`);
  }

  static updateEvent(id, data) {
    return requests.put(`/events/${id}`, data);
  }

  static getEventById(id) {
    return requests.get(`/events/${id}`);
  }

  static deleteEvent(id) {
    return requests.del(`/events/${id}`);
  }

}
