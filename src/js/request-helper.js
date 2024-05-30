import axios from "axios";

const BASE_URL = "https://api.thecatapi.com/v1";
const BREEDS_API_ENDPOINT = `${BASE_URL}/breeds`;
const IMAGES_API_ENDPOINT = `${BASE_URL}/images/search?`;

axios.defaults.headers.common["x-api-key"] = secrets.CAT_API_KEY;

function fetchBreeds() {
  return axios.get(`${BREEDS_API_ENDPOINT}`).then((response) => response.data);
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`${IMAGES_API_ENDPOINT}breed_ids=${breedId}`)
    .then((response) => response.data);
}

export { fetchBreeds, fetchCatByBreed };
