// import QueryString from 'query-string';
import { requests } from '../helper/Agent';

export default class Player {

  static createPlayer(data) {
    return requests.post('/player', data);
  }

  static getAllPlayersByIdEvent(id) {
    return requests.get(`/player/${id}`);
  }

  static getPlayerById(id) {
    return requests.get(`/player/${id}`);
  }

  static updatePlayer(id, data) {
    return requests.put(`/player/${id}`, data);
  }

  static deletePlayer(id) {
    return requests.del(`/player/${id}`);
  }

}
