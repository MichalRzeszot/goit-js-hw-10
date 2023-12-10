import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_bKos22lfkR2KSSZCf3f2DRAz4y5lV6qNZLWGaBuRF1JVl4O1USEmGeRbOIZNpqZK';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return axios.get('/breeds').then(({ data }) => data);
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`images/search?breed_ids=${breedId}`)
    .then(({ data }) => data);
}
