FROM node:22-alpine AS BUILD
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine 
COPY --from=BUILD /app/dist /usr/share/nginx/html/
COPY /nginx.conf /etc/nginx/conf.d/default.conf