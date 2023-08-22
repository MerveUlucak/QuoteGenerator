import { useState, useEffect } from "react";

const getRandom = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const removeTypeFit = (author) => {
  if (author === undefined || author === null || author === "type.fit")
    return "Unknown";
  return author.replace(", type.fit", "").trim();
};

export default function QuoteGenerator() {
  const [quotes, setQuotes] = useState([]);
  const [show, setShow] = useState(null);
  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        setQuotes(data);
        setShow(getRandom(data));
      });
  }, []);
  return (
    <div className="quote">
      <button onClick={() => setShow(getRandom(quotes))}>New Quote</button>
      <p className="text">{show?.text}</p>
      <p className="author">{removeTypeFit(show?.author)}</p>
    </div>
  );
}
