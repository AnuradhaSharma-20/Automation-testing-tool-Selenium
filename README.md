
This project is a simple web application using Express.js, EJS templates, and MySQL. It includes functionality to view, edit, and create user profiles.
The application also includes unit and integration tests using Mocha, Supertest, and Mochaawesome.
## Table of Contents
- Installation
- Usage
- Database Setup
- Project Structure
- Running Tests
## Installation
1. Clone the repository:
   git clone https://github.com/yourusername/submission-task-1.git
   cd submission-task-1
2. Install project dependencies:
    npm install
3. Install additional tools:
    npm install express mysql2 mocha supertest mochaawesome selenium-webdriver
## Usage
1. Start the server:
    node server.js
2.Navigate to the application:
    Open your browser and go to http://localhost:3000.
## Database Setup
1. Create a MySQL database:
    CREATE DATABASE ????;
    USE ???;
    Create the Users table:
    CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    nickname VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    bio TEXT
    );
## Project Structure
    submission-task-1/
    ├── public/
    │   ├── style.css
    │   ├── index.ejs
    │   ├── profile.ejs
    │   ├── edit.ejs
    │   ├── create.ejs
    ├── database.js
    ├── logic.js
    ├── server.js
    ├── test/
    │   ├── unit/
    │   │   ├── users.test.mjs
    │   ├── integration/
    │   │   ├── logic.test.mjs
    ├── .gitignore
    ├── package.json
    └── README.md
    -public/: Contains CSS styles and JS templates for different views.
    -database.js: Contains functions to interact with the MySQL database.
    -logic.js: Contains business logic and uses database.js for database interactions.
    -server.js: Sets up the Express server and routes.
    -test/: Contains unit and integration tests.
## Running Tests
    1. Run unit tests:
    npx mocha test/unit --reporter mochaawesome
    2.Run integration tests:
    npx mocha test/integration --reporter mochaawesome
    3.Generate test report:
    The test report will be generated in the mochawesome-report folder.
## Routes
    /: Home page.
    /profile/:id: Profile page for a specific user.
    /edit/:id: Edit profile page for a specific user.
    /create: Create a new profile.
## Contributing
    Feel free to fork this repository and make changes. Pull requests are welcome.
## License
    This project is licensed under the MIT License. See the LICENSE file for details.
This README file provides clear instructions for setting up the project, running the server