# SwapiApi Project

## Overview

SwapiApi Project is a Node.js application that integrates with the Star Wars API (SWAPI) to provide information about characters, starships, and planets from the Star Wars universe.

## Features

- Retrieve a list of characters, starships, and planets.
- Filter data based on specific criteria.
- Sort data based on a selected attribute.
- Implement caching for improved performance.

## Project Structure

The project follows a modular structure with folders for controllers, services, routes, and utils.

|-- src
| |-- controllers
| |-- routes
| |-- services
| |-- utils
| |-- app.js
|-- .gitignore
|-- package.json
|-- README.md


## Getting Started

### Prerequisites

- Node.js installed
- npm installed
- SQLite for database

### Installation

1. Clone the repository:

```bash
git clone https://github.com/MayankIITMandi/SwapiApi-Integration.git


2.Install dependencies:
bash
Copy code
cd SwapiApi-Integration
npm install
Set up the SQLite database:
bash
Copy code
npm run migrate
Start the application:
bash
Copy code
npm start

----------------------///-----------------
API Endpoints

Retrieve All Data
Endpoint: /api/:type
Method: GET
Description: Retrieve all characters, starships, or planets.


Filtered Data
Endpoint: /api/:type/filtered
Method: GET
Description: Retrieve filtered data based on query parameters.


Sorted Data
Endpoint: /api/:type/sorted
Method: GET
Description: Retrieve sorted data based on a specified attribute.
Additional Features (Not Implemented Yet)
Pagination: Allow users to request a specific page of results.
Advanced Search: Enable more advanced search queries.
Rate Limiting: Implement rate limiting to prevent abuse.
Contributing
If you'd like to contribute to this project, please follow the guidelines in CONTRIBUTING.md.

License
This project is licensed under the MIT License - see the LICENSE.md file for details.
