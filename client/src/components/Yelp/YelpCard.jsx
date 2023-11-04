import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

const YelpCard = ({ businesses, renderPieCharts }) => {
  const sortByDate = (a, b) => {
    const dateA = new Date(a.time_created);
    const dateB = new Date(b.time_created);
    return dateB - dateA;
  };
  


  
  const renderHighlightMap = (highlightMap) => {
    if (!highlightMap) {
      return null; // or some appropriate fallback UI
    }
  
    const items = Object.keys(highlightMap).map((key) => {
      if (key && key.length !== 0 && highlightMap[key] && Object.keys(highlightMap[key]).length !== 0) {
        return (
          <Box key={key} sx={{ width: "70%", margin: "0 auto", marginBottom: 2 }}>
            <Typography variant="h6" gutterBottom>
              Review:
            </Typography>
            <Typography>{key}</Typography>
            <Divider sx={{ marginY: 2 }} />
            <Typography variant="h6" gutterBottom>
              Analysis:
            </Typography>
            <Box
              sx={{
                maxHeight: "200px",
                overflowY: "auto",
                border: "1px solid #e0e0e0",
                borderRadius: "4px",
              }}
            >
              {Object.keys(highlightMap[key]).map((item) => (
                <Box
                  key={item}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 1,
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ width: "50%" }}>{item}</Typography>
                  <Typography variant="subtitle1" sx={{ width: "50%" }}>{highlightMap[key][item]}</Typography>
                </Box>
              ))}
            </Box>
            <Divider sx={{ marginY: 2 }} />
          </Box>
        );
      }
      return null;
    });
  
    if (items.length === 0) {
      return null;
    }
  
    return <Grid container spacing={2}>{items}</Grid>;
  };
  

  
  
  
  

  return (
    <CardContent sx={{ textAlign: "left", margin: [2, 2, 2, 2] }}>
      {businesses.map((business) => (
        <Card key={business.id} sx={{ margin: [2, 2, 2, 2] }}>
          
          <div className="container">
            <div className="left-column">
              <h1>{business.name}</h1>
              {business.analyzedReviews && 
              renderPieCharts(business.analyzedReviews)}
            </div>
            <div className="right-column">
              <CardMedia component="img" image={business.image_url} />
              <Typography variant="body2" color="text.secondary">
                <li>
                  <strong>Rating:</strong> {business.rating}
                </li>
                <li>
                  <strong>Price Range:</strong> 
                  {business.price}
                </li>
                <li>
                  <strong>Category:</strong> {business.categories[0].title}
                </li>
                <li>
                  <strong>Contact:</strong> {business.display_phone}
                </li>
                <li>
                  <strong>Location:</strong>{" "}
                  <a
                    href={`https://www.google.com/maps?q=${business.coordinates.latitude},${business.coordinates.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {business.location.display_address}
                  </a>{" "}
                </li>
              </Typography>
            </div>
          </div>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant="h5" align="center" margin="30px" gutterBottom>
            <b>Total Reviews: {business.reviews.length}</b>
          </Typography>
         
          <div>
            <Typography>
              
              {renderHighlightMap(business.highlights)}
            </Typography>
          </div>

          <hr />
        </Card>
      ))}
    </CardContent>
  );
};

export default YelpCard;
