import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import Result from './Result';

type RawResults = Result['id'][];

const getAllResults = async (
  isRaw = false,
): Promise<Result[] | RawResults | null> => {
  const jsonValue = await AsyncStorage.getItem('@Results');
  if (!jsonValue) {
    return null;
  } else {
    return isRaw ? JSON.parse(jsonValue) : Object.values(JSON.parse(jsonValue));
  }
};

const getResultById = async (id: Result['id']): Promise<Result | null> => {
  id = id.toString()
  const allResults = await getAllResults();
  return allResults != null ? allResults[id] : null;
};

const isExistingResultById = async (
  id: Result['id'],
): Promise<boolean | null> => {
  const allResults = await getAllResults(true);
  id = id.toString();
  const result = allResults?.[id];
  return !!result;
};

const removeResultById = async (id: Result['id']) => {
  // TODO
};

const addResult = async (result: Result) => {
  const allResults = await getAllResults();
  const id = (result.id ? result.id : uuid.v4()).toString();
  const jsonValue = JSON.stringify({...allResults, [id]: result});
  return await AsyncStorage.setItem('@Results', jsonValue);
};

export {
  getAllResults,
  getResultById,
  removeResultById,
  addResult,
  isExistingResultById,
};
