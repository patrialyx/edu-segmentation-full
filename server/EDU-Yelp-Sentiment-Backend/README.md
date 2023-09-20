
## Yelp API Wrapper Microservice

This is a simple Node.js application that serves as a wrapper for the Yelp API. It allows you to fetch business information, reviews, and categories from Yelp using the provided endpoints

## Prerequisites

First, create an API key in Yelp Fusion. Go to https://fusion.yelp.com/. Click on 'Manage API Access'.

Create a .env file in the root of your project and add your API key like this:
`YELP_API_KEY=your_yelp_api_key_here`

## Usage
1. Rename the .env.example file to .env and replace YOUR_YELP_API_KEY with your actual Yelp API key.
2. Start the Express server:`node yelp_server.js`

## Endpoints
<li> GET /api/yelp-business/:location/:term
- Fetch businesses by location and term.

<li> GET /api/yelp-reviews/:id
- Fetch reviews for a specific business by its ID.

## Error Handling
If there's an error fetching data from the Yelp API, the server will respond with a JSON object containing an error message.
