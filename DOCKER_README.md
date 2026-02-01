# Docker Deployment for BabylonJS Application

## Description

Ce Dockerfile permet de déployer l'application BabylonJS sur un serveur VPS en utilisant nginx comme serveur web.

## Prérequis

- Docker installé sur votre VPS
- Port 80 disponible (ou un autre port que vous souhaitez exposer)

## Construction de l'image Docker

```bash
# Se placer dans le répertoire du projet
docker build -t babylon-app .
```

## Exécution du conteneur

### Option 1: Exécution simple (port 80)
```bash
docker run -d -p 80:80 --name babylon-app babylon-app
```

### Option 2: Exécution avec un autre port (par exemple 8080)
```bash
docker run -d -p 8080:80 --name babylon-app babylon-app
```

### Option 3: Exécution avec un volume pour les logs
```bash
docker run -d -p 80:80 -v /var/log/nginx:/var/log/nginx --name babylon-app babylon-app
```

## Accès à l'application

Une fois le conteneur démarré, vous pouvez accéder à l'application via :
- `http://localhost` (si vous êtes sur la machine hôte)
- `http://votre-ip-vps` (si vous êtes sur un autre appareil)

## Commandes utiles

### Voir les logs
```bash
docker logs babylon-app
```

### Arrêter le conteneur
```bash
docker stop babylon-app
```

### Redémarrer le conteneur
```bash
docker restart babylon-app
```

### Supprimer le conteneur
```bash
docker rm babylon-app
```

### Mettre à jour l'application
```bash
# Arrêter et supprimer l'ancien conteneur
docker stop babylon-app
docker rm babylon-app

# Reconstruire l'image
docker build -t babylon-app .

# Redémarrer le conteneur
docker run -d -p 80:80 --name babylon-app babylon-app
```

## Configuration avancée

### Utilisation avec un reverse proxy (Nginx, Apache, Traefik)

Si vous utilisez déjà un reverse proxy sur votre VPS, vous pouvez :

1. Exposer un port différent (par exemple 8080)
2. Configurer votre reverse proxy pour rediriger vers ce port

Exemple de configuration Nginx pour le reverse proxy :

```nginx
server {
    listen 80;
    server_name votre-domaine.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Utilisation avec HTTPS (Let's Encrypt)

Pour ajouter HTTPS, vous pouvez utiliser certbot avec votre reverse proxy ou configurer un conteneur séparé pour le SSL termination.

## Structure des fichiers

- `Dockerfile` : Configuration Docker principale
- `nginx.conf` : Configuration du serveur web nginx
- `.dockerignore` : Fichiers à exclure lors de la construction de l'image

## Notes

- L'application utilise des CDN pour certaines dépendances (Babylon.js, Hammer.js, PEP.js)
- Assurez-vous que votre VPS a accès à Internet pour que ces CDN fonctionnent
- Si vous souhaitez tout héberger localement, vous devrez télécharger ces dépendances et les placer dans le répertoire `lib/`