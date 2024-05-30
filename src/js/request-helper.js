import axios from "axios";

const BASE_URL = "https://api.thecatapi.com/v1";
const BREEDS_API_ENDPOINT = `${BASE_URL}/breeds`;
const IMAGES_API_ENDPOINT = `${BASE_URL}/images/search?`;
const API_KEY_HEADER = "x-api-key";
const BREEDS_CACHE_KEY = "cat_breeds";
const CAT_BY_BREED_CACHE_KEY = "cat_by_breed";
const CAT_API_KEY = process.env.CAT_API_KEY;

function fetchBreeds() {
  const rawCachedCatBreeds = localStorage.getItem(BREEDS_CACHE_KEY);

  if (rawCachedCatBreeds) {
    const parsedData = JSON.parse(rawCachedCatBreeds);
    console.log("[fetchBreeds] cachedCatBreeds: ", parsedData);
    return JSON.parse(parsedData);
  }

  console.log('Does CAT_API_KEY exist: ', !!CAT_API_KEY);

  return axios
    .get(`${BREEDS_API_ENDPOINT}`, {
      headers: {
        API_KEY_HEADER: CAT_API_KEY,
      },
    })
    .then((response) => {
      localStorage.setItem(BREEDS_CACHE_KEY, JSON.stringify(response.data));
      console.log("[fetchBreeds] response: ", response);
      return response.data;
    });
}

function fetchCatByBreed(breedId) {
  const rawCachedCatByBreed = localStorage.getItem(CAT_BY_BREED_CACHE_KEY);

  if (rawCachedCatByBreed) {
    const parsedData = JSON.parse(rawCachedCatByBreed);
    console.log("[fetchCatByBreed] cachedCatByBreed: ", parsedData);
    return JSON.parse(parsedData);
  }

  console.log('Does CAT_API_KEY exist: ', !!CAT_API_KEY);

  return axios
    .get(`${IMAGES_API_ENDPOINT}breed_ids=${breedId}`, {
      headers: {
        API_KEY_HEADER: CAT_API_KEY,
      },
    })
    .then((response) => {
      localStorage.setItem(
        CAT_BY_BREED_CACHE_KEY,
        JSON.stringify(response.data)
      );
      console.log("[fetchCatByBreed] response: ", response);
      return response.data;
    });
}

export { fetchBreeds, fetchCatByBreed };
