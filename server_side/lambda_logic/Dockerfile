FROM public.ecr.aws/lambda/python:3.8-arm64

# Install dependencies
RUN yum install -y libgomp

# Copy FAISS index and metadata
COPY ../RAG_embedding/faiss_index.bin /var/faiss_index.bin
COPY ../RAG_embedding/metadata.pkl    /var/metadata.pkl

# Install Python libraries
COPY requirements.txt .
RUN pip install -r requirements.txt

# Add your Lambda function code
COPY app.py /var/app.py

CMD ["app.lambda_handler"]
