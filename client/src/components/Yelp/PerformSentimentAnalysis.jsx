import apiService from "../../api/EDUApiService";
import { parseResponseData } from "../../util/DataParsing";
export const analyzeSentiment = async (name, inputText) => {
  try {
    if (inputText) {
      const response = await apiService.postReview(inputText, "default", "bart", "cpu", "and, however, but");
      const responseData = JSON.parse(response);
      const parsedData = parseResponseData(responseData);
      return parsedData;
    }
  } catch (error) {
    console.error("ERROR: analyzeSentiment:", name, error);
    return {};
  }
};


export const getHighlight = async (name, reviews, myMap) => {
  try {
    await Promise.all(
      reviews.map(async (review) => {
        if (review) {
          const aspectAnalyzedReview = await analyzeSentiment(
            name,
            review.text
          );
          const labels = aspectAnalyzedReview.labels;
        
        }
      })
    );
    return myMap;
  } catch (error) {
    console.error("ERROR: performSentimentAnalysis:", name, error);
  }
};

export const performSentimentAnalysis = async (name, reviews, myMap, highlightMap) => {
  try {
    await Promise.all(
      reviews.map(async (review) => {
        if (review) {
          const aspectAnalyzedReview = await analyzeSentiment(
            name,
            review.text
          );
          const labels = aspectAnalyzedReview.labels;
          highlightMap[review.text] = labels;
          for (const label in labels) {
            const sentiment = labels[label];
            if (!myMap[label]) {
              myMap[label] = {
                positive: 0,
                negative: 0,
                neutral: 0,
                total: 0,
              };
            }
            myMap[label][sentiment]++;
            myMap[label]["total"]++;
          }
        }
      })
    );
    console.log("labels notation", myMap)
    return [myMap, highlightMap];
  } catch (error) {
    console.error("ERROR: performSentimentAnalysis:", name, error);
  }
};
