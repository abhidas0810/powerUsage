# Power Usage App A Backend Application To Track Power Usage

![Logo](https://www.linkpicture.com/q/Screenshot-2023-03-03-101138.png)

## About

The backend of power usage app where the user can register themselves. After registration user can login and add power usage, get list power usage and get list power usage day wise.

## Author
- [Abhishek Das](https://github.com/abhidas0810)

## User Features

- Register as user
- Login as user
- Add power usage
- Get list of power usage in a time duration
- Get list of power usage in a time duration date wise

## Tech Stack

**Web Server:** Node.js

**Routing Framework:** Express

**Database:** MySQL

**Version Control:** Git

**Documentation:** Postman

## Run Locally

Clone the project

```bash
  git clone https://github.com/abhidas0810/powerUsage.git
```

**Packages needed to install**

- npm init -y
- npm install --save express
- npm install --save mysql
- npm install --save-dev nodemon
- npm i jsonwebtoken
- npm install dotenv

**Create database and tables**

Go to databaseConfiguration folder first open user.sql copy all queries and paste the mysql queries in your mysql command line client.
Then copy paste the mysql queries from powerUsage.sql file.

**Start the server**

- npm run server

**REST API for user registration**

- http://localhost:8888/user/register

![Logo](https://www.linkpicture.com/q/userregister.png)

**REST API for user login**

- http://localhost:8888/user/login

![Logo](https://www.linkpicture.com/q/login_3.png)
