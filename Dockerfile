FROM node:latest
WORKDIR /app
COPY . /app/
RUN npm i npm@latest -g
RUN npm install -g @angular/cli@latest --unsafe-perm
RUN npm install http-server -g --unsafe-perm
RUN npm install --unsafe-perm
RUN ng build
<<<<<<< HEAD:DockerFile
WORKDIR dist
RUN pwd
WORKDIR delegatedAdminApp
RUN pwd
ENTRYPOINT ["http-server", ".", "-p", "8081"]
=======
RUN cd /app/dist/delegatedAdminApp
RUN nohup  http-server . -p 8081 > /dev/null 2>&1 &
>>>>>>> 39a72989801ebb1855ff94677b11c40b76d60d52:Dockerfile
EXPOSE 8081
