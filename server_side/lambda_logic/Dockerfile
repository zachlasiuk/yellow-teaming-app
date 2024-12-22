FROM public.ecr.aws/lambda/python:3.8-arm64

# Install required system packages
RUN yum install -y libgomp wget

# Install build tools and FAISS dependencies
RUN yum groupinstall -y "Development Tools" && \
    yum install -y \
        blas-devel \
        lapack-devel \
        python3-devel \
        python3-pip \
        python3-numpy \
        git

# Install precompiled CMake binary
RUN wget https://github.com/Kitware/CMake/releases/download/v3.27.5/cmake-3.27.5-linux-aarch64.sh && \
    chmod +x cmake-3.27.5-linux-aarch64.sh && \
    ./cmake-3.27.5-linux-aarch64.sh --skip-license --prefix=/usr/local && \
    rm cmake-3.27.5-linux-aarch64.sh

# Verify CMake installation
RUN cmake --version

# Clone and build FAISS (disable GPU support)
RUN git clone https://github.com/facebookresearch/faiss.git && \
    cd faiss && \
    mkdir build && \
    cmake -B build -DFAISS_ENABLE_PYTHON=ON -DFAISS_ENABLE_GPU=OFF \
          -DPython_EXECUTABLE=/usr/bin/python3 \
          -DPython_INCLUDE_DIR=/usr/include/python3.8 \
          -DPython_LIBRARY=/usr/lib64/libpython3.8.so \
          -DPython_NumPy_INCLUDE_DIR=/usr/lib64/python3.8/site-packages/numpy/core/include . && \
    cmake --build build && \
    cd build && \
    pip3 install .

# Clean up to reduce image size
RUN yum clean all && rm -rf /var/cache/yum && \
    rm -rf /faiss

# Copy FAISS index and metadata to Lambda task directory
COPY RAG_embedding/faiss_index.bin /var/task/faiss_index.bin
COPY RAG_embedding/metadata.pkl /var/task/metadata.pkl

# Install Python dependencies
COPY lambda_logic/requirements.txt /var/task/requirements.txt
RUN pip3 install -r /var/task/requirements.txt

# Add your Lambda function code
COPY lambda_logic/app.py /var/task/app.py

# Set the Lambda handler
CMD ["app.lambda_handler"]
