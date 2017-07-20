FROM dltdojo/node-express:6
# WORKDIR /usr/src/app
#  COPY package.json /usr/src/app/
# Bundle app source
COPY server /usr/src/app/
COPY package.json /usr/src/app/
# npm install --production will only install "dependencies"
RUN npm install --production
CMD [ "node", "server/index.js" ]