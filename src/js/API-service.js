import axios from 'axios';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const API_KEY = '39366516-7e9112e8cbb9af8a2ad551a38';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchQuery(query, currentPage = '1') {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: currentPage,
  };

  const response = await axios.get(BASE_URL, { params });
  const data = response.data;

  return data;
}
