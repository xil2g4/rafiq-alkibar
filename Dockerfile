FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
COPY client/package*.json ./client/
RUN npm install
RUN cd client && npm install && npm run build
COPY . .
EXPOSE 3000 5000
CMD ["npm", "start"]