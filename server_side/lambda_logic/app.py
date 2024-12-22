import json
from openai import OpenAI
import faiss
import pickle
import os
import numpy as np


# Load FAISS index and metadata
FAISS_INDEX_PATH = "/var/faiss_index.bin"
METADATA_PATH = "/var/metadata.pkl"
index = faiss.read_index(FAISS_INDEX_PATH)
with open(METADATA_PATH, "rb") as f:
    metadata = pickle.load(f)


# Set OpenAI API Key
openai_api_key = os.getenv("OPENAI_API_KEY")    # Set by container environment
openai_client = OpenAI(api_key=openai_api_key)



def perform_rag_search(query):
    # Return json of results

    # Embedd the query using same method as we embedded database
    query_embedding = openai_client.embeddings.create(
        input=query,
        model="text-embedding-ada-002"
    ).data[0].embedding

    # Search FAISS index
    distances, indices = index.search(np.array([query_embedding]), k=5)

    # Retrieve top results with metadata
    results = [{"text": metadata[i]['text'], "source": metadata[i]['source'], "distance": d}
               for i, d in zip(indices[0], distances[0])]

    return {"results": results}


def perform_llm_query(prompt, conversation_history=None):
    messages = [{"role": "system", "content": prompt}]
    if conversation_history:
        messages.extend(conversation_history)


    completion = openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages
    )

    return completion.choices[0].message.content


def lambda_handler(event, context):
    try:
        body = json.loads(event["body"]) if "body" in event else event
        action = body.get("action")
        
        if action == "RAG":
            query = body["query"]
            result = perform_rag_search(query)
        elif action == "LLM":
            prompt = body["prompt"]
            conversation_history = body.get("conversation_history", [])
            result = perform_llm_query(prompt, conversation_history)
        else:
            raise ValueError("Invalid action. Use 'RAG' or 'LLM'.")
        
        return {
            "statusCode": 200,
            "body": json.dumps(result)
        }
    except Exception as e:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": str(e)})
        }
