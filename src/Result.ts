import * as utils from './utils';
import uuid from 'react-native-uuid';
import {addResult, removeResultById} from './services';

type ID = string | number | number[];

export default class Result {
  factorBase: number;
  magneticCap: number;
  windTime: number;
  date: Date;
  id: ID;
  airplaneSpeed?: number;
  windAngle?: number;
  distance?: number;
  windSpeed?: number;
  constructor({
    factorBase,
    magneticCap,
    windTime,
    date,
    id,
    airplaneSpeed,
    windAngle,
    distance,
    windSpeed,
  }) {
    this.airplaneSpeed = parseFloat(airplaneSpeed);
    this.windAngle = parseFloat(windAngle);
    this.windSpeed = parseFloat(windSpeed);
    this.distance = parseFloat(distance);
    this.factorBase = factorBase
      ? factorBase
      : parseFloat(
          utils.factorBase(airplaneSpeed, windAngle, windSpeed).toFixed(2),
        );
    this.magneticCap = magneticCap
      ? magneticCap
      : parseFloat(
          utils.magneticCap(windSpeed, windAngle, airplaneSpeed).toFixed(2),
        );
    this.windTime = windTime
      ? windTime
      : parseFloat(
          utils
            .windTime(distance, airplaneSpeed, windAngle, windSpeed)
            .toFixed(2),
        );
    this.id = id ? id : uuid.v4();
    this.date = date ? new Date(date) : new Date();
  }
  add() {
    return addResult(this);
  }
  remove() {
    return removeResultById(this.id);
  }
}
