import React, { useState, useEffect } from "react";

const LanguageSwitcher = () => {
  // Step 1: Retrieve the default language from the cookie
  const initialLanguage =
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("NEXT_LOCALE="))
      ?.split("=")[1] || "en"; // Default to English if not found

  // Step 2: Set up state for selected language
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    console.log("new language", newLanguage);
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1); // Set cookie to expire in one year
    document.cookie = `NEXT_LOCALE=${newLanguage}; path=/; expires=${date.toUTCString()}`;
    window.location.reload();
  };

  return (
    <select
      value={selectedLanguage}
      onChange={handleLanguageChange}
      className="bg-blueGray-800 text-sm text-white font-bold mx-2 rounded-2xl focus:outline-none"
    >
      <option
        value="am"
        className="bg-blueGray-800 text-sm text-white font-bold"
      >
        Am
      </option>
      <option
        value="en"
        className="bg-blueGray-800 text-sm text-white font-bold"
      >
        En
      </option>
    </select>
  );
};

export default LanguageSwitcher;
