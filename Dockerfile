# Dockerfile optimisé pour Dokploy - Application BabylonJS
# Version simplifiée pour les environnements avec serveur web intégré

# Utilisation de l'image officielle nginx:alpine (légère et optimisée)
FROM nginx:alpine

# Auteur
LABEL maintainer="thierryduchassin"

# Copie des fichiers de l'application
# Dokploy gère la configuration nginx, nous fournissons juste les fichiers statiques
COPY . /usr/share/nginx/html

# Exposition du port 80 (standard pour les applications web)
EXPOSE 80

# Commande par défaut pour démarrer nginx
# Dokploy peut override cette commande si nécessaire
CMD ["nginx", "-g", "daemon off;"]