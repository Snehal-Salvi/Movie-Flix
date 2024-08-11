# 🎬 Movie Flix 

Movie Flix is a React application that allows users to browse movies, filter them by genre, search for specific movies, and manage a list of favorite movies. This application leverages the TMDb (The Movie Database) API to fetch and display movie data.

## 🌐 Deployment

[Movie Flix]()

## 📸 Application Demo


## 🛠️ Technologies Used 

- **React**: A JavaScript library for building user interfaces.
- **React Router**: For navigation and routing within the application.
- **React Icons**: To use icons throughout the application.
- **Toastify**: For toast notifications.
- **CSS Modules**: For modular and scoped CSS styling.
- **TMDb API**: To fetch movie data.

## ✨ Features 

- **Movie Browsing**: View a list of popular movies.
- **Filtering**: Filter movies by genre.
- **Searching**: Search for movies by title.
- **Favorites**: Add movies to a list of favorites and view them on a separate page.
- **Movie Details**: View detailed information about a specific movie.

## 🛠️ Installation 

To get started with Movie Flix, follow these steps:

1. **Clone the repository**.


2. **Navigate to the project directory**.
3. **Install the dependencies**:

    ```bash
    npm install
    ```

4. **Create a `.env` file** in the root directory and add your TMDb API key:

    ```env
    REACT_APP_API_KEY=your_tmdb_api_key
    REACT_APP_ACCESS_TOKEN=your_tmdb_access_token
    ```

5. **Start the development server**:

    ```bash
    npm start
    ```

    The application will be running on `http://localhost:3000`.

## 🧩 Components 

### Header

- **Description**: Displays the application title and icon.
- **Path**: `./components/Header/Header.js`

### Home

- **Description**: Displays the main page with a list of movies, search bar, and filter options.
- **Path**: `./components/Home/Home.js`

### Favorites

- **Description**: Shows the list of favorite movies.
- **Path**: `./components/Favorites/Favorites.js`

### MovieDetails

- **Description**: Displays detailed information about a selected movie.
- **Path**: `./components/Movie/MovieDetails.js`

### Card

- **Description**: Represents a movie card with a poster, title, and favorite button.
- **Path**: `./components/Card/Card.js`

### FilterBar

- **Description**: Allows users to filter movies by genre.
- **Path**: `./components/Filter/FilterBar.js`

### SearchBar

- **Description**: Provides a search interface for finding movies by title.
- **Path**: `./components/Search/SearchBar.js`

### Loader

- **Description**: Displays a loading spinner while data is being fetched.
- **Path**: `./components/Loader/Loader.js`

## 🎣 Hooks 

### useInfiniteScroll

- **Description**: Custom hook for implementing infinite scrolling.
- **Path**: `./hooks/useInfiniteScroll.js`

## 📖 Usage 

- **Navigate**: Use the navigation links or browser back and forward buttons to move between pages.
- **Search**: Type in the search bar to find specific movies.
- **Filter**: Select a genre from the dropdown to filter the movie list.
- **Favorites**: Click the heart icon on a movie card to add or remove it from your favorites list.


## 👩‍💻 Authors

- [@Snehal](https://github.com/Snehal-Salvi)




