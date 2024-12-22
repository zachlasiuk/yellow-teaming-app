import fitz
import faiss
import pickle
from openai import OpenAI
import numpy as np
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Extract text from PDF
def extract_text_from_pdf(pdf_path):
    document = fitz.open(pdf_path)
    text = ""
    for page in document:
        text += page.get_text()
    return text

# Split text into chunks with metadata
def split_text_into_chunks_with_metadata(text, source_name, chunk_size=3000, chunk_overlap=200):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
    )
    chunks = splitter.split_text(text)
    return [{"text": chunk, "source": source_name} for chunk in chunks]

# Generate embeddings using OpenAI
def generate_embeddings_openai(chunks, openai_api_key):
    client = OpenAI(api_key=openai_api_key)
    
    embeddings = []
    for chunk in chunks:
        response = client.embeddings.create(
            input=chunk['text'],
            model="text-embedding-ada-002"
        )
        embeddings.append(response.data[0].embedding)


    return embeddings



# Save index and metadata
def save_index(index, chunks, index_path, metadata_path):
    faiss.write_index(index, index_path)
    with open(metadata_path, 'wb') as f:
        pickle.dump(chunks, f)


# Process PDFs and build vector database
def process_pdfs(pdf_files, openai_api_key, index_path, metadata_path):
    all_chunks = []
    all_embeddings = []

    for pdf_file in pdf_files:
        # Extract and chunk text
        source_name = pdf_file.split("/")[-1]  # Use file name as source
        print('using '+source_name)
        text = extract_text_from_pdf(pdf_file)
        chunks = split_text_into_chunks_with_metadata(text, source_name)

        # Generate embeddings
        embeddings = generate_embeddings_openai(chunks, openai_api_key)

        # Combine chunks and embeddings
        all_chunks.extend(chunks)
        all_embeddings.extend(embeddings)


    print('embeddings created. creating FAISS')

    # Create FAISS index
    dimension = len(all_embeddings[0])
    index = faiss.IndexFlatL2(dimension)
    index.add(np.array(all_embeddings))

    # Save locally
    print('saving locally')
    save_index(index, all_chunks, index_path, metadata_path)
    print(f"FAISS index and metadata saved locally:\n  Index Path: {index_path}\n  Metadata Path: {metadata_path}")

    return index, all_chunks

# Process PDFs and build vector database
'''
def process_pdfs(pdf_files, openai_api_key, s3_bucket, faiss_key, metadata_key):
    all_chunks = []
    all_embeddings = []

    for pdf_file, source_name in pdf_files:
        # Extract and chunk text
        text = extract_text_from_pdf(pdf_file)
        chunks = split_text_into_chunks_with_metadata(text, source_name)

        # Generate embeddings
        embeddings = generate_embeddings_openai(chunks, openai_api_key)

        # Combine chunks and embeddings
        all_chunks.extend(chunks)
        all_embeddings.extend(embeddings)

    # Create FAISS index
    dimension = len(all_embeddings[0])
    index = faiss.IndexFlatL2(dimension)
    index.add(np.array(all_embeddings))

    # Save to S3
    save_to_s3(index, all_chunks, s3_bucket, faiss_key, metadata_key)
    return index, all_chunks
'''


# process_pdfs(pdf_files, openai_api_key, s3_bucket, faiss_key, metadata_key):
pdfs = ["EU_AI_ACT.pdf","AI_RMF_Playbook.pdf"]
openai_key=''
process_pdfs(pdfs, openai_key, './faiss_index.bin', './metadata.pkl')