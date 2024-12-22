FROM public.ecr.aws/lambda/python:3.8-arm64

# Install dependencies
RUN yum install -y libgomp wget
RUN yum groupinstall -y "Development Tools" && \
    yum install -y \
        #cmake \
        blas-devel \
        lapack-devel \
        python3-devel \
        git


# Install newer precompiled CMake binary for FAISS
RUN wget https://github.com/Kitware/CMake/releases/download/v3.27.5/cmake-3.27.5-linux-aarch64.sh && \
chmod +x cmake-3.27.5-linux-aarch64.sh && \
./cmake-3.27.5-linux-aarch64.sh --skip-license --prefix=/usr/local && \
rm cmake-3.27.5-linux-aarch64.sh

# Verify CMake installation
RUN cmake --version

# Clone and build FAISS
RUN git clone https://github.com/facebookresearch/faiss.git && \
    cd faiss && \
    mkdir build && \
    cmake -B build -DFAISS_ENABLE_PYTHON=ON -DFAISS_ENABLE_GPU=OFF . && \
    cmake --build build && \
    cd build && \
    pip install .


# Clean up to reduce image size
RUN yum clean all && rm -rf /var/cache/yum && \
rm -rf /faiss

# Copy FAISS index and metadata
COPY RAG_embedding/faiss_index.bin /var/task/faiss_index.bin
COPY RAG_embedding/metadata.pkl    /var/task/metadata.pkl

# Install Python libraries
COPY lambda_logic/requirements.txt /var/task/requirements.txt
RUN pip install -r /var/task/requirements.txt

# Add your Lambda function code
COPY lambda_logic/app.py /var/task/app.py

CMD ["app.lambda_handler"]
