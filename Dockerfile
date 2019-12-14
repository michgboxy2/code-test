FROM node:10.15.1

WORKDIR /usr/src/code-test

COPY ./ ./

RUN npm install -g mocha

RUN npm install

CMD ["/bin/bash"]