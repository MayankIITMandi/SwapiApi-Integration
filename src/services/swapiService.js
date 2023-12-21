const axios = require('axios');
const cache = require('../utils/cache');

const swapiBaseUrl = 'https://swapi.dev/api';

async function getAllCharacters() {
  const cachedData = cache.get('characters');
  if (cachedData) {
    return cachedData;
  }
  const response = await axios.get(`${swapiBaseUrl}/people`);
  const characters = response.data.results;

  // Cache the data with a TTL (time-to-live) of 1 hour
  cache.set('characters', characters, 3600);
  return characters;
}

async function getAllStarships() {
  const cachedData = cache.get('starships');
  if (cachedData) {
    return cachedData;
  }
  const response = await axios.get(`${swapiBaseUrl}/starships`);
  const starships = response.data.results;

  // Cache the data with a TTL (time-to-live) of 1 hour
  cache.set('starships', starships, 3600);
  return starships;
}

async function getAllPlanets() {
  const cachedData = cache.get('planets');
  if (cachedData) {
    return cachedData;
  }
  const response = await axios.get(`${swapiBaseUrl}/planets`);
  const planets = response.data.results;

  // Cache the data with a TTL (time-to-live) of 1 hour
  cache.set('planets', planets, 3600);
  return planets;
}

async function getFilteredData(type, filters) {
  const allData = await getAllByType(type);

  // Apply filters and return the result
  const filteredData = applyFilters(allData, filters);
  return filteredData;
}

async function getSortedData(type, sortBy) {
  const allData = await getAllByType(type);

  if (!sortBy || !allData[0][sortBy]) {
    throw new Error('Invalid or missing sortBy parameter');
  }

  // Apply sorting and return the result
  const sortedData = sortData(allData, sortBy);
  return sortedData;
}

function applyFilters(data, filters) {
  return data.filter(item => {
    for (const filterKey in filters) {
      if (item[filterKey] !== filters[filterKey]) {
        return false;
      }
    }
    return true;
  });
}

function sortData(data, sortBy) {
  try {
    return data.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      // Assuming the values are strings; add logic for other data types
      return aValue.localeCompare(bValue);
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getAllByType(type) {
  switch (type) {
    case 'characters':
      return getAllCharacters();
    case 'starships':
      return getAllStarships();
    case 'planets':
      return getAllPlanets();
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
}

module.exports = {
  getAllCharacters,
  getAllStarships,
  getAllPlanets,
  getFilteredData,
  getSortedData,
};
