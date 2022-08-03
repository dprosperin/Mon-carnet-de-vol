import {factorBase, magneticCap, windTime} from './utils';
import uuid from 'react-native-uuid';

type ID = string | number | number[];

export default class Result {
  factorBase: number | string;
  magneticCap: number | string;
  windTime: number | string;
  date: Date;
  id: ID;
  airplaneSpeed?: number;
  windAngle?: number;
  distance?: number;
  windSpeed?: number;
  constructor({airplaneSpeed, windAngle, windSpeed, distance}) {
    this.factorBase = factorBase(airplaneSpeed, windAngle, windSpeed).toFixed(
      2,
    );
    this.magneticCap = magneticCap(windSpeed, windAngle, airplaneSpeed).toFixed(
      2,
    );
    this.windTime = windTime(
      distance,
      airplaneSpeed,
      windAngle,
      windSpeed,
    ).toFixed(2);
    this.airplaneSpeed = airplaneSpeed;
    this.windAngle = windAngle;
    this.windSpeed = windSpeed;
    this.distance = distance;
    this.id = uuid.v4();
    this.date = new Date();
  }
}
