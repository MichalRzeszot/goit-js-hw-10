import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_bKos22lfkR2KSSZCf3f2DRAz4y5lV6qNZLWGaBuRF1JVl4O1USEmGeRbOIZNpqZK';

export const fetchBreeds = async () => {
  try {
    const response = await axios.get(`${CAT_API_URL}/breeds`, {
      timeout: 5000,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching breeds:', error);
    throw error;
  }
};

const CAT_API_URL = 'https://api.thecatapi.com/v1';

export const fetchCatByBreed = async breedId => {
  try {
    const response = await axios.get(
      `${CAT_API_URL}/images/search?breed_ids=${breedId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
