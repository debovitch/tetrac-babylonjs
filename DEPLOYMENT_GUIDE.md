# Guide de Déploiement - Application BabylonJS

## 🎯 Choix de la méthode de déploiement

Vous avez deux options pour déployer cette application :

### Option 1: Avec Dokploy (Recommandé) 🚀
**Fichiers à utiliser** :
- `Dockerfile` (version optimisée)
- `.dockerignore` (version optimisée)
- `DOKPLOY_README.md` (guide spécifique)

**Pourquoi choisir Dokploy ?**
- Déploiement simplifié en quelques clics
- Gestion automatique du HTTPS (Let's Encrypt)
- Optimisation des performances intégrée
- Monitoring et alertes inclus
- Mises à jour automatiques

### Option 2: Avec Docker standard
**Fichiers à utiliser** :
- `Dockerfile` (version simplifiée, compatible)
- `.dockerignore` 
- `DOCKER_README.md` (guide Docker standard)

**Quand choisir cette option ?**
- Si vous n'utilisez pas Dokploy
- Si vous voulez déployer sur un VPS sans plateforme de gestion
- Si vous préférez avoir un contrôle total sur la configuration

---

## 📁 Fichiers de configuration disponibles

### 1. Dockerfile (Optimisé pour Dokploy)
```dockerfile
# Dockerfile optimisé pour Dokploy - Application BabylonJS
FROM nginx:alpine

LABEL maintainer="thierryduchassin"

# Copie des fichiers de l'application
COPY . /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Caractéristiques** :
- Image légère basée sur nginx:alpine
- Configuration minimale (Dokploy gère le reste)
- Compatible avec les environnements Docker standard

### 2. .dockerignore (Optimisé)
```
# Fichiers à exclure du build Docker
.git/
.idea/
.history/
bower_components/
node_modules/
.DS_Store
*.log
*.tmp
```

**Optimisations** :
- Exclut les fichiers inutiles pour réduire la taille
- Améliore la sécurité en excluant les fichiers sensibles
- Accélère le processus de build

### 3. Configuration Dokploy recommandée

Dans l'interface Dokploy :

| Paramètre | Valeur recommandée |
|-----------|-------------------|
| **Type de projet** | Docker |
| **Dockerfile path** | `/Dockerfile` |
| **Port** | `80` |
| **Branche** | `development` |
| **Stratégie de déploiement** | Rolling update |
| **Health check path** | `/` |
| **Timeout** | 30 secondes |

---

## 🚀 Étapes de déploiement avec Dokploy

### 1. Préparation
```bash
# Vérifier que tous les fichiers sont prêts
git status

# S'assurer que le Dockerfile est à la racine
git add Dockerfile .dockerignore

# Commiter les changements
git commit -m "Ajout configuration Docker optimisée pour Dokploy"

# Pousser sur la branche à déployer
git push origin development
```

### 2. Configuration dans Dokploy
1. **Créer un nouveau projet** dans l'interface Dokploy
2. **Connecter votre dépôt Git** (GitHub, GitLab, Bitbucket)
3. **Sélectionner la branche** (`development` ou autre)
4. **Configurer le déploiement** :
   - Type: Docker
   - Dockerfile: `/Dockerfile`
   - Port: `80`
5. **Ajouter un domaine** (optionnel mais recommandé)
6. **Lancer le déploiement**

### 3. Vérification post-déploiement
- ✅ Vérifier que l'application est accessible
- ✅ Tester les fonctionnalités principales
- ✅ Vérifier les logs dans l'interface Dokploy
- ✅ Configurer les alertes (optionnel)

---

## 🔧 Dépannage

### Problème : L'application ne se charge pas
**Solutions** :
1. Vérifier les logs dans Dokploy
2. S'assurer que le port 80 est exposé
3. Vérifier que tous les fichiers ont été copiés
4. Tester localement avec `docker run -p 8080:80 babylon-app`

### Problème : Erreurs 404 sur certains assets
**Solutions** :
1. Vérifier que les chemins dans le code sont corrects
2. S'assurer que les fichiers existent dans le conteneur
3. Vérifier la configuration du serveur web dans Dokploy

### Problème : Problèmes de performances
**Solutions** :
1. Augmenter les ressources allouées dans Dokploy
2. Activer le cache dans les paramètres Dokploy
3. Vérifier que les assets sont bien mis en cache

---

## 📊 Comparaison des méthodes

| Critère | Dokploy | Docker Standard |
|---------|---------|-----------------|
| **Facilité** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **HTTPS** | Automatique | Manuel |
| **Performances** | Optimisé | Standard |
| **Monitoring** | Intégré | Manuel |
| **Mises à jour** | Automatiques | Manuelles |
| **Contrôle** | Limité | Total |

---

## 🎯 Recommandation finale

**Utilisez Dokploy** si vous voulez :
- Un déploiement rapide et sans tracas
- Une gestion automatique du HTTPS et des performances
- Un monitoring intégré
- Des mises à jour automatiques

**Utilisez Docker standard** si vous voulez :
- Un contrôle total sur la configuration
- Déployer sur un VPS sans plateforme
- Apprendre et comprendre chaque étape

---

## 📚 Ressources supplémentaires

- [Documentation Dokploy](https://dokploy.com/docs)
- [Guide Docker officiel](https://docs.docker.com/)
- [Optimisation nginx](https://www.nginx.com/blog/)

---

**Besoin d'aide ?** N'hésitez pas à demander - je suis là pour vous aider à déployer votre application avec succès ! 🚀