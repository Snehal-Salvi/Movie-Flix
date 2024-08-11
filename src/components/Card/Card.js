import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import { FaHeart } from "react-icons/fa";
import Loader from "../Loader/Loader";

/* The Card component displays movie details with a poster, title, and release year, 
and includes a heart icon for favoriting. 
It also handles a loading state by showing a Loader component while data is being fetched.*/

const Card = ({ movie, onToggleFavorite, isFavorited, loading }) => {
  return (
    <div className={`${styles.card} ${loading ? styles.loading : ""}`}>
      {loading ? (
        // Show loader while data is loading
        <Loader />
      ) : (
        <>
          <Link to={`/movie/${movie.id}`} className={styles.link}>
            <img
              // Display movie poster or placeholder image if poster_path is unavailable
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={movie.title || "No Title"}
              className={styles.poster}
            />
          </Link>
          <FaHeart
            // Toggle favorite status with heart icon
            className={`${styles.heartIcon} ${
              isFavorited ? styles.favorited : ""
            }`}
            onClick={() => onToggleFavorite(movie)}
          />
          <h3 className={styles.title}>{movie.title || "Untitled"}</h3>
          <p className={styles.releaseYear}>
            {/* Display release year or "N/A" if not available */}
            {movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : "N/A"}
          </p>
        </>
      )}
    </div>
  );
};

export default Card;
