import axios from 'axios';
import { BASE_URL, DEFAULT_QUERY, API_KEY } from '../utils/urlSettings';

export const getImages = async (page, query = DEFAULT_QUERY) => {
  const response = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${query}&per_page=12&page=${page}`,
  );
  return response.data;
};

export const ghj = () => null;
