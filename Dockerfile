# Étape 1 : Build
FROM node:18 AS builder

WORKDIR /app

# Copier uniquement les fichiers essentiels pour l’installation
COPY package*.json ./
RUN npm ci

# Copier le reste des fichiers du projet
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape 2 : Exécution
FROM node:18-alpine

WORKDIR /app

# Copier uniquement les fichiers nécessaires depuis l'étape 1
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.output ./.output

# Exposer le port
EXPOSE 3000

# Lancer Nuxt en mode production
CMD ["npm", "run", "start"]
