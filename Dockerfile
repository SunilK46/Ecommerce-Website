FROM node:24 AS build
WORKDIR /app    
COPY package*.json ./
RUN npm insall
COPY . .
RUN npm run build
FROM node:24
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 80
CMD ["serve","-s","dist","-l","80"]
