import pickle
from openai import OpenAI
import faiss
import numpy as np


# Load index and metadata
def load_index(index_path, metadata_path):
    index = faiss.read_index(index_path)
    with open(metadata_path, 'rb') as f:
        chunks = pickle.load(f)
    return index, chunks


# Generate query embedding and search FAISS index
def query_index(index, chunks, query, openai_api_key):
    # Generate query embedding
    client = OpenAI(api_key=openai_api_key)


    query_embedding = client.embeddings.create(
        input=query,
        model="text-embedding-ada-002"
    ).data[0].embedding

    # Search FAISS index
    distances, indices = index.search(np.array([query_embedding]), k=5)

    # Retrieve top results with metadata
    results = [{"text": chunks[i]['text'], "source": chunks[i]['source'], "distance": d}
               for i, d in zip(indices[0], distances[0])]
    return results





# Define local paths for FAISS index and metadata
index_path = "./faiss_index.bin"
metadata_path = "./metadata.pkl"

# Define the PDF files
pdf_files = ["EU_AI_ACT.pdf", "AI_RMF_Playbook.pdf"]

# OpenAI API Key
openai_key=''

# Load the saved vector database (for testing purposes)
index, chunks = load_index(index_path, metadata_path)

# Example Query
query = "What is a high-risk AI system?"

# Run the query
results = query_index(index, chunks, query, openai_key)

# Display results
for result in results:
    print(f"Source: {result['source']}\nText: {result['text']}\nDistance: {result['distance']}\n")
