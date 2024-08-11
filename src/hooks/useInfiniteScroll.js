import { useState, useEffect } from "react";

/*The useInfiniteScroll hook enables infinite scrolling functionality by 
fetching additional data when the user scrolls to the bottom of the page. 
It manages the loading state and listens for scroll events to trigger data fetching. */

// Custom hook to handle infinite scrolling
const useInfiniteScroll = (fetchData, hasMore) => {
  const [loading, setLoading] = useState(false); // State to manage loading status

  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      // Check if the user has scrolled to the bottom of the page
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        // If there is more data to fetch and not currently loading, trigger data fetch
        if (hasMore && !loading) {
          setLoading(true); // Set loading state to true
          fetchData(); // Call the fetchData function passed as an argument
        }
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the scroll event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchData, hasMore, loading]); // Dependencies array to re-run the effect when fetchData, hasMore, or loading changes

  return [loading, setLoading]; // Return the loading state and setter function
};

export default useInfiniteScroll;
