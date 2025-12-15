# 📚 Documentation Complète - Site Nouvel An 2026

## 📁 Structure du Projet

```
nouvel-an/
├── index.html                    # Page d'accueil principale
├── pages/                        # Dossier contenant toutes les sous-pages
│   ├── programme.html           # Page avec le programme de la soirée (timeline)
│   ├── idees.html               # Page avec les idées d'activités
│   ├── liste-de-courses.html    # Page avec la liste de courses
│   └── participants.html        # Page avec la liste des participants
├── styles/                       # Dossier contenant tous les fichiers CSS
│   ├── styles.css               # Styles CSS principaux (commun à toutes les pages)
│   ├── programme.css            # Styles spécifiques à la page programme
│   ├── idees.css                # Styles spécifiques à la page idées
│   ├── liste-de-courses.css     # Styles spécifiques à la page liste de courses
│   └── participants-styles.css  # Styles spécifiques à la page participants
├── script/
│   └── main.js                  # Fichier JavaScript avec toutes les animations
└── img/                         # Dossier pour les images (actuellement non utilisées)
```

---

## 🎨 Architecture et Philosophie

### Approche Mobile-First
Le site est conçu en **mobile-first**, ce qui signifie :
- Les styles de base sont optimisés pour mobile (< 481px)
- Les media queries ajoutent des styles pour tablette (≥ 481px)
- Les media queries ajoutent des styles pour desktop (≥ 769px)

### Thème Festif
- **Couleurs principales** : Or (#FFD700), Rouge (#DC143C), Bleu nuit (dégradés)
- **Style** : Moderne, festif, avec des effets de lueur (glow) et des animations
- **Typographie** : Segoe UI (système), sans-serif en fallback

---

## 📄 FICHIERS HTML

### 1. `index.html` - Page d'Accueil

**Rôle** : Page principale qui sert de point d'entrée vers toutes les autres sections.

**Structure** :
```html
<body>
  <div class="confetti-container"></div>  <!-- Container pour les confettis animés -->
  <header>                                <!-- En-tête avec titre -->
    <h1>Nouvel An 2026</h1>
  </header>
  <main>
    <div class="nav-grid">                <!-- Grille de navigation -->
      <a href="pages/programme.html" class="nav-card">...</a>
      <a href="pages/idees.html" class="nav-card">...</a>
      <a href="pages/liste-de-courses.html" class="nav-card">...</a>
      <a href="pages/participants.html" class="nav-card">...</a>
    </div>
  </main>
  <footer>...</footer>
</body>
```

**Éléments clés** :
- **`.confetti-container`** : Div vide où le JavaScript ajoute les confettis animés
- **`.nav-grid`** : Grille CSS qui affiche les 4 cartes de navigation
- **`.nav-card`** : Chaque carte est un lien vers une page différente
- Chaque carte a un icône (emoji), un titre (h2) et une description (p)

---

### 2. `pages/programme.html` - Programme de la Soirée

**Rôle** : Affiche le programme de la soirée sous forme de timeline verticale.

**Structure** :
```html
<div class="timeline">
  <div class="timeline-item" data-time="19:00">
    <div class="timeline-marker"></div>      <!-- Point sur la ligne -->
    <div class="timeline-content" data-time="19:00">
      <h3>Arrivées</h3>
      <p>Description...</p>
    </div>
  </div>
  <!-- Répété pour chaque événement -->
</div>
```

**Fonctionnement** :
- **`.timeline`** : Container principal avec une ligne verticale (::before)
- **`.timeline-item`** : Chaque événement du programme
  - `data-time` : Attribut HTML qui stocke l'heure (utilisé par CSS pour afficher)
- **`.timeline-marker`** : Point rond sur la ligne de timeline
- **`.timeline-content`** : Carte avec le contenu de l'événement
  - `data-time` : Dupliqué ici pour l'affichage mobile (badge en haut de la carte)

**Affichage responsive** :
- **Mobile** : L'heure s'affiche dans un badge en haut de chaque carte
- **Desktop** : L'heure s'affiche à gauche de la timeline (via ::before du `.timeline-item`)

**Événement spécial** :
- **`.highlight`** : Classe ajoutée à l'événement de minuit (00:00) pour un style spécial (rouge, animation pulsante)

---

### 3. `pages/idees.html` - Idées d'Activités

**Rôle** : Affiche les différentes idées d'activités pour la soirée.

**Structure** :
```html
<div class="ideas-grid">
  <div class="idea-card">
    <div class="idea-icon">🎲</div>
    <h3>Titre de l'activité</h3>
    <p>Description...</p>
  </div>
  <!-- Répété pour chaque idée -->
</div>
```

**Fonctionnement** :
- **`.ideas-grid`** : Grille CSS qui s'adapte automatiquement
  - Mobile : 1 colonne
  - Tablette : 2 colonnes
  - Desktop : Autant de colonnes que possible (min 280px par carte)
- **`.idea-card`** : Chaque carte d'idée avec :
  - Icône animée (`.idea-icon`)
  - Titre (h3)
  - Description (p)

---

### 4. `pages/liste-de-courses.html` - Liste de Courses

**Rôle** : Affiche une liste simple d'idées de courses (sans cases à cocher).

**Structure** :
```html
<div class="shopping-lists">
  <div class="shopping-category">
    <h2>🥂 Boissons à acheter</h2>
    <ul class="shopping-list">
      <li class="shopping-item">Coca</li>
      <li class="shopping-item">Ice Tea</li>
      <!-- ... -->
    </ul>
  </div>
  <!-- Autres catégories -->
</div>
```

**Fonctionnement** :
- **`.shopping-category`** : Chaque catégorie (Boissons, Grignotage, etc.)
- **`.shopping-list`** : Liste non-ordonnée
- **`.shopping-item`** : Chaque élément de la liste
  - Pas de checkbox, juste du texte
  - Puce dorée ajoutée via CSS (::before avec "•")

---

### 5. `pages/participants.html` - Liste des Participants

**Rôle** : Affiche la liste fixe des participants à la soirée.

**Structure** :
```html
<div class="participants-grid">
  <div class="participant-card">
    <div class="participant-avatar">👤</div>
    <h3>Nom</h3>
  </div>
  <!-- Répété pour chaque participant -->
</div>
<div class="participants-summary">
  <div class="summary-card">
    <h2>📊 Résumé</h2>
    <p class="count"><span id="participant-count">11</span> participant(s)</p>
  </div>
</div>
```

**Fonctionnement** :
- **`.participants-grid`** : Grille responsive (1 → 2 → plusieurs colonnes)
- **`.participant-card`** : Carte pour chaque participant
- **`.participants-summary`** : Résumé avec le compteur
- **`#participant-count`** : Élément mis à jour par JavaScript avec animation

---

## 🎨 FICHIERS CSS

### 1. `styles/styles.css` - Styles Principaux

**Rôle** : Styles communs à toutes les pages (layout, couleurs, animations de base).

#### Variables CSS (définies en :root)
```css
:root {
  --gold: #FFD700;           /* Or principal */
  --gold-dark: #FFA500;      /* Or foncé */
  --gold-light: #FFF8DC;     /* Or clair */
  --red: #DC143C;            /* Rouge */
  --blue-dark: #0D1117;      /* Bleu nuit foncé */
  --white: #FFFFFF;          /* Blanc */
  --sparkle: rgba(255, 215, 0, 0.8);  /* Particules scintillantes */
}
```
**Avantage** : Permet de changer les couleurs globalement en modifiant une seule valeur.

#### Fond Animé
```css
body::before {
  /* Dégradés radiaux pour effet de profondeur */
}

body::after {
  /* Particules scintillantes animées (animation sparkle) */
}
```

#### Classes Principales

**`.title-glow`** :
- Texte avec dégradé or
- Animation `glow` qui fait scintiller le texte
- Utilisé pour tous les titres principaux (h1)

**`.nav-card`** :
- Cartes de navigation sur la page d'accueil
- Effet hover (desktop) : translation + scale + ombre
- Effet actif (mobile) : scale réduit

**`.confetti-container`** :
- Container fixe en position absolue pour les confettis
- z-index élevé (9999) pour être au-dessus de tout
- pointer-events: none (ne bloque pas les clics)

---

### 2. `styles/programme.css` - Styles Timeline

**Rôle** : Styles spécifiques à la page programme (timeline).

#### Timeline
```css
.timeline::before {
  /* Ligne verticale dorée avec animation glow */
  left: 15px;  /* Mobile */
  left: 50px;  /* Desktop */
}
```

#### Items de Timeline
```css
.timeline-item {
  padding-left: 50px;  /* Mobile - espace pour la ligne et le marker */
  padding-left: 100px; /* Desktop */
}

.timeline-marker {
  /* Point rond sur la ligne */
  /* Animation pulse (battement) */
}
```

#### Affichage de l'Heure

**Mobile** :
```css
.timeline-content[data-time]::before {
  content: attr(data-time);  /* Récupère la valeur de data-time */
  /* Badge en haut de la carte */
  display: block;  /* Visible */
}
.timeline-item[data-time]::before {
  display: none;  /* Caché */
}
```

**Desktop** :
```css
.timeline-content[data-time]::before {
  display: none;  /* Caché */
}
.timeline-item[data-time]::before {
  display: block;  /* Visible à gauche */
}
```

**Astuce** : Le CSS utilise `attr(data-time)` pour récupérer dynamiquement l'heure depuis l'attribut HTML.

---

### 3. `styles/idees.css` - Styles Idées

**Rôle** : Styles pour les cartes d'idées.

**Grille Responsive** :
```css
.ideas-grid {
  grid-template-columns: 1fr;              /* Mobile : 1 colonne */
  grid-template-columns: repeat(2, 1fr);   /* Tablette : 2 colonnes */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));  /* Desktop */
}
```

**Animations** :
- **`.idea-icon`** : Animation `float` (flottement vertical)
- **Desktop hover** : Rotation de l'icône + bordure animée

---

### 4. `styles/liste-de-courses.css` - Styles Liste

**Rôle** : Styles pour la liste de courses.

**Puces Personnalisées** :
```css
.shopping-item::before {
  content: '•';  /* Puce dorée */
  color: var(--gold);
  position: absolute;
  left: 0.5rem;
}
```

**Animation** :
- Les catégories apparaissent avec `slideInLeft` (glissement depuis la gauche)

---

### 5. `styles/participants-styles.css` - Styles Participants

**Rôle** : Styles pour les cartes de participants.

**Grille** :
```css
.participants-grid {
  grid-template-columns: 1fr;                    /* Mobile */
  grid-template-columns: repeat(2, 1fr);         /* Tablette */
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));  /* Desktop */
}
```

**Carte Résumé** :
```css
.summary-card {
  /* Carte avec animation pulse-glow (battement de lueur) */
  /* Utilisée pour afficher le nombre total de participants */
}
```

---

## ⚡ FICHIER JAVASCRIPT (`script/main.js`)

**Rôle** : Gère toutes les animations interactives et les effets festifs.

### Détection Mobile/Desktop
```javascript
const isMobile = window.innerWidth < 769 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
```
**Pourquoi** : Réduire les animations sur mobile pour améliorer les performances.

---

### 1. Système de Confettis (`createConfetti`)

**Fonction** : Crée des confettis animés qui tombent.

**Comment ça marche** :
1. Crée un élément `<div>` pour chaque confetti
2. Position aléatoire en haut de l'écran
3. Utilise l'API `element.animate()` pour l'animation
4. Le confetti tombe avec rotation et mouvement horizontal aléatoire
5. Supprimé automatiquement à la fin de l'animation

**Optimisation mobile** :
- 25 confettis au lieu de 50
- Animation plus simple

**Confettis au clic** (`createConfettiBurst`) :
- Explosion de confettis au point de clic
- 10 confettis sur mobile, 20 sur desktop

---

### 2. Animation des Cartes de Navigation (`animateNavCards`)

**Fonction** : Fait apparaître progressivement les cartes.

**Comment ça marche** :
1. Commence avec `opacity: 0` et `translateY(50px)`
2. Applique une transition CSS
3. Fait apparaître chaque carte avec un délai progressif (0ms, 100ms, 200ms, 300ms)

**Hover (desktop uniquement)** :
- Translation vers le haut + scale au survol

---

### 3. Particules au Survol (`addHoverParticles`)

**Fonction** : Crée des étincelles dorées au survol des cartes (desktop uniquement).

**Comment ça marche** :
1. Écoute l'événement `mouseenter`
2. Calcule le centre de la carte
3. Crée 1 particule qui explose vers l'extérieur
4. Animation de 500ms puis suppression

---

### 4. Animation du Titre (`animateTitle`)

**Fonction** : Effet de frappe au clavier (désactivé sur mobile).

**Comment ça marche** :
1. Sauvegarde le texte
2. Vide le titre
3. Ajoute chaque caractère un par un avec un délai de 50ms

---

### 5. Effet de Neige (`createSnowEffect`)

**Fonction** : Crée des flocons de neige qui tombent.

**Comment ça marche** :
1. Crée un container pour les flocons
2. Génère 15-30 flocons (selon device)
3. Chaque flocon :
   - Position X aléatoire
   - Animation linéaire vers le bas
   - Rotation pendant la chute
   - Se régénère automatiquement à la fin

---

### 6. Animation au Scroll (`animateOnScroll`)

**Fonction** : Déclenche les animations quand les éléments entrent dans le viewport.

**Comment ça marche** :
1. Utilise l'API `IntersectionObserver`
2. Observe tous les éléments animables (`.idea-card`, `.timeline-item`, etc.)
3. Quand un élément entre dans le viewport (threshold: 0.1 = 10% visible), déclenche l'animation

**Avantage** : Les animations ne se déclenchent que quand l'utilisateur peut les voir.

---

### 7. Compteur Animé (`animateCounter`)

**Fonction** : Anime le compteur de participants de 0 au nombre total.

**Comment ça marche** :
1. Récupère le nombre de cartes participant (`.participant-card:not(.add-new)`)
2. Incrémente progressivement le compteur
3. Affiche le nombre entier (Math.floor)
4. Met à jour l'élément `#participant-count`

---

### 8. Particules Dorées (`createGoldenParticles`)

**Fonction** : Crée des particules dorées en arrière-plan (desktop uniquement).

**Comment ça marche** :
1. Crée 20 particules
2. Chaque particule pulse (apparaît/disparaît)
3. Animation infinie
4. Désactivé sur mobile pour les performances

---

### Initialisation (`DOMContentLoaded`)

Toutes les fonctions sont appelées quand le DOM est chargé :
```javascript
document.addEventListener('DOMContentLoaded', () => {
  createConfetti();
  animateNavCards();
  addHoverParticles();
  animateTitle();
  createSnowEffect();
  animateOnScroll();
  animateCounter();
  createGoldenParticles();
});
```

---

## 🎯 Comment Tout Fonctionne Ensemble

### 1. Chargement de la Page

1. Le navigateur charge le HTML
2. Les fichiers CSS sont chargés et appliqués
3. Le JavaScript s'exécute quand le DOM est prêt (`DOMContentLoaded`)

### 2. Styles CSS

- Les **variables CSS** définissent les couleurs une fois, utilisées partout
- Les **media queries** adaptent le layout selon la taille d'écran
- Les **animations CSS** (keyframes) créent les effets visuels de base

### 3. Interactions JavaScript

- Les **confettis** sont créés dynamiquement (pas dans le HTML)
- Les **animations au scroll** utilisent `IntersectionObserver` (API moderne)
- Les **événements** (click, hover) déclenchent des effets supplémentaires

### 4. Responsive Design

**Mobile (< 481px)** :
- 1 colonne pour les grilles
- Animations réduites
- Polices plus petites
- Padding réduit

**Tablette (481px - 768px)** :
- 2 colonnes pour certaines grilles
- Animations modérées
- Polices moyennes

**Desktop (≥ 769px)** :
- Multiples colonnes
- Toutes les animations actives
- Effets hover complets
- Polices plus grandes

---

## 🛠️ Personnalisation

### Changer les Couleurs

Modifier les variables dans `styles/styles.css` :
```css
:root {
  --gold: #FFD700;      /* Change cette valeur */
  --red: #DC143C;       /* Ou celle-ci */
}
```

### Ajouter un Participant

Dans `pages/participants.html`, ajouter :
```html
<div class="participant-card">
  <div class="participant-avatar">👤</div>
  <h3>Nouveau Nom</h3>
</div>
```
Puis mettre à jour le compteur dans le résumé : `<span id="participant-count">12</span>`

### Ajouter une Activité

Dans `pages/idees.html`, ajouter :
```html
<div class="idea-card">
  <div class="idea-icon">🎮</div>
  <h3>Titre</h3>
  <p>Description...</p>
</div>
```

### Modifier le Programme

Dans `pages/programme.html`, modifier ou ajouter un `.timeline-item` :
```html
<div class="timeline-item" data-time="21:00">
  <div class="timeline-marker"></div>
  <div class="timeline-content" data-time="21:00">
    <h3>Titre</h3>
    <p>Description...</p>
  </div>
</div>
```
**Important** : `data-time` doit être identique sur `.timeline-item` ET `.timeline-content`.

---

## 📱 Optimisations Mobile

1. **Moins de confettis** : 25 au lieu de 50
2. **Pas de particules dorées** : Désactivées sur mobile
3. **Pas d'animation de titre** : Trop gourmand en ressources
4. **Pas d'effets hover** : Utilise `:active` à la place
5. **Zones tactiles** : Minimum 44-48px pour les éléments cliquables
6. **Animations réduites** : Moins de flocons de neige

---

## 🎨 Classes CSS Utiles

### Classes Communes
- `.title-glow` : Titre principal avec effet de lueur
- `.back-link` : Lien de retour vers l'accueil
- `.confetti-container` : Container pour les confettis JavaScript

### Classes Page Programme
- `.timeline` : Container de la timeline
- `.timeline-item` : Chaque événement
- `.timeline-marker` : Point sur la ligne
- `.timeline-content` : Carte avec le contenu
- `.highlight` : Événement spécial (minuit)

### Classes Page Idées
- `.ideas-grid` : Grille des idées
- `.idea-card` : Carte d'idée
- `.idea-icon` : Icône animée

### Classes Page Liste
- `.shopping-category` : Catégorie de courses
- `.shopping-list` : Liste d'éléments
- `.shopping-item` : Chaque élément

### Classes Page Participants
- `.participants-grid` : Grille des participants
- `.participant-card` : Carte de participant
- `.summary-card` : Carte résumé

---

## 🐛 Dépannage

### Les confettis ne s'affichent pas
- Vérifier que `.confetti-container` existe dans le HTML
- Vérifier que `main.js` est bien chargé
- Ouvrir la console pour voir les erreurs JavaScript

### Les styles ne s'appliquent pas
- Vérifier les chemins relatifs des fichiers CSS (`../styles/...`)
- Vérifier que les classes CSS correspondent au HTML
- Utiliser les outils de développement du navigateur (F12)

### Les animations sont lentes
- Vérifier si on est sur mobile (animations réduites)
- Désactiver temporairement certaines animations dans `main.js`

---

## 📚 Ressources et Technologies Utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Flexbox, Grid, Animations, Variables CSS, Media Queries
- **JavaScript ES6+** : APIs modernes (IntersectionObserver, element.animate())
- **Approche Mobile-First** : Design responsive
- **Pas de frameworks** : Code vanilla pour des performances optimales

---

## ✨ Fonctionnalités Clés

1. ✅ Design responsive (mobile, tablette, desktop)
2. ✅ Animations festives (confettis, neige, particules)
3. ✅ Timeline interactive pour le programme
4. ✅ Liste de courses simple
5. ✅ Liste des participants avec compteur animé
6. ✅ Optimisations performance mobile
7. ✅ Thème festif cohérent
8. ✅ Navigation intuitive

---

*Documentation créée pour le projet Nouvel An 2026 - Gaël Deschamps*

