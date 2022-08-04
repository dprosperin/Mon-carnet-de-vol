import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import Result from './Result';

const getAllResults = async (): Promise<Result[] | null> => {
  const jsonValue = await AsyncStorage.getItem('@Results');
  return jsonValue != null ? Object.values(JSON.parse(jsonValue)) : null;
};

const getResultById = async (id: Result['id']): Promise<Result | null> => {
  id = id.toString()
  const allResults = await getAllResults();
  return allResults != null ? allResults[id] : null;
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

export {getAllResults, getResultById, removeResultById, addResult};
