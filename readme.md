# 🎬 CineVault

CineVault is a modern movie discovery web application built with React that helps users explore trending movies, search for their favorite films, filter by genre, and maintain a personalized watchlist.

It is designed with a clean cinematic UI inspired by streaming platforms and focuses on smooth user experience, dynamic data fetching, and scalable component architecture.

---

## 🚀 Features

* 🔍 **Movie Search**

  * Search movies instantly by title using the TMDB API

* 🎭 **Genre Filtering**

  * Browse movies by genres such as:

    * Action
    * Horror
    * Thriller
    * Comedy
    * Sci-Fi

* 📈 **Trending Movies**

  * View currently trending movies fetched dynamically from API

* 🎬 **Movie Details Page**

  * Detailed movie information including:

    * Poster
    * Rating
    * Overview
    * Release date
    * Trailer

* ❤️ **Watchlist**

  * Save movies to a personal watchlist for later viewing

* 🎨 **Modern UI**

  * Responsive and visually appealing interface with smooth interactions

---

## 🛠 Tech Stack

### Frontend

* React
* JavaScript
* CSS3
* React Router DOM

### APIs

* TMDB API

### Tools

* Vite
* Git
* GitHub

---

## 🧠 Key Concepts Implemented

This project demonstrates practical frontend engineering concepts such as:

* Component-based architecture
* State management using React Hooks
* Dynamic API fetching
* Conditional rendering
* Props drilling and parent-child communication
* Routing with dynamic parameters
* Local storage for watchlist persistence

---

## 📂 Project Structure

```bash
src/
 ┣ components/
 ┃ ┣ Navbar.jsx
 ┃ ┣ Hero.jsx
 ┃ ┣ SearchBar.jsx
 ┃ ┣ Trending.jsx
 ┃ ┗ MyPicks.jsx
 ┣ pages/
 ┃ ┣ HomeScreen.jsx
 ┃ ┣ MovieDetails.jsx
 ┃ ┗ WatchList.jsx
 ┣ App.jsx
 ┗ main.jsx
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone <your-repo-link>
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file and add:

```env
VITE_TMDB_API_KEY=your_api_key_here
```

Get your API key from [TMDB Developer Portal](https://developer.themoviedb.org/?utm_source=chatgpt.com)

---

## 🔮 Future Improvements

Planned features for CineVault:

* AI-powered movie recommendations
* User authentication
* Dark / light theme toggle
* Debounced search
* Recommendation engine based on watch history
* Backend integration for persistent user data

---

## 👨‍💻 Author

Developed by **Tanishq Singhal**

CineVault is a personal project built to strengthen frontend engineering skills and demonstrate real-world React development practices.
