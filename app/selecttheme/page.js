"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Theme from "../components/theme/Theme";
import SelectedTheme from "../components/theme/SelectedTheme";
import Footer from "../components/Footers/Footer";

function SelectTheme() {
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchThemes = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/template/getTemplate/");
        setThemes(response.data); // Update state with fetched themes
		console.log(themes)
      } catch (error) {
        console.error("Error fetching themes:", error);
      }
    };

    fetchThemes(); // Call the fetchThemes function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once, like componentDidMount

  return (
    <div className="mt-24">
      <SelectedTheme />

      <div className="flex flex-col m-8 mb-24">
        <div className="flex flex-col justify-center items-center mb-4">
          <h2 className="font-bold">Popular free themes</h2>
          <p>made with core features you can easily customize -- no coding needed</p>
        </div>
        <div className="flex w-full h-full gap-6 flex-wrap justify-center">
          {themes.map((theme) => (
            <Theme key={theme.themeName} theme={theme} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SelectTheme;
