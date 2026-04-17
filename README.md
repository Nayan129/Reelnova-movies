# 🎬 ReelNova — Full Stack Movie Discovery Platform

A modern full-stack movie discovery platform where users can explore trending movies, search titles, watch trailers, manage favorites, and track watch history. The project is built with a **production-style architecture** using React, Node.js, MongoDB, and Redis, and deployed to the cloud.

🌐 Live Demo: https://reelnova-movies.vercel.app/
⚙️ Backend API: https://reelnova-movie-app.onrender.com

---

# 🚀 Why This Project Stands Out

ReelNova is not just a frontend demo project. It is a **fully deployed full-stack system** designed with real-world engineering practices.

This project demonstrates my ability to:

- Design scalable backend APIs
- Implement Redis caching for performance
- Build a modern React architecture
- Integrate third-party APIs (TMDB)
- Deploy a production cloud environment
- Handle authentication, persistence, and state management

---

# 🧠 Engineering Highlights

### Redis Caching Layer

Trending and frequently accessed movie data are cached using Redis to improve performance and reduce external API calls.

Architecture:

Client → Express API → Redis Cache → TMDB API

Benefits:

- Faster API response times
- Reduced third-party API requests
- Production-level backend optimization

---

### Feature-Based Frontend Architecture

The frontend follows a modular feature-based structure for scalability and maintainability.

Example structure:

src  
 ├── components  
 ├── features  
 │ ├── movies  
 │ ├── auth  
 │ ├── favorites  
 │ └── history  
 ├── api  
 └── hooks

---

### Production Deployment Architecture

Frontend → Netlify  
Backend → Render  
Database → MongoDB Atlas  
Cache → Redis  
External API → TMDB

This architecture closely resembles real industry deployment setups.

---

# ✨ Features

🎥 Movie Discovery

- Trending movies
- Popular movies
- TV shows
- Movie details page

🔍 Smart Search  
Search movies by title using TMDB API integration.

❤️ Favorites System  
Users can add or remove movies from favorites.

🕒 Watch History  
Tracks movies the user has viewed.

🎬 Trailer Playback  
Embedded YouTube trailers for movies.

🔐 Authentication  
Secure login and registration system.

⚡ Performance Optimization  
Redis caching for frequently accessed movie data.

🎨 Modern UI  
Responsive layout with skeleton loaders and smooth navigation.

---

# 🛠️ Tech Stack

Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios

Backend

- Node.js
- Express.js
- MongoDB
- Redis

APIs

- TMDB (The Movie Database)

Deployment

- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas
- Redis Cloud

---

# 🧪 Local Development

Clone the repository

git clone https://github.com/yourusername/reelnova.git

Install dependencies

Frontend

cd Frontend  
npm install  
npm run dev

Backend

cd Backend  
npm install  
npm run dev

---

# 🔑 Environment Variables

Backend `.env`

MONGO_URI=your_mongodb_uri  
JWT_SECRET=your_secret  
TMDB_API_KEY=your_tmdb_key  
TMDB_BASE_URL=https://api.themoviedb.org/3  
REDIS_HOST=your_redis_host  
REDIS_PORT=your_redis_port  
REDIS_PASSWORD=your_redis_password

---

# 📸 Screenshots

---

# 📈 What I Learned

While building ReelNova I gained hands-on experience with:

- Designing REST APIs
- Building scalable React architectures
- Integrating third-party APIs
- Implementing Redis caching
- Managing authentication systems
- Deploying full-stack applications

This project helped me understand how **production systems are structured and deployed**.

---

# 🔮 Future Improvements

- Infinite scrolling
- Movie recommendation engine
- Watchlist system
- Performance optimizations
- Improved caching strategies

---

# 👨‍💻 Author

Nayan Bhusari  
Frontend / Full Stack Developer

GitHub  
https://github.com/Nayan129

---

⭐ If you like this project, consider giving the repository a star.
