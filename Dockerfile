# Utiliser l'image officielle de Node.js 20.16.0 comme base
FROM node:20.16.0

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Construire l'application pour la production
RUN npm run build

# Exposer le port que l'application utilise
EXPOSE 3001

# Définir la commande pour démarrer l'application
CMD ["npm", "start"]
