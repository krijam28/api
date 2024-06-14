// fetchPhotos.js

import axios from 'axios';

const fetchPhotos = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
    return response.data;
  } catch (error) {
    console.error('Error fetching photos: ', error);
    return [];
  }
};

export default fetchPhotos;
