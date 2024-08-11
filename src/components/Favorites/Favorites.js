import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Favorites.module.css";
import Card from "../Card/Card";
import { FaBackward, FaGrinHearts, FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { IoHeartDislikeSharp } from "react-icons/io5";

/*The Favorites component displays a list of favorited movies, 
allowing users to remove movies from their favorites. 
It also includes a button to navigate back to the home page 
and displays a message if no favorite movies are present. */

const Favorites = () => {
  // State to hold the list of favorite movies
  const [favorites, setFavorites] = useState([]);
  // Hook to programmatically navigate between routes
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the favorites from localStorage on component mount
    const savedFavorites = localStorage.getItem("favorites");
    // Parse and set the favorites from localStorage or set to an empty array if not found
    setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
  }, []);

  // Function to handle the removal of a movie from favorites
  const handleToggleFavorite = (movie) => {
    // Filter out the movie to be removed from the current favorites list
    const updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
    // Update state with the new list of favorites
    setFavorites(updatedFavorites);
    // Update localStorage with the new list of favorites
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    // Show a toast notification to indicate the movie was removed from favorites
    toast(
      <div>
        <FaHeart style={{ color: "red" }} /> Removed from favorites
      </div>,
      {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      }
    );
  };

  return (
    <>
      {/* Heading for the favorites page */}
      <h2 className={styles.heading}>
        Your Favorite Movies <FaGrinHearts className={styles.icon} />
      </h2>
      {/* Button to navigate back to the home page */}
      <button className={styles.backButton} onClick={() => navigate("/")}>
        <FaBackward /> Go Back to Home
      </button>
      <div className={styles.container}>
        {favorites.length > 0 ? (
          // Render a Card component for each favorite movie
          favorites.map((movie) => (
            <Card
              key={movie.id}
              movie={movie}
              onToggleFavorite={handleToggleFavorite}
              isFavorited={true}
            />
          ))
        ) : (
          // Display a message if there are no favorite movies
          <p className={styles.noFavorites}>
            You have no favorite movies!!! <IoHeartDislikeSharp />
          </p>
        )}
      </div>
    </>
  );
};

export default Favorites;
