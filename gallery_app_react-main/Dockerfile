# Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

# Need devDependencies (tailwind/postcss) for the CRA production build
RUN npm install --legacy-peer-deps

COPY . .

# Baked into the JS bundle at build time (CRA)
ARG REACT_APP_API_BASE_URL=http://localhost:8080
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
