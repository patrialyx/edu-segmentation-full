import React, { useEffect, useState } from "react";

const Loading = () => {
  const [slices, setSlices] = useState([]);
  const pizzaSlices = ["🍕", "🍕", "🍕", "🍕", "🍕", "🍕"];
  const delay = 1000; // Adjust the delay timing as needed

  useEffect(() => {
    const interval = setInterval(() => {
      setSlices((prevSlices) => {
        if (prevSlices.length === pizzaSlices.length) {
          return [];
        } else {
          const newSlices = [...prevSlices, pizzaSlices[prevSlices.length]];
          return newSlices;
        }
      });
    }, delay);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [delay, pizzaSlices.length]);

  return (
    <div>
      <div
        style={{ fontSize: "50px", marginTop: "100px", textAlign: "center" }}
      >
        {slices.map((slice, index) => (
          <span key={index}>{slice}</span>
        ))}
      </div>
      <div style={{ fontSize: "25px" }}>
        Analyzing food reviews from Yelp...
      </div>
    </div>
  );
};

export default Loading;
