const swapiService = require('../services/swapiService');
const cache = require('../utils/cache');
const errorMessages = require('../utils/error');

async function getAll(req, res) {
  try {
    const { type } = req.params;

    switch (type) {
      case 'characters':
        const people = await swapiService.getAllCharacters();
        if (people.length === 0) {
          res.status(404).send(`No characters found for type: ${type}`);
        } else {
          res.json(people);
        }
        break;
      case 'starships':
        const starships = await swapiService.getAllStarships();
        if (starships.length === 0) {
          res.status(404).send(`No starships found for type: ${type}`);
        } else {
          res.json(starships);
        }
        break;
      case 'planets':
        const planets = await swapiService.getAllPlanets();
        if (planets.length === 0) {
          res.status(404).send(`No planets found for type: ${type}`);
        } else {
          res.json(planets);
        }
        break;
      default:
        res.status(404).send(`No data found for type: ${type}`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
}

async function getFilteredData(req, res) {
  try {
    const { type } = req.params;
    const cachedData = cache.get(type);

    // If cached data is available, apply filters and return
    if (cachedData) {
      const filteredData = applyFilters(cachedData, req.query);
      if (filteredData.length === 0) {
        res.status(404).send(`No data found for type: ${type} with given filters`);
      } else {
        return res.json(filteredData);
      }
    }

    // If not cached, fetch all data and cache it
    const allData = await getAllByType(type);
    cache.set(type, allData, 3600);

    // Apply filters and return the result
    const filteredData = applyFilters(allData, req.query);
    if (filteredData.length === 0) {
      res.status(404).send(`No data found for type: ${type} with given filters`);
    } else {
      res.json(filteredData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
}

async function getSortedData(req, res) {
  try {
    const { type } = req.params;
    const { sortBy } = req.query;

    const cachedData = cache.get(type);

    // If cached data is available, apply sorting and return
    if (cachedData) {
      const sortedData = sortData(cachedData, sortBy);
      if (sortedData.length === 0) {
        res.status(404).send(`No data found for type: ${type} to sort`);
      } else {
        return res.json(sortedData);
      }
    }

    // If not cached, fetch all data and cache it
    const allData = await getAllByType(type);
    cache.set(type, allData, 3600);

    // Apply sorting and return the result
    const sortedData = sortData(allData, sortBy);
    if (sortedData.length === 0) {
      res.status(404).send(`No data found for type: ${type} to sort`);
    } else {
      res.json(sortedData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
}

async function getAllByType(type) {
  try {
    switch (type) {
      case 'characters':
        return swapiService.getAllCharacters();
      case 'starships':
        return swapiService.getAllStarships();
      case 'planets':
        return swapiService.getAllPlanets();
      default:
        throw new Error(`Unsupported type: ${type}`);
    }
  } catch (error) {
    throw new Error(`Error fetching data for type ${type}: ${error.message}`);
  }
}

function applyFilters(data, filters) {
  return data.filter(item => {
    for (const filterKey in filters) {
      const filterValue = filters[filterKey].toLowerCase();
      const itemValue = String(item[filterKey]).toLowerCase(); // Convert to string

      if (!itemValue || !itemValue.includes(filterValue)) {
        return false;
      }
    }
    return true;
  });
}

function sortData(data, sortBy) {
  try {
    return data.sort((a, b) => {
      const aValue = String(a[sortBy]);
      const bValue = String(b[sortBy]);

      return aValue.localeCompare(bValue);
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

module.exports = {
  getAll,
  getFilteredData,
  getSortedData,
};
