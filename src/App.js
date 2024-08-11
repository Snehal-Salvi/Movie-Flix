import React from "react";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Favorites from "./components/Favorites/Favorites";
import MovieDetails from "./components/Movie/MovieDetails";
import styles from "./App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Header /> {/* Renders the header component */}
        <Routes>
          {/* Routes for Home, Favorites, and MovieDetails pages */}
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:movieId" element={<MovieDetails />} />
        </Routes>
        <ToastContainer /> {/* Container for toast notifications */}
      </div>
    </Router>
  );
}

export default App;
