FROM node:10
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . . 
EXPOSE 3000
RUN npm install -g nodemon

# Enable Wait for
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

## Launch the wait tool and then your application
CMD /wait && nodemon app.js
# CMD [ "nodemon", "app.js" ]
