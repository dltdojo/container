FROM ubuntu:trusty
RUN apt-get update
RUN apt-get install -y software-properties-common curl
RUN add-apt-repository ppa:chris-lea/libsodium
RUN apt-get update && apt-get install -y build-essential libsodium-dev libleveldb-dev pkg-config
RUN curl https://sh.rustup.rs -sSf | sh -s -- --default-toolchain stable -y

RUN apt-get install -y git
ENV PATH /root/.cargo/bin:$PATH
RUN git clone https://github.com/exonum/exonum.git
RUN cd exonum && cargo test --manifest-path exonum/Cargo.toml