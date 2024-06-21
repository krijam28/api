import axios from 'axios';

const fetchAlbums = async () => {
  try {
    const response = await axios.get('http://localhost:5004/albums');
    return response.data;
  } catch (error) {
    console.error('Error fetching todos: ', error);
    return [];
  }
};

export default fetchAlbums;