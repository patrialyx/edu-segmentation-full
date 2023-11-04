import React, { useState, useEffect } from "react";
import "../App.css";
import Box from "@mui/material/Box";
import Loading from "./Loading";
import { searchBusinesses } from "../api/YelpApiService";
import { analyzeBusiness } from "./Yelp/AnalyzeBusiness";
import { renderPieCharts } from "./Yelp/PieChart";
import SearchBar from "./Yelp/SearchBar";
import YelpCard from "./Yelp/YelpCard";

const Yelp = () => {
  const [businesses, setBusinesses] = useState([]);
  const [load, setIsload] = useState(false);
  const [search, setIsSearch] = useState(false);
  const [chartComponents, setChartComponents] = useState([]);
  const [businessName, setBusinessName] = useState("");
  const location = "Singapore";

  let alertText;

  useEffect(() => {
    chartComponents.forEach((chart) => chart.destroy());
    setChartComponents([]);
    console.log('businesseses', businesses)
  }, [businesses]);

  const searchBusiness = async () => {
    setIsload(true);
    setIsSearch(true);
    try {
      setBusinesses([]);
      const mergedBusinesses = await searchBusinesses(location, businessName);
      const analyzedBusinessesPromises = await Promise.all(
        mergedBusinesses.slice(0,1).map(async (business) => {
          return await analyzeBusiness(business); // Use the new analyzeBusiness function
        })
      );
      setBusinesses(analyzedBusinessesPromises);
      setIsload(false);
      console.log("final business:", businesses);
      setBusinessName("");
    } catch (error) {
      console.error("Error searching for business:", error);
      setIsload(false);
    }
  };

  if (search == true && load == false && businesses.length <= 0) {
    const copyBizName = businessName;
    if (copyBizName == businessName) {
      alertText = (
        <p style={{ textAlign: "center" }}>
          No search results for "{businessName}" found.
        </p>
      );
    } else {
      setIsSearch(false);
    }
  }

  return (
    <div className="App">
      <div>
        <div>
          <h1 style={{ textAlign: "center" }}>Yelp Restaurant Search</h1>
          <p> <strong>Model:</strong> Segbot BART | <strong>Granularity:</strong> Default | <strong>Device:</strong> CPU</p>
          <SearchBar
            businessName={businessName}
            setBusinessName={setBusinessName}
            searchBusiness={searchBusiness}
          />
          {load ? <Loading /> : null}
          <Box sx={{ margin: [2, 2, 2, 2] }}>
            <div sx={{ margin: [2, 2, 2, 2] }}>
              <YelpCard
                businesses={businesses}
                renderPieCharts={renderPieCharts}
              />
            </div>
          </Box>
        </div>
      </div>
      {alertText}
    </div>
  );
};

export default Yelp;
