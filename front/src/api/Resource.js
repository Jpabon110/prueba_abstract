// import QueryString from 'query-string';
import { requests } from '../helper/Agent';

export default class Resourse {

  static getTypesGames() {
    return requests.get(`/types-game`);
  }

}
