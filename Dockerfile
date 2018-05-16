FROM node:latest
WORKDIR /app
COPY . /app/
RUN npm i npm@latest -g
RUN npm install -g @angular/cli@latest --unsafe-perm
RUN npm install http-server -g --unsafe-perm
RUN npm install --unsafe-perm
RUN ng build
WORKDIR dist
RUN pwd
WORKDIR delegatedAdminApp
RUN pwd
ENTRYPOINT ["http-server", ".", "-p", "8081"]
EXPOSE 8081
