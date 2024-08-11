import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./MovieDetails.module.css";
import {
  FaHome,
  FaCalendarAlt,
  FaStar,
  FaDollarSign,
  FaTag,
  FaLink,
} from "react-icons/fa";
import Loader from "../Loader/Loader";

const apiKey = process.env.REACT_APP_API_KEY; // API key for authentication
const baseUrl = "https://api.themoviedb.org/3/movie"; // API endpoint for fetching movie details

/*The MovieDetails component displays detailed information about 
a specific movie based on its ID. It fetches the movie data from an API, 
shows a loading spinner while fetching, and provides navigation and detailed information 
about the movie including its poster, overview, release date, ratings, budget, and revenue. */

const MovieDetails = () => {
  const { movieId } = useParams(); // Extract movieId from URL parameters
  const [movie, setMovie] = useState(null); // State to store movie details
  const navigate = useNavigate(); // Hook to navigate

  useEffect(() => {
    // Function to fetch movie details from the API
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/${movieId}?api_key=${apiKey}&language=en-US`
        );
        const result = await response.json();
        setMovie(result); // Set movie details in state
      } catch (error) {
        console.error("Fetch error:", error); // Log errors if the fetch fails
      }
    };

    fetchMovieDetails(); // Fetch movie details when component mounts or movieId changes
  }, [movieId]);

  // Show loader while movie data is being fetched
  if (!movie)
    return (
      <p>
        <Loader />
      </p>
    );

  return (
    <div className={styles.container}>
      {/* Button to navigate back to the home page */}
      <button className={styles.backButton} onClick={() => navigate("/")}>
        <FaHome /> Home
      </button>
      <div className={styles.detailsContainer}>
        {/* Display movie poster */}
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/original${movie.poster_path}` // Movie poster URL
              : "https://via.placeholder.com/200x300?text=No+Image" // Placeholder image
          }
          alt={movie.title || "No Title"} // Alt text for image
          className={styles.poster}
        />
        <div className={styles.details}>
          {/* Movie title */}
          <h1 className={styles.title}>{movie.title || "Untitled"}</h1>
          {/* Movie overview */}
          <p className={styles.overview}>
            <FaTag /> {movie.overview || "No Overview Available"}
          </p>
          {/* Movie release date */}
          <p className={styles.releaseDate}>
            <FaCalendarAlt /> Release Date: {movie.release_date || "N/A"}
          </p>
          {/* Movie rating */}
          <p className={styles.rating}>
            <FaStar /> Rating: {movie.vote_average || "N/A"}
          </p>
          {/* Movie budget */}
          <p className={styles.budget}>
            <FaDollarSign /> Budget: ${movie.budget.toLocaleString() || "N/A"}
          </p>
          {/* Movie revenue */}
          <p className={styles.revenue}>
            <FaDollarSign /> Revenue: ${movie.revenue.toLocaleString() || "N/A"}
          </p>
          {/* Movie official website link */}
          <p className={styles.homepage}>
            <FaLink />{" "}
            <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
              Official Website
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
