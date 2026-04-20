# docker/Dockerfile
FROM node:22-alpine3.20


# Directorio de trabajo
WORKDIR /app

# Instalamos dependencias
COPY package*.json ./
COPY prisma ./prisma

RUN npm install

# Copiamos el resto del código y compilamos
COPY . .
RUN npm run build

# Exponemos el puerto de la app
EXPOSE 4000

# Comando por defecto
CMD ["npm", "run", "start:prod"]
