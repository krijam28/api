import axios from 'axios';

const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:5000/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching photos: ', error);
    return [];
  }
};



export default fetchUsers;