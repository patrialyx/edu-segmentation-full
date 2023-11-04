
import React from "react";

export function parseResponseData(responseData) {
  const queryData = responseData.query && JSON.parse(responseData.query)[0];

  if (queryData) {
    const moreData = { ...responseData, ...queryData };
    const processedData = processQueryData(moreData);

    return processedData;
  } else {
    return null;
  }
}

function processQueryData(obj) {
  try {
    const processedlabels = obj.labels.reduce((asp, label) => {
      const [key, value] = label.split(":");
      asp[key] = value;
      return asp;
    }, {});

    return {
      raw_text: obj.text,
      text: obj.text.join(" "),
      word_score: obj.word_score,
      edu_score: obj.edu_score,
      labels: processedlabels,
      sem_true: obj.sem_true,
      asp_true: obj.asp_true,
      granularity: obj.granularity,
      model: obj.model,
      device: obj.device,
      conjunctions: obj.conjunctions,
    };
  } catch (e) {
    console.error("error", e);
  }
}

const DataParsing = () => {
  return <div></div>;
};

export default DataParsing;
