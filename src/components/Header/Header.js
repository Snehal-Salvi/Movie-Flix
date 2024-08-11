import React from "react";
import styles from "./Header.module.css";
import { BiCameraMovie } from "react-icons/bi";

/*The Header component displays a header section with a title and an icon. 
It is designed to serve as the top navigation or branding element of the application. */

export default function Header() {
  return (
    <div className={styles.headerSection}>
      {/* Container for the header content */}
      <div className={styles.headerImage}>
        {/* Main heading of the header */}
        <h1 className={styles.heading}>
          {/* Movie icon from react-icons */}
          <BiCameraMovie className={styles.movieIcon} /> Movie Flix
        </h1>
      </div>
    </div>
  );
}
