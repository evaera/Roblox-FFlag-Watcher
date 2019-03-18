FROM node:11.7
RUN groupadd -g 999 appuser && useradd --create-home -r -u 999 -g appuser appuser
RUN apt-get update && apt-get install python g++ make
WORKDIR /home/appuser/app
RUN chown appuser:appuser -R .
EXPOSE 8080
USER appuser
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY server ./server
RUN yarn server:build
RUN yarn build
CMD [ 'yarn' 'server:start' ]
