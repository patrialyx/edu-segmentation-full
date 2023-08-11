from fastapi import FastAPI, Body
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import server_util as server_util
from viz.han_reg_viz_data import store_attention_scores_from_input

app = FastAPI()

# Allow CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class InputData(BaseModel):
    text: str
    granularity: str
    model: str
    device: str
    conjunctions: str
    segs: list


class AnalysisResult(BaseModel):
    text: str
    granularity: str
    model: str
    device: str
    conjunctions: str
    query: str

@app.get("/")
def home():
    return {"health_check": "ok"}

@app.post("/api/edu-sentiment-analysis-service", response_model=AnalysisResult)
def edu_sentiment_analysis(input_data: InputData = Body(...)):
    parsed_query_json = server_util.parse_input(input_data)
    raw_analysis_result = store_attention_scores_from_input(parsed_query_json)
    analysis_result = server_util.convert_to_json(data=raw_analysis_result)
    return {"text": input_data.text, 
            "granularity": input_data.granularity, 
            "model": input_data.model,
            "device": input_data.device,
            "conjunctions": input_data.conjunctions,
            "query": analysis_result}

# uvicorn main:app --host localhost --port 5002
if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=5002)
