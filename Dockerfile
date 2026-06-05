# Dockerfile optimisé pour Dokploy - Application BabylonJS
# Version simplifiée pour les environnements avec serveur web intégré

# Utilisation de l'image officielle nginx:alpine (légère et optimisée)
FROM nginx:alpine

# Auteur
LABEL maintainer="thierryduchassin"

# Configuration nginx explicite pour l'application statique
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie des fichiers statiques de l'application
COPY index.html favicon.ico windowStudio.hdr /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/
COPY css/ /usr/share/nginx/html/css/
COPY img/ /usr/share/nginx/html/img/
COPY js/ /usr/share/nginx/html/js/
COPY lib/ /usr/share/nginx/html/lib/

# Le build doit échouer si le contexte Docker ne contient pas les fichiers du site.
RUN test -f /usr/share/nginx/html/index.html

# Exposition du port 80 (standard pour les applications web)
EXPOSE 80

# Commande par défaut pour démarrer nginx
# Dokploy peut override cette commande si nécessaire
CMD ["nginx", "-g", "daemon off;"]
