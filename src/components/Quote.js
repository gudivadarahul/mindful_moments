import React, { useState, useEffect } from "react";

const Quote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const fetchQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      const wordCount = data.content.split(" ").length;
      if (wordCount <= 18) { // Limit quotes to 20 words
        setQuote(data.content);
        setAuthor(data.author);
      } else {
        fetchQuote(); // Fetch another quote if word count exceeds 20
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="quote-container">
      <p className="quote-text">"{quote}" - {author}</p>
      <span onClick={fetchQuote} className="refresh-arrow">&#x21bb;</span>
    </div>
  );
};

export default Quote;
