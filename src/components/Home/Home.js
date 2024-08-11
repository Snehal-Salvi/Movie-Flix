import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import Movie from "../Movie/Movie";
import FilterBar from "../Filter/FilterBar";
import SearchBar from "../Search/SearchBar";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const apiKey = process.env.REACT_APP_ACCESS_TOKEN; // API key for authentication
const baseUrl = "https://api.themoviedb.org/3/discover/movie"; // API endpoint for fetching movies

/*The Home component serves as the main page for displaying movies. 
It integrates a search bar, a filter bar, and a link to favorite movies. 
It fetches and manages movie data based on genre and search criteria. */

export default function Home() {
  // State to store the currently selected genre for filtering
  const [selectedGenre, setSelectedGenre] = useState("All");
  // State to store all fetched movies
  const [allMovies, setAllMovies] = useState([]);
  // State to store search results
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Function to fetch movies from the API based on selected genre
    async function fetchMovies() {
      try {
        // Apply genre filter if a specific genre is selected
        const genreFilter =
          selectedGenre === "All" ? "" : `&with_genres=${selectedGenre}`;
        // Fetch movies from the API
        const response = await fetch(
          `${baseUrl}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc${genreFilter}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
        // Parse the response JSON
        const result = await response.json();
        // Set the movies in state if the response contains results
        if (result.results) {
          setAllMovies(result.results);
          setSearchResults(result.results);
        } else {
          // Log an error if the response does not contain results
          console.error("Unexpected API response:", result);
        }
      } catch (error) {
        // Log any errors encountered during the fetch operation
        console.error("Fetch error:", error);
      }
    }

    fetchMovies(); // Call the fetch function when the component mounts or the genre changes
  }, [selectedGenre]); // Dependency array includes selectedGenre

  // Handler function to update the selected genre when a filter is applied
  const handleFilterChange = (genre) => {
    setSelectedGenre(genre);
  };

  // Handler function to update search results based on user search input
  const handleSearchResults = (results) => {
    if (results.length === 0) {
      // If no search results, show all movies
      setSearchResults(allMovies);
    } else {
      // Update search results with the provided results
      setSearchResults(results);
    }
  };

  return (
    <>
      <div className={styles.controlsSection}>
        {/* Search bar component for filtering movies by search input */}
        <SearchBar onSearchResults={handleSearchResults} />
        {/* Filter bar component for selecting movie genres */}
        <FilterBar onFilterChange={handleFilterChange} />

        {/* Link to the favorites page */}
        <div className={styles.favourite}>
          <Link to="/favorites" className={styles.link}>
            {/* Favorite icon and label */}
            <FaHeart className={styles.favouriteIcon} />
            <span className={styles.favouriteName}>Favorites</span>
          </Link>
        </div>
      </div>
      {/* Movie component to display the list of movies based on search results and selected genre */}
      <Movie selectedGenre={selectedGenre} searchResults={searchResults} />
    </>
  );
}
