import { APIResponseType, UserData } from '../type';
const axios = require('axios');

//Hardcoded URL here for demo

export async function getLocations() {
  try {
    const response: APIResponseType<UserData[]> = await axios.get(
      'https://randomuser.me/api/?results=20'
    );
    return response?.data?.results;
  } catch (error) {
    console.error(error);
  }
}
