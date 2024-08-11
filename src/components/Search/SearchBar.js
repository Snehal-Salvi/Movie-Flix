import React, { useState, useCallback } from "react";
import styles from "./SearchBar.module.css";
import { FaSearch, FaTimes } from "react-icons/fa";

const apiKey = process.env.REACT_APP_API_KEY; // API key for authentication
const baseUrl = "https://api.themoviedb.org/3/search/movie"; // API endpoint for movie search

/*The SearchBar component allows users to search for movies by querying an external API. 
It manages the search input state, triggers API calls to fetch search results 
based on the query, and provides a clear button to reset the search input. */

export default function SearchBar({ onSearchResults }) {
  const [query, setQuery] = useState(""); // State to manage the search query

  // Function to fetch search results based on the query
  const fetchSearchResults = useCallback(
    async (searchQuery) => {
      if (!searchQuery.trim()) {
        onSearchResults([]); // Clear search results if query is empty
        return;
      }

      try {
        const response = await fetch(
          `${baseUrl}?api_key=${apiKey}&query=${encodeURIComponent(
            searchQuery
          )}&include_adult=false`
        );
        const result = await response.json();

        if (result.results) {
          onSearchResults(result.results); // Pass search results to parent component
        } else {
          console.error("Unexpected API response:", result); // Log unexpected responses
        }
      } catch (error) {
        console.error("Fetch error:", error); // Log fetch errors
      }
    },
    [onSearchResults]
  );

  // Handle input change and trigger search
  const handleChange = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery); // Update query state
    fetchSearchResults(searchQuery); // Fetch results based on new query
  };

  // Clear the search input and reset search results
  const handleClear = () => {
    setQuery(""); // Clear query state
    onSearchResults([]); // Reset search results
  };

  return (
    <div className={styles.searchBar}>
      {/* Search icon */}
      <FaSearch className={styles.searchIcon} />
      <input
        type="text"
        name="search"
        placeholder="Search.."
        value={query}
        onChange={handleChange} // Trigger handleChange on input change
        className={styles.searchInput}
      />
      {/* Clear button appears when there is a query */}
      {query && (
        <FaTimes
          className={`${styles.clearButton} ${!query ? styles.hidden : ""}`}
          onClick={handleClear} // Trigger handleClear on button click
        />
      )}
    </div>
  );
}
