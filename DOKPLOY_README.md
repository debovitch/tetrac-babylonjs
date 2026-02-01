# Déploiement avec Dokploy - Application BabylonJS

## 🎯 Optimisé pour Dokploy

Ce Dockerfile et cette configuration sont spécialement optimisés pour le déploiement avec **Dokploy**, une plateforme de déploiement moderne qui gère automatiquement le serveur web, les certificats SSL, et l'optimisation des performances.

## 🚀 Déploiement rapide avec Dokploy

### Prérequis
- Un compte Dokploy
- Un serveur VPS connecté à Dokploy
- Ce dépôt Git connecté à votre projet Dokploy

### Étapes de déploiement

1. **Connecter votre dépôt** : Dans l'interface Dokploy, connectez ce dépôt Git à votre projet

2. **Configurer le déploiement** :
   - **Type de projet** : "Docker" ou "Application statique"
   - **Dockerfile path** : `/Dockerfile`
   - **Port** : `80`
   - **Branche** : `development` (ou la branche que vous souhaitez déployer)

3. **Configurer le domaine** (optionnel) :
   - Ajoutez votre domaine personnalisé
   - Dokploy gérera automatiquement les certificats SSL avec Let's Encrypt

4. **Déployer** : Cliquez sur "Deploy" et Dokploy s'occupera de tout !

## 📁 Structure optimisée pour Dokploy

```
.
├── Dockerfile              # Configuration Docker simplifiée
├── .dockerignore           # Fichiers à exclure du build
├── index.html              # Point d'entrée de l'application
├── js/                     # Code JavaScript
├── css/                    # Styles CSS
├── assets/                 # Assets (images, textures, etc.)
├── lib/                    # Dépendances locales
└── bower_components/       # Dépendances (exclues du build)
```

## 🔧 Configuration Dokploy recommandée

### Variables d'environnement (si nécessaire)
Aucune variable d'environnement n'est nécessaire pour cette application statique.

### Ressources recommandées
- **CPU** : 0.5 - 1 vCPU
- **RAM** : 256MB - 512MB
- **Stockage** : 500MB - 1GB

### Stratégie de déploiement
- **Type** : Rolling update (pour éviter les temps d'arrêt)
- **Health check** : `/` (vérification de la page d'accueil)
- **Timeout** : 30 secondes

## 🛠️ Mise à jour et maintenance

### Mettre à jour l'application
1. Faites vos modifications dans le code
2. Commitez et poussez sur la branche déployée
3. Dokploy détectera automatiquement les changements et redéploiera

### Voir les logs
Dans l'interface Dokploy :
- Allez dans "Logs" pour voir les logs en temps réel
- Utilisez le bouton "Restart" si nécessaire

### Redémarrer l'application
Dans l'interface Dokploy :
- Cliquez sur "Restart" dans l'onglet de votre application

## ⚡ Optimisations pour Dokploy

### Ce que Dokploy gère pour vous
✅ **Serveur web** (nginx optimisé)
✅ **Certificats SSL** (HTTPS automatique)
✅ **Cache et performances**
✅ **Load balancing** (si plusieurs instances)
✅ **Mises à jour automatiques**
✅ **Monitoring et alertes**
✅ **Sauvegardes** (optionnel)

### Ce que notre Dockerfile fournit
✅ **Fichiers statiques** (HTML, JS, CSS, assets)
✅ **Structure optimisée** (taille réduite)
✅ **Compatibilité** (fonctionne avec ou sans Dokploy)

## 📊 Performances attendues

- **Temps de build** : < 1 minute
- **Temps de déploiement** : < 30 secondes
- **Taille de l'image** : ~120MB
- **Consommation mémoire** : ~50-100MB en production

## 🔒 Sécurité

Dokploy gère automatiquement :
- Les mises à jour de sécurité
- Les certificats SSL
- La protection contre les attaques DDoS (au niveau infrastructure)

## 📖 Documentation supplémentaire

- [Documentation officielle Dokploy](https://dokploy.com/docs)
- [Guide de déploiement Docker](https://dokploy.com/docs/docker)
- [Optimisation des applications statiques](https://dokploy.com/docs/static-sites)

## 🎨 Personnalisation avancée

Si vous avez besoin de configurations spécifiques pour Dokploy, vous pouvez ajouter un fichier `dokploy.yml` à la racine de votre projet avec des instructions personnalisées.

---

**Besoin d'aide ?** Consultez la documentation Dokploy ou contactez leur support - ils sont très réactifs ! 🚀