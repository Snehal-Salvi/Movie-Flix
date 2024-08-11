import React, { useState, useEffect, useCallback } from "react";
import styles from "./Movie.module.css";
import Card from "../Card/Card";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import Loader from "../Loader/Loader";

const apiKey = process.env.REACT_APP_ACCESS_TOKEN; // API key for authentication
const baseUrl = "https://api.themoviedb.org/3/discover/movie"; // API endpoint for fetching movies

/*The Movie component displays a list of movies with infinite scrolling. 
It handles fetching and displaying movies based on selected genre and search results, 
managing favorite movies with local storage, and updating the list as the user scrolls.*/

const Movie = ({ selectedGenre, searchResults }) => {
  // State to store movies displayed in the component
  const [movies, setMovies] = useState(searchResults);
  // State to keep track of the current page for pagination
  const [page, setPage] = useState(1);
  // State to indicate if there are more movies to load
  const [hasMore, setHasMore] = useState(true);
  // State to manage the list of favorite movies
  const [favorites, setFavorites] = useState(() => {
    // Retrieve favorites from localStorage or initialize as an empty array
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Function to fetch movies from the API
  const fetchMovies = useCallback(async () => {
    try {
      // Construct query parameters based on selected genre
      const genreFilter =
        selectedGenre === "All" ? "" : `&with_genres=${selectedGenre}`;
      // Fetch movies from the API
      const response = await fetch(
        `${baseUrl}?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc${genreFilter}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      const result = await response.json();

      if (result.results) {
        // Update movies state with new results while avoiding duplicates
        setMovies((prevMovies) => {
          const newMovies = result.results;
          const allMovies = [...prevMovies, ...newMovies];
          const uniqueMovies = Array.from(
            new Set(allMovies.map((movie) => movie.id))
          ).map((id) => allMovies.find((movie) => movie.id === id));
          return uniqueMovies;
        });
        // Check if there are more pages to load
        setHasMore(page < result.total_pages);
      } else {
        console.error("Unexpected API response:", result);
      }
    } catch (error) {
      // Log any errors encountered during the fetch operation
      console.error("Fetch error:", error);
    }
  }, [page, selectedGenre]); // Dependencies for fetching movies

  useEffect(() => {
    fetchMovies(); // Fetch movies when component mounts or page/genre changes
  }, [fetchMovies]);

  useEffect(() => {
    // Reset movies and page when search results or selected genre change
    setMovies(searchResults);
    setPage(1);
  }, [searchResults, selectedGenre]);

  // Custom hook for infinite scrolling
  const [loading, setLoading] = useInfiniteScroll(fetchMovies, hasMore);

  useEffect(() => {
    // Increment page number when loading is true
    if (loading) {
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
    }
  }, [loading, setLoading]);

  // Function to toggle movie's favorite status
  const toggleFavorite = (movie) => {
    const isFavorite = favorites.some((fav) => fav.id === movie.id);
    const updatedFavorites = isFavorite
      ? favorites.filter((fav) => fav.id !== movie.id)
      : [...favorites, movie];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    toast(
      <div>
        <FaHeart style={{ color: isFavorite ? "red" : "white" }} />{" "}
        {isFavorite ? "Removed from favorites" : "Added to favorites"}
      </div>,
      {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      }
    );
  };

  return (
    <div className={styles.container}>
      {movies.length > 0 ? (
        // Render Card component for each movie
        movies.map((movie) => (
          <Card
            key={movie.id}
            movie={movie}
            onToggleFavorite={toggleFavorite}
            isFavorited={favorites.some((fav) => fav.id === movie.id)}
          />
        ))
      ) : (
        // Display a loader if there are no movies
        <p className={styles.noResults}>
          <Loader />
        </p>
      )}
      {/* Display a loader while fetching more movies */}
      {loading && <Loader />}
    </div>
  );
};

export default Movie;
