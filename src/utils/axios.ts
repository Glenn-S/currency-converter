import axios from 'axios';

export default axios.create({
  baseURL: 'https://freecurrencyapi.net/api/v2',
  params: {
    apikey: process.env.REACT_APP_API_KEY
  }
});