# 📱 Installation de "Mon Carnet d'Émotions" sur iPhone 12

Votre application est maintenant une **Progressive Web App (PWA)** installable sur votre iPhone 12 !

## 🚀 Étapes d'installation sur iPhone

### 1. **Générer les icônes** (Une seule fois)
1. Ouvrez le fichier `create-icons.html` dans Safari sur votre Mac
2. Téléchargez toutes les icônes générées
3. Placez-les dans le dossier `icons/` de votre projet

### 2. **Démarrer l'application**
```bash
# Dans le terminal, dans le dossier de votre projet :
npm run dev
# ou si vous utilisez un serveur local :
python3 -m http.server 8000
```

### 3. **Installer sur iPhone 12**
1. **Ouvrez Safari** sur votre iPhone (pas Chrome ou autre navigateur)
2. **Naviguez vers l'adresse** de votre application locale :
   - Si vous utilisez Vite : `http://[VOTRE-IP-LOCAL]:5173`
   - Si vous utilisez un serveur Python : `http://[VOTRE-IP-LOCAL]:8000`
3. **Appuyez sur le bouton Partage** (carré avec flèche vers le haut)
4. **Faites défiler et appuyez sur "Sur l'écran d'accueil"**
5. **Personnalisez le nom** si nécessaire et appuyez sur "Ajouter"

### 4. **Vérifier l'installation**
- L'icône "Carnet Émotions" apparaît sur votre écran d'accueil
- L'application s'ouvre en mode plein écran (sans barre Safari)
- Elle fonctionne hors ligne après la première visite

## ✨ Nouvelles fonctionnalités PWA

- **📵 Fonctionnement hors ligne** : Vos données sont toujours accessibles
- **🏠 Écran d'accueil** : Lancez l'app comme une app native
- **📱 Mode plein écran** : Interface sans les barres du navigateur
- **💾 Cache intelligent** : Chargement plus rapide
- **🔄 Mises à jour automatiques** : Le cache se met à jour automatiquement

## 🔧 Configuration réseau

Pour accéder depuis votre iPhone, vous devez connaître l'IP locale de votre Mac :

```bash
# Sur Mac, pour connaître votre IP locale :
ifconfig | grep "inet " | grep -v 127.0.0.1
```

Exemple : Si votre IP est `192.168.1.100`, l'adresse sera :
`http://192.168.1.100:5173` (avec Vite)

## 🎯 Optimisations spécifiques iPhone

- **Viewport optimisé** pour iPhone 12
- **Métadonnées Apple** pour une intégration parfaite
- **Thème couleur** qui s'adapte à iOS
- **Icônes adaptatives** pour toutes les tailles d'écran
- **Mode portrait** privilégié pour une meilleure expérience

## 🛠 Dépannage

### L'icône ne s'affiche pas ?
- Vérifiez que les fichiers d'icônes sont dans le dossier `icons/`
- Videz le cache Safari : Réglages > Safari > Effacer historique

### L'app ne fonctionne pas hors ligne ?
- Visitez l'application une première fois avec internet
- Le service worker se charge automatiquement

### Impossible d'ajouter à l'écran d'accueil ?
- Utilisez **uniquement Safari** (pas Chrome/Firefox)
- Vérifiez que vous êtes sur `http://` ou `https://`

## 🎉 Félicitations !

Votre carnet d'émotions est maintenant installé comme une vraie application sur votre iPhone 12. Vous pouvez :

- ✅ L'utiliser sans connexion internet
- ✅ La lancer depuis l'écran d'accueil
- ✅ Bénéficier d'une interface native iOS
- ✅ Garder toutes vos données en sécurité localement

Profitez de votre nouveau carnet d'émotions mobile ! 📖💙 