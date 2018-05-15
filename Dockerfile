FROM node:latest
WORKDIR /app
COPY . /app/
RUN cd /app
RUN ls
RUN npm i npm@latest -g
RUN npm install -g @angular/cli@latest --unsafe-perm
RUN npm install http-server -g --unsafe-perm
RUN npm install --unsafe-perm
RUN ng build
RUN cd /app/dist/delegatedAdminApp
RUN nohup  http-server . -p 8081 > /dev/null 2>&1 &
EXPOSE 8081
