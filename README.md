# shortner_url

deployed link:https://shortner-url-8a48.onrender.com/

URL Shortener with JWT Authentication and EJS for SSR
This project is a URL shortener application built using Node.js and Express, with JWT (JSON Web Tokens) for authentication and EJS (Embedded JavaScript) for server-side rendering (SSR). Users can sign up, log in, and shorten URLs, while authenticated users can access analytics about their shortened URLs.

Features
User Authentication: Sign up, log in, and log out using JWT tokens stored in cookies.
URL Shortening: Authenticated users can shorten URLs.
URL Analytics: Users can view analytics about their shortened URLs, such as click counts.
Server-Side Rendering: The app uses EJS templates to render views dynamically on the server.
MongoDB Integration: Stores user data and URLs in MongoDB.
Technologies Used
Node.js: JavaScript runtime for server-side logic.
Express: Minimal web framework for routing and middleware.
JWT (JSON Web Token): Authentication mechanism using tokens.
MongoDB: Database to store user data and URL data.
Mongoose: Object Data Modeling (ODM) library for MongoDB.
EJS (Embedded JavaScript): Templating engine for server-side rendering.
bcryptjs: Password hashing.
dotenv: To manage environment variables.
Project Structure

.
├── src
│   ├── controllers     # Controller logic for handling requests
│   ├── models          # Mongoose models for MongoDB collections
│   ├── routes          # API and page routes
│   ├── views           # EJS templates for server-side rendering
│   ├── utils           # Utilities like JWT and authentication functions
│   └── db              # MongoDB connection setup
├── .env                # Environment variables (MongoDB URL, JWT secrets, etc.)
├── index.js            # Main entry point of the application
└── package.json        # Project dependencies and scripts
Installation and Setup
Prerequisites
Node.js (v14.x or above)
MongoDB (local or cloud instance such as MongoDB Atlas)
Steps to Run the Project
Clone the Repository:


git clone https://github.com/rishabh180705/shortner_url.git
cd url-shortener-jwt-ejs
Install Dependencies: Install the required dependencies using npm:

npm install
Environment Setup: Create a .env file in the project root and add your environment variables like MongoDB connection string, JWT secret, and server port.

Example .env file:

makefile

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/shortner_URL
JWT_SECRET=your_jwt_secret_key
Database Connection: Ensure your MongoDB instance is running, and the connection URL is provided in .env (MONGO_URI).



Run the Server:

npm run dev
The server will start on the port specified in the .env file (default: 5000).

Access the Application: Open your browser and go to http://localhost:5000/ to view the homepage.




API Routes and Pages
Public Routes
GET /: Renders the homepage with URL shortening form.
GET /login: Renders the login page.
GET /signup: Renders the signup page.
Authenticated Routes
GET /analytics: Shows URL analytics (requires login).
POST /shorten: Shortens a new URL (requires login).
Authentication Routes
POST /signup: Registers a new user.
POST /login: Logs in a user and issues a JWT.
GET /logout: Logs out the user by clearing the JWT token.
Code Walkthrough
1. User Authentication with JWT
JWT Creation: When users log in, a JWT is generated and stored in the user's browser via cookies.

JWT Validation: Protected routes like /analytics and /shorten validate the JWT token from the user's cookies to ensure they are authenticated.


// JWT utility to create and verify tokens
import jwt from 'jsonwebtoken';

export function createToken(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expires in 1 hour
  });
}



export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
2. URL Shortening Logic
The user submits a URL, and it is stored in MongoDB with a unique short URL generated.

import shortid from 'shortid';
import { URL } from '../models/url.js';

async function shortenUrl(req, res) {
  const { originalUrl } = req.body;
  const shortUrl = shortid.generate();
  
  const newUrl = new URL({
    originalUrl,
    shortUrl,
    createdBy: req.user._id,
  });



  await newUrl.save();
  res.redirect('/analytics');
}





3. Server-Side Rendering with EJS
The EJS templates are used to render the pages, passing dynamic data (like URL analytics) from the server to the frontend.
javascript
Copy code
router.get('/analytics', restrictTOLoggedinUserOnly, async (req, res) => {
  const urls = await URL.find({ createdBy: req.user._id });
  res.render('analytics', { urls });




Future Enhancements
Custom URL Slugs: Allow users to create custom slugs for shortened URLs.
Rate Limiting: Implement rate limiting to prevent abuse of the URL shortening service.
Email Verification: Add email verification for user registration.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Contributing
Contributions are welcome! Please open an issue or submit a pull request for any feature requests or bugs.

