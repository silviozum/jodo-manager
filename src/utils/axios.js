// src/utils/axios.js
import axios from 'axios';
import router from '@/router';

axios.interceptors.response.use(
  response => {
    if (response.data.failToken) {
      sessionStorage.setItem('jodoSafePlace', false);
      router.push('/signin');
    }
    return response;
  },
  error => {
    if (error.response && error.response.data.failToken) {
      sessionStorage.setItem('jodoSafePlace', false);
      router.push('/signin');
    }
    return Promise.reject(error);
  }
);

export default axios;