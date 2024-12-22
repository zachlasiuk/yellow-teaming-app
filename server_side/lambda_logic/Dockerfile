FROM public.ecr.aws/lambda/python:3.8-arm64

# Install required system packages
RUN yum install -y libgomp wget which

# Install build tools and FAISS dependencies
RUN yum groupinstall -y "Development Tools" && \
    yum install -y \
        blas-devel \
        lapack-devel \
        python3-devel \
        python3-pip \
        swig \
        git \
        pcre2 pcre2-devel

# Install precompiled CMake binary
RUN wget https://github.com/Kitware/CMake/releases/download/v3.27.5/cmake-3.27.5-linux-aarch64.sh && \
    chmod +x cmake-3.27.5-linux-aarch64.sh && \
    ./cmake-3.27.5-linux-aarch64.sh --skip-license --prefix=/usr/local && \
    rm cmake-3.27.5-linux-aarch64.sh

# Verify CMake installation
RUN cmake --version

# Install SWIG 4.x (fix for PCRE2 issue)
RUN wget https://github.com/swig/swig/archive/refs/tags/v4.1.1.tar.gz && \
    tar -xzf v4.1.1.tar.gz && \
    cd swig-4.1.1 && \
    ./autogen.sh && ./configure && make && make install && \
    cd .. && rm -rf swig-4.1.1 v4.1.1.tar.gz

# Verify SWIG installation
RUN swig -version

# Install NumPy via pip (required by FAISS)
RUN pip3 install numpy

# Clone and build FAISS (disable GPU, tests, perf_tests, and ensure BUILD_TESTING is OFF)
RUN git clone https://github.com/facebookresearch/faiss.git && \
    cd faiss && \
    mkdir build && \
    cmake -B build -DFAISS_ENABLE_PYTHON=ON \
                  -DFAISS_ENABLE_GPU=OFF \
                  -DFAISS_ENABLE_TESTS=OFF \
                  -DFAISS_BUILD_BENCHMARK=OFF \
                  -DFAISS_BUILD_PERF_TESTS=OFF \
                  -DBUILD_TESTING=OFF \
                  -DPython3_EXECUTABLE=$(which python3) \
                  -DPython3_INCLUDE_DIR=$(python3 -c "from sysconfig import get_paths; print(get_paths()['include'])") \
                  -DPython3_LIBRARY=$(python3 -c "from sysconfig import get_config_var; print(get_config_var('LIBDIR'))") \
                  -DPython3_NumPy_INCLUDE_DIR=$(python3 -c "import numpy; print(numpy.get_include())") . && \
    cmake --build build && \
    mkdir -p /var/lang/lib/python3.8/site-packages/faiss && \
    cp build/faiss/python/_swigfaiss.so /var/lang/lib/python3.8/site-packages/faiss/ && \
    cp build/faiss/python/swigfaiss.py /var/lang/lib/python3.8/site-packages/faiss/

# Clean up to reduce image size
RUN yum clean all && \
    rm -rf /var/cache/yum && \
    rm -rf /faiss && \
    rm -rf /swig-4.1.1 && \
    rm -rf /usr/local/share/cmake-3.27 && \
    find /var/tmp -type f -delete && \
    find /tmp -type f -delete

# Copy FAISS index and metadata to Lambda task directory
COPY RAG_embedding/faiss_index.bin /var/task/faiss_index.bin
COPY RAG_embedding/metadata.pkl /var/task/metadata.pkl

# Install Python dependencies
COPY lambda_logic/requirements.txt /var/task/requirements.txt
RUN pip3 install -r /var/task/requirements.txt
# RUN pip3 install --no-cache-dir -r /var/task/requirements.txt # Try this to optimize when brave

# Add your Lambda function code
COPY lambda_logic/app.py /var/task/app.py

# Set the Lambda handler
CMD ["app.lambda_handler"]
