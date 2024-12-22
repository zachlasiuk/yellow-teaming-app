FROM public.ecr.aws/lambda/python:3.8-arm64

# Install dependencies
RUN yum install -y libgomp

# Copy FAISS index and metadata
COPY RAG_embedding/faiss_index.bin /var/task/faiss_index.bin
COPY RAG_embedding/metadata.pkl    /var/task/metadata.pkl

# Install Python libraries
COPY lambda_logic/requirements.txt /var/task/requirements.txt
RUN pip install -r /var/task/requirements.txt

# Add your Lambda function code
COPY lambda_logic/app.py /var/task/app.py

CMD ["app.lambda_handler"]
