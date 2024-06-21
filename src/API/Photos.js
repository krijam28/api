import axios from 'axios';

const fetchPhotos = async () => {
  try {
    const response = await axios.get('http://localhost:5006/photos');
    return response.data;
  } catch (error) {
    console.error('Error fetching photos: ', error);
    return [];
  }
};
export default fetchPhotos;
