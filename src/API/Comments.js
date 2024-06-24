import axios from 'axios';

const fetchComments = async () => {
  try {
    const response = await axios.get('http://localhost:5002/comments');
    return response.data;
  } catch (error) {
    console.error('Error fetching comments: ', error);
    return [];
  }
};

export default fetchComments;