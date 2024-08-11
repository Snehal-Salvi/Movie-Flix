import React, { useState, useEffect } from "react";
import styles from "./FilterBar.module.css";
import { FaFilter } from "react-icons/fa";

const apiKey = process.env.REACT_APP_API_KEY; // API key for authentication
const baseUrl = "https://api.themoviedb.org/3/genre/movie/list"; // API endpoint for fetching genres

/*The FilterBar component allows users to filter movies by genre. 
It fetches genre data from an API and provides a dropdown menu for selecting a genre, 
which triggers a filter change event. */

export default function FilterBar({ onFilterChange }) {
  // State to store the currently selected genre
  const [selectedGenre, setSelectedGenre] = useState("All");
  // State to store the list of genres fetched from the API
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    // Function to fetch genres from the API
    async function fetchGenres() {
      try {
        // Make a request to the API to get the list of genres
        const response = await fetch(
          `${baseUrl}?api_key=${apiKey}&language=en-US`
        );
        // Parse the response JSON
        const result = await response.json();
        // Check if genres are present in the result and set them in state
        if (result.genres) {
          setGenres(result.genres);
        } else {
          // Log an error if the response does not contain genres
          console.error("Unexpected API response:", result);
        }
      } catch (error) {
        // Log any errors encountered during the fetch operation
        console.error("Fetch error:", error);
      }
    }

    fetchGenres(); // Call the fetch function when the component mounts
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    // Trigger the onFilterChange callback whenever the selected genre changes
    onFilterChange(selectedGenre);
  }, [selectedGenre, onFilterChange]); // Dependency array includes selectedGenre and onFilterChange

  return (
    <div className={styles.filterBar}>
      <FaFilter className={styles.filterIcon} /> {/* Display filter icon */}
      <div className={styles.filterGroup}>
        <label htmlFor="genre">Filters</label>
        <select
          id="genre"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className={styles.select}
        >
          <option value="All">All</option>
          {/* Map over the genres array to create option elements for each genre */}
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
