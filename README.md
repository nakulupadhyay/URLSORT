# URL Shortener

A simple full-stack URL shortening application built with Node.js, Express, MongoDB, and a static frontend.

## 🚀 Project Overview

This project lets users shorten long URLs into a short code that redirects to the original link. It also tracks click counts and shows live usage stats in the frontend.

## 🧩 Features

- Shorten any valid URL
- Redirect using generated short codes
- Track click count for each shortened URL
- Copy shortened URL to clipboard
- Live stats update every 5 seconds

## 🏗️ Tech Stack

- backend: `Node.js`, `Express`, `MongoDB`, `Mongoose`, `CORS`
- frontend: `HTML`, `CSS`, `JavaScript`

## 📁 Project Structure

- `backend/`
  - `app.js` — Express server and API routes
  - `models/Url.js` — Mongoose schema for URL storage
  - `package.json` — backend dependencies
- `frontend/`
  - `index.html` — user interface
  - `style.css` — styling for the UI
  - `script.js` — frontend logic and API calls


## ⚙️ Setup Instructions

1. Install [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/try/download/community).
2. Open a terminal and go to the backend folder:
   ```bash
   cd "d:\Node js\UrlSort\backend"
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start MongoDB locally.
5. Start the backend server:
   ```bash
   node app.js
   ```
6. Open `frontend/index.html` in your browser or use a static server.

> The backend listens on `http://localhost:3000` and the frontend sends API requests to that address.

## ▶️ How to Use

1. Enter a valid URL in the input field.
2. Click `Shorten`.
3. Copy the generated shortened URL using the `Copy` button.
4. Visit the shortened URL to redirect to the original destination.
5. View stats to see how many times the short link was accessed.

## 🧪 API Endpoints

- `POST /shorten`
  - Request body: `{ "url": "https://example.com" }`
  - Response: `{ "shortCode": "abc123" }`

- `GET /:shortCode`
  - Redirects the browser to the original URL.

- `GET /stats/:shortCode`
  - Returns JSON stats:
    ```json
    {
      "originalUrl": "https://example.com",
      "shortCode": "abc123",
      "count": 5
    }
    ```

## 🧠 Data Model

The `Url` model stores:

- `originalUrl` — the original destination URL
- `shortCode` — generated short identifier
- `count` — number of redirects
- timestamps for creation and updates

## 🖼️ Screenshots

### UI Preview

![Homepage]
<img width="1920" height="838" alt="image" src="https://github.com/user-attachments/assets/c4d796ce-f8fb-4c64-aaed-ecad42f2f833" />


<img width="1920" height="838" alt="image" src="https://github.com/user-attachments/assets/9437c82d-4df7-41c5-ad4c-10daea507883" />


## 💡 Notes

- The backend uses CORS so the frontend can request `http://localhost:3000` from a local file or web server.
- The short codes are generated randomly and stored in MongoDB.

## 📌 Tips

- If you get CORS or fetch errors, open `frontend/index.html` through a local static host such as Live Server.
- If the database does not connect, verify MongoDB is running and reachable at `mongodb://localhost: ####/url`.
