import axios from 'axios';

import { AsyncStorage } from 'react-native';


const API = axios.create({
  baseURL: 'http://192.168.137.1:3001/',
});


API.interceptors.request.use(async (config) => {
    try {
      const token = await AsyncStorage.getItem('@MansNotHot:token');
  
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      return config;
    } catch (err) {
      alert(err);
    }
  });

export default API;