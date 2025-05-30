
# <i class="fas fa-book-heart text-sky-500"></i> Mon Carnet d'Émotions

**Mon Carnet d'Émotions** est une application web conçue pour vous aider à enregistrer, suivre et comprendre vos émotions, pensées et comportements au quotidien. Elle offre une interface intuitive et des fonctionnalités pratiques, y compris la saisie vocale, pour faciliter la tenue de votre journal émotionnel.

## <i class="fas fa-cogs"></i> Fonctionnalités Principales

*   **Création d'Entrées Émotionnelles** : Enregistrez facilement de nouvelles entrées pour documenter vos expériences.
*   **Champs Détaillés** : Documentez la situation, les émotions ressenties, vos pensées et réflexions détaillées, l'intensité de vos émotions, la validité perçue de ces émotions/pensées, et le comportement adopté.
*   **Saisie Vocale** : Utilisez la reconnaissance vocale pour remplir les champs textuels (situation, détails, comportement), rendant la saisie plus rapide et accessible.
*   **Sélection d'Émotions Intuitive** : Choisissez parmi une liste prédéfinie d'émotions, chacune accompagnée de son emoji.
*   **Échelles d'Évaluation** : Évaluez l'intensité de vos émotions et la pertinence de vos réactions sur une échelle de 1 à 10.
*   **Visualisation des Entrées** : Consultez vos entrées passées, présentées sous forme de cartes claires et organisées chronologiquement.
*   **Stockage Local Sécurisé** : Vos données sont sauvegardées directement dans le `localStorage` de votre navigateur, garantissant confidentialité et accès hors ligne.
*   **Exportation des Données** : Téléchargez l'ensemble de vos entrées au format JSON pour une sauvegarde personnelle ou une utilisation externe.
*   **Design Adaptatif (Responsive)** : Profitez d'une expérience utilisateur optimale sur ordinateurs, tablettes et smartphones.
*   **Interface Conviviale** : Une navigation simple et des appels à l'action clairs pour une prise en main facile.

## <i class="fas fa-laptop-code"></i> Technologies Utilisées

*   **React 19** : Bibliothèque JavaScript pour la construction d'interfaces utilisateur interactives (avec les Hooks).
*   **TypeScript** : Sur-ensemble de JavaScript ajoutant un typage statique pour un code plus robuste et maintenable.
*   **Tailwind CSS** : Framework CSS utilitaire pour un design rapide et personnalisé.
*   **Web Speech API** : API navigateur pour la reconnaissance vocale (utilisée pour la saisie vocale).
*   **Font Awesome** : Bibliothèque d'icônes vectorielles.

## <i class="fas fa-folder-open"></i> Structure du Projet

Le projet est organisé comme suit :

```
.
├── README.md                 # Ce fichier
├── index.html                # Point d'entrée HTML de l'application
├── index.tsx                 # Point d'entrée du code React (rendu de l'application)
├── App.tsx                   # Composant principal de l'application
├── metadata.json             # Métadonnées de l'application (nom, description, permissions)
├── constants.ts              # Constantes (ex: liste des émotions)
├── types.ts                  # Définitions des types TypeScript
├── components/               # Répertoire des composants React réutilisables
│   ├── JournalEntryForm.tsx  # Formulaire de création/édition d'une entrée
│   ├── JournalEntryCard.tsx  # Affichage d'une entrée individuelle
│   ├── VoiceInputField.tsx   # Champ de texte avec option de saisie vocale
│   ├── EmotionCheckbox.tsx   # Case à cocher pour la sélection d'émotions
│   └── RatingInput.tsx       # Composant pour l'évaluation (intensité, validité)
└── hooks/                    # Répertoire des hooks React personnalisés
    └── useSpeechRecognition.ts # Hook pour gérer la logique de reconnaissance vocale
```

## <i class="fas fa-rocket"></i> Comment Utiliser l'Application

1.  **Accès** : Ouvrez le fichier `index.html` dans un navigateur web moderne.
2.  **Nouvelle Entrée** :
    *   Cliquez sur le bouton <button class="bg-sky-500 text-white font-semibold py-1 px-2 rounded text-sm"><i class="fas fa-plus-circle mr-1"></i>Nouvelle Entrée</button> pour afficher le formulaire.
3.  **Remplir le Formulaire** :
    *   **Situation** : Décrivez le contexte de l'événement. Vous pouvez utiliser l'icône <i class="fas fa-microphone"></i> pour dicter votre texte.
    *   **Émotions associées** : Sélectionnez une ou plusieurs émotions dans la liste proposée.
    *   **Pensées et réflexions** : Ajoutez des détails sur vos pensées, ressentis (saisie vocale disponible).
    *   **Intensité des émotions** : Évaluez l'intensité sur une échelle de 1 (faible) à 10 (très forte).
    *   **Validité perçue** : Indiquez à quel point vous estimez avoir raison de penser/ressentir cela (1 = pas du tout, 10 = totalement).
    *   **Comportement adopté** : Décrivez comment vous avez réagi ou agi (saisie vocale disponible).
4.  **Enregistrer** : Cliquez sur <button class="bg-sky-600 text-white font-semibold py-1 px-2 rounded text-sm"><i class="fas fa-save mr-1"></i>Enregistrer l'Entrée</button>. Le formulaire se fermera et votre entrée apparaîtra dans la liste.
5.  **Consulter les Entrées** : Les entrées enregistrées sont affichées sur la page principale, de la plus récente à la plus ancienne.
6.  **Télécharger les Données** :
    *   Si vous avez des entrées sauvegardées, le bouton <button class="bg-emerald-500 text-white font-semibold py-1 px-2 rounded text-sm"><i class="fas fa-download mr-1"></i>Télécharger les Données</button> sera visible.
    *   Cliquez dessus pour télécharger toutes vos entrées sous forme d'un fichier `carnet_emotions_AAAA-MM-JJ.json`.

## <i class="fas fa-microphone-alt"></i> Saisie Vocale

*   La fonctionnalité de saisie vocale est disponible pour les champs "Situation", "Pensées et réflexions", et "Comportement adopté".
*   Cliquez sur l'icône <i class="fas fa-microphone"></i> pour commencer l'enregistrement et sur <i class="fas fa-microphone-slash text-red-500"></i> pour arrêter.
*   Vous devrez autoriser l'accès au microphone de votre navigateur lors de la première utilisation.
*   La disponibilité et la qualité de la reconnaissance vocale dépendent de votre navigateur et de ses paramètres. La langue configurée est le Français (`fr-FR`).

## <i class="fas fa-database"></i> Stockage des Données

*   Toutes les données de votre carnet d'émotions sont stockées localement dans le `localStorage` de votre navigateur.
*   Cela signifie que vos données restent sur votre appareil et ne sont pas envoyées à un serveur distant.
*   Les données persistent entre les sessions tant que vous utilisez le même navigateur et que vous ne supprimez pas les données de site.

## <i class="fas fa-file-download"></i> Téléchargement des Données

*   Vous pouvez exporter toutes vos entrées à tout moment.
*   Les données sont exportées au format JSON, un format standard facile à lire et à utiliser par d'autres applications si nécessaire.
*   Ceci est utile pour créer des sauvegardes ou pour analyser vos données en dehors de l'application.

## <i class="fas fa-universal-access"></i> Accessibilité

L'application s'efforce d'être accessible :
*   Utilisation d'attributs ARIA lorsque c'est pertinent.
*   Bon contraste des couleurs (en cours d'amélioration continue).
*   Navigation au clavier facilitée pour les éléments interactifs.
*   Les champs de saisie vocale offrent une alternative à la saisie manuelle.

## <i class="fab fa-chrome"></i> Navigateurs Supportés

L'application est conçue pour fonctionner sur les navigateurs web modernes :
*   Google Chrome (recommandé pour la meilleure compatibilité avec la Web Speech API)
*   Microsoft Edge
*   Mozilla Firefox (la Web Speech API peut nécessiter une activation ou avoir un support limité)
*   Safari (support de la Web Speech API variable)

Assurez-vous que votre navigateur est à jour pour une expérience optimale.

---

<p align="center">
  Construit avec <i class="fas fa-heart text-red-500"></i> pour vous aider à mieux vous comprendre.
</p>
