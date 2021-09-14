import { makeAutoObservable, observable } from "mobx";
import axios from "axios";
import {
  PATH_BASE,
  PATH_COMMON,
  PATH_CHARACTER,
  PATH_END,
} from "../constants/const.js";

class Data {
  people = observable([]);
  character = null;

  constructor() {
    makeAutoObservable(this);
    this.fetchPeoples();
    this.fetchCharacter();
  }
  async fetchPeoples() {
    try {
      const response = await axios.get(`${PATH_BASE}${PATH_COMMON}${PATH_END}`);
      const newPeople = response.data;
      this.people.replace(newPeople);
    } catch (error) {
      console.log(error);
    }
  }
  async fetchCharacter(id) {
    try {
      const response = await axios.get(
        `${PATH_BASE}${PATH_CHARACTER}${id}${PATH_END}`
      );
      const character = response.data;
      this.character = character;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new Data();
