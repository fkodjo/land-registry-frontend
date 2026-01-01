# --- ÉTAPE 1 : BUILD (On utilise Node pour compiler) ---
FROM node:18-alpine as build

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation
RUN npm install

# Copie du code source
COPY . .

# Construction de l'app (Crée le dossier /dist)
RUN npm run build

# --- ÉTAPE 2 : PRODUCTION (On utilise Nginx pour servir) ---
FROM nginx:alpine

# Copier les fichiers compilés de l'étape 1 vers le dossier Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copier notre configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80 (standard Web)
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]