import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const factorBase = (airplaneSpeed, windAngle, windSpeed) =>
  60 / (airplaneSpeed - windSpeed * Math.cos(toRadians(windAngle)));

const magneticCap = (windSpeed, windAngle, airplaneSpeed) =>
  windSpeed *
  Math.sin(toRadians(windAngle)) *
  factorBase(airplaneSpeed, toRadians(windAngle), windSpeed);

const windTime = (distance, airplaneSpeed, windAngle, windSpeed) =>
  distance * factorBase(airplaneSpeed, toRadians(windAngle), windSpeed);

const toRadians = degrees => degrees * (Math.PI / 180);

const getAllResults = async () => {
  const jsonValue = await AsyncStorage.getItem('@Results');
  return jsonValue != null ? Object.values(JSON.parse(jsonValue)) : null;
};

const getResultById = async id => {
  const allResults = await getAllResults();
  return allResults != null ? allResults[id] : null;
};

const removeResultById = async id => {
  // TODO
};

const addResult = async (result, customId) => {
  const allResults = await getAllResults();
  const id = customId ? customId : uuid.v4();
  result.id = id;
  const jsonValue = JSON.stringify({...allResults, [id]: result});
  return await AsyncStorage.setItem('@Results', jsonValue);
};

export {
  factorBase,
  magneticCap,
  windTime,
  toRadians,
  getAllResults,
  getResultById,
  removeResultById,
  addResult,
};
