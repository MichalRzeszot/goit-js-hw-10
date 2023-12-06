import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_bKos22lfkR2KSSZCf3f2DRAz4y5lV6qNZLWGaBuRF1JVl4O1USEmGeRbOIZNpqZK';

export const fetchBreeds = async () => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCatByBreed = async breedId => {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
