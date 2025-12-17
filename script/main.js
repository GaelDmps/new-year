/* ============================================
   SCRIPT PRINCIPAL - ANIMATIONS FESTIVES
   ============================================
   Ce fichier gère toutes les animations interactives
   et les effets festifs du site Nouvel An 2026
   ============================================ */

// ============================================
// DÉTECTION MOBILE/DESKTOP
// ============================================
// Détecte si l'utilisateur est sur mobile pour optimiser les performances
// Vérifie la largeur de l'écran ET le User-Agent (pour les vrais mobiles)
const isMobile = window.innerWidth < 769 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// ============================================
// SYSTÈME DE CONFETTIS
// ============================================

/**
 * Fonction principale qui initialise le système de confettis
 * Crée des confettis au chargement de la page et au clic
 */
function createConfetti() {
    // Palette de couleurs pour les confettis (or, rouge, bleu, etc.)
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
    
    // Récupère le container où seront ajoutés les confettis (défini dans le HTML)
    const confettiContainer = document.querySelector('.confetti-container');
    
    // Si le container n'existe pas, on arrête la fonction
    if (!confettiContainer) return;
    
    // Sur mobile : moins de confettis pour de meilleures performances (25 au lieu de 50)
    const confettiCount = isMobile ? 25 : 50;
    
    // Créer des confettis au chargement de la page
    // Chaque confetti est créé avec un délai progressif (0ms, 50ms, 100ms, etc.)
    // pour un effet de cascade
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            createConfettiPiece(confettiContainer, colors);
        }, i * 50); // Délai de 50ms entre chaque confetti
    }
    
    // Ajouter des confettis au clic/tap de l'utilisateur
    document.addEventListener('click', (e) => {
        // 30% de chance de créer une explosion de confettis au clic
        if (Math.random() > 0.7) {
            // Récupère les coordonnées du clic (compatible mobile et desktop)
            const x = e.clientX || e.touches?.[0]?.clientX || 0;
            const y = e.clientY || e.touches?.[0]?.clientY || 0;
            createConfettiBurst(x, y, colors);
        }
    });
}

/**
 * Crée un seul confetti qui tombe depuis le haut de l'écran
 * @param {HTMLElement} container - Le container où ajouter le confetti
 * @param {Array} colors - Tableau des couleurs possibles
 */
function createConfettiPiece(container, colors) {
    // Crée un nouvel élément div pour le confetti
    const confetti = document.createElement('div');
    
    // Taille aléatoire entre 5px et 15px
    const size = Math.random() * 10 + 5;
    // Couleur aléatoire parmi la palette
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Style du confetti
    confetti.style.position = 'absolute'; // Position absolue pour le placer n'importe où
    confetti.style.width = size + 'px';
    confetti.style.height = size + 'px';
    confetti.style.backgroundColor = color;
    confetti.style.left = Math.random() * 100 + '%'; // Position X aléatoire (0% à 100%)
    confetti.style.top = '-10px'; // Commence au-dessus de l'écran
    confetti.style.opacity = Math.random(); // Opacité aléatoire pour variété
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`; // Rotation initiale aléatoire
    // Forme aléatoire : soit rond (50%) soit carré
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
    
    // Ajoute le confetti au container
    container.appendChild(confetti);
    
    // Paramètres d'animation
    const animationDuration = Math.random() * 3 + 2; // Durée entre 2 et 5 secondes
    const fallDistance = window.innerHeight + 100; // Distance de chute (hauteur écran + marge)
    const horizontalMovement = (Math.random() - 0.5) * 200; // Mouvement horizontal aléatoire (-100px à +100px)
    
    // Animation du confetti avec l'API Web Animations
    confetti.animate([
        { 
            // État initial : en haut, opacité 1
            transform: `translate(0, 0) rotate(0deg)`,
            opacity: 1
        },
        { 
            // État final : en bas avec rotation complète (720° = 2 tours)
            transform: `translate(${horizontalMovement}px, ${fallDistance}px) rotate(720deg)`,
            opacity: 0 // Disparaît à la fin
        }
    ], {
        duration: animationDuration * 1000, // Convertit en millisecondes
        easing: 'ease-in', // Accélération progressive (comme la gravité)
        fill: 'forwards' // Garde l'état final (opacité 0)
    }).onfinish = () => confetti.remove(); // Supprime l'élément quand l'animation est finie
}

/**
 * Crée une explosion de confettis au point de clic
 * @param {number} x - Coordonnée X du clic
 * @param {number} y - Coordonnée Y du clic
 * @param {Array} colors - Tableau des couleurs possibles
 */
function createConfettiBurst(x, y, colors) {
    const confettiContainer = document.querySelector('.confetti-container');
    // Moins de confettis sur mobile (10 au lieu de 20)
    const burstCount = isMobile ? 10 : 20;
    
    // Crée plusieurs confettis qui partent dans toutes les directions
    for (let i = 0; i < burstCount; i++) {
        const confetti = document.createElement('div');
        const size = Math.random() * 8 + 4; // Taille entre 4px et 12px
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Calcule l'angle pour répartir les confettis en cercle
        // (Math.PI * 2) = 360° en radians, divisé par le nombre de confettis
        const angle = (Math.PI * 2 * i) / burstCount;
        // Vitesse aléatoire entre 100px et 300px
        const velocity = Math.random() * 200 + 100;
        
        // Style du confetti
        confetti.style.position = 'fixed'; // Fixe par rapport au viewport
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        confetti.style.backgroundColor = color;
        confetti.style.left = x + 'px'; // Position au point de clic
        confetti.style.top = y + 'px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
        confetti.style.pointerEvents = 'none'; // Ne bloque pas les clics
        confetti.style.zIndex = '10000'; // Au-dessus de tout
        
        confettiContainer.appendChild(confetti);
        
        // Calcule la position finale en utilisant la trigonométrie
        // cos(angle) * velocity = mouvement horizontal
        // sin(angle) * velocity = mouvement vertical
        const endX = x + Math.cos(angle) * velocity;
        const endY = y + Math.sin(angle) * velocity + 100; // +100 pour tomber un peu
        
        // Animation d'explosion
        confetti.animate([
            { 
                transform: 'translate(0, 0) rotate(0deg) scale(1)',
                opacity: 1
            },
            { 
                transform: `translate(${endX - x}px, ${endY - y}px) rotate(720deg) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 1000 + Math.random() * 500, // Entre 1 et 1.5 secondes
            easing: 'ease-out', // Ralentit à la fin
            fill: 'forwards'
        }).onfinish = () => confetti.remove();
    }
}

// ============================================
// ANIMATION DES CARTES DE NAVIGATION
// ============================================

/**
 * Anime l'apparition des cartes de navigation sur la page d'accueil
 * Chaque carte apparaît progressivement avec un délai
 */
function animateNavCards() {
    // Récupère toutes les cartes de navigation
    const navCards = document.querySelectorAll('.nav-card');
    
    // Pour chaque carte, on crée une animation d'apparition
    navCards.forEach((card, index) => {
        // État initial : invisible et décalée vers le bas
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        // Après un délai progressif, on fait apparaître la carte
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease'; // Transition fluide
            card.style.opacity = '1'; // Devient visible
            card.style.transform = 'translateY(0)'; // Revient à sa position normale
        }, index * 100); // Délai de 0ms, 100ms, 200ms, 300ms pour chaque carte
        
        // Effet de hover seulement sur desktop (pas sur mobile)
        if (!isMobile) {
            // Quand la souris entre sur la carte
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.05)'; // Lève et agrandit
            });
            
            // Quand la souris quitte la carte
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)'; // Revient à la normale
            });
        }
    });
}

// ============================================
// PARTICULES AU SURVOL (DESKTOP UNIQUEMENT)
// ============================================

/**
 * Ajoute des étincelles dorées au survol des cartes (desktop uniquement)
 * Crée un effet visuel festif quand on passe la souris sur les éléments
 */
function addHoverParticles() {
    // Pas d'effets hover sur mobile (pas de souris)
    if (isMobile) return;
    
    // Sélectionne toutes les cartes qui peuvent avoir cet effet
    const cards = document.querySelectorAll('.nav-card, .idea-card, .participant-card');
    
    // Pour chaque carte, on écoute l'événement "mouseenter" (souris entre)
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            // Calcule le centre de la carte
            const rect = this.getBoundingClientRect(); // Position et taille de la carte
            const centerX = rect.left + rect.width / 2; // Centre horizontal
            const centerY = rect.top + rect.height / 2; // Centre vertical
            
            // Crée une étincelle au centre
            createSparkle(centerX, centerY);
        });
    });
}

/**
 * Crée une étincelle dorée qui explose depuis un point
 * @param {number} x - Coordonnée X du point
 * @param {number} y - Coordonnée Y du point
 */
function createSparkle(x, y) {
    // Crée un petit point doré
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.backgroundColor = '#FFD700'; // Or
    sparkle.style.borderRadius = '50%'; // Forme ronde
    sparkle.style.pointerEvents = 'none'; // Ne bloque pas les clics
    sparkle.style.zIndex = '10000'; // Au-dessus de tout
    sparkle.style.boxShadow = '0 0 10px #FFD700'; // Lueur dorée
    
    document.body.appendChild(sparkle);
    
    // Calcule une direction aléatoire pour l'explosion
    const angle = Math.random() * Math.PI * 2; // Angle aléatoire (0 à 360°)
    const distance = 30; // Distance de l'explosion
    const endX = x + Math.cos(angle) * distance; // Position finale X
    const endY = y + Math.sin(angle) * distance; // Position finale Y
    
    // Animation de l'étincelle
    sparkle.animate([
        { 
            transform: 'translate(0, 0) scale(1)',
            opacity: 1
        },
        { 
            transform: `translate(${endX - x}px, ${endY - y}px) scale(0)`,
            opacity: 0
        }
    ], {
        duration: 500, // 0.5 seconde
        easing: 'ease-out',
        fill: 'forwards'
    }).onfinish = () => sparkle.remove(); // Supprime après l'animation
}

// ============================================
// ANIMATION DU TITRE (EFFET FRAppe)
// ============================================

/**
 * Anime le titre avec un effet de frappe au clavier
 * Désactivé sur mobile pour de meilleures performances
 */
function animateTitle() {
    // Pas d'animation sur mobile
    if (isMobile) return;
    
    // Récupère tous les titres avec la classe "title-glow"
    const titles = document.querySelectorAll('.title-glow');
    
    titles.forEach(title => {
        // Sauvegarde le texte original
        const text = title.textContent;
        // Vide le titre
        title.textContent = '';
        title.style.opacity = '1';
        
        // Ajoute chaque caractère un par un avec un délai
        text.split('').forEach((char, index) => {
            setTimeout(() => {
                title.textContent += char; // Ajoute le caractère
            }, index * 50); // Délai de 50ms entre chaque caractère
        });
    });
}

// ============================================
// EFFET DE NEIGE
// ============================================

/**
 * Crée un effet de neige avec des flocons qui tombent
 * Optimisé pour mobile (moins de flocons)
 */
function createSnowEffect() {
    // Crée un container pour tous les flocons
    const snowContainer = document.createElement('div');
    snowContainer.style.position = 'fixed';
    snowContainer.style.top = '0';
    snowContainer.style.left = '0';
    snowContainer.style.width = '100%';
    snowContainer.style.height = '100%';
    snowContainer.style.pointerEvents = 'none'; // Ne bloque pas les clics
    snowContainer.style.zIndex = '1'; // Derrière le contenu mais devant le fond
    document.body.appendChild(snowContainer);
    
    // Moins de flocons sur mobile (15 au lieu de 30)
    const snowflakeCount = isMobile ? 15 : 30;
    
    // Crée tous les flocons
    for (let i = 0; i < snowflakeCount; i++) {
        createSnowflake(snowContainer);
    }
}

/**
 * Crée un flocon de neige qui tombe
 * @param {HTMLElement} container - Le container où ajouter le flocon
 */
function createSnowflake(container) {
    const snowflake = document.createElement('div');
    snowflake.innerHTML = '❄'; // Emoji flocon de neige
    snowflake.style.position = 'absolute';
    snowflake.style.fontSize = Math.random() * 20 + 10 + 'px'; // Taille entre 10px et 30px
    snowflake.style.opacity = Math.random() * 0.5 + 0.3; // Opacité entre 0.3 et 0.8
    snowflake.style.left = Math.random() * 100 + '%'; // Position X aléatoire
    snowflake.style.top = '-20px'; // Commence au-dessus de l'écran
    snowflake.style.color = '#FFFFFF'; // Blanc
    snowflake.style.pointerEvents = 'none'; // Ne bloque pas les clics
    
    container.appendChild(snowflake);
    
    // Paramètres d'animation
    const fallDuration = Math.random() * 5000 + 5000; // Durée entre 5 et 10 secondes
    const horizontalMovement = (Math.random() - 0.5) * 100; // Balancement horizontal (-50px à +50px)
    const fallDistance = window.innerHeight + 50; // Distance de chute
    
    // Animation de chute
    const animation = snowflake.animate([
        { 
            transform: 'translate(0, 0) rotate(0deg)',
            opacity: snowflake.style.opacity
        },
        { 
            transform: `translate(${horizontalMovement}px, ${fallDistance}px) rotate(360deg)`,
            opacity: 0
        }
    ], {
        duration: fallDuration,
        easing: 'linear', // Vitesse constante (comme la neige réelle)
        fill: 'forwards'
    });
    
    // Quand l'animation est finie, on recrée un nouveau flocon
    // pour un effet continu
    animation.onfinish = () => {
        snowflake.remove(); // Supprime l'ancien flocon
        // Recrée un nouveau flocon après un délai aléatoire (0 à 2 secondes)
        setTimeout(() => createSnowflake(container), Math.random() * 2000);
    };
}

// ============================================
// ANIMATION AU SCROLL
// ============================================

/**
 * Déclenche les animations quand les éléments entrent dans le viewport
 * Utilise l'API IntersectionObserver (moderne et performante)
 */
function animateOnScroll() {
    // Crée un observateur qui surveille quand les éléments entrent dans le viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Si l'élément est visible (au moins 10% dans le viewport)
            if (entry.isIntersecting) {
                // Déclenche l'animation CSS
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1 // Déclenche quand 10% de l'élément est visible
    });
    
    // Sélectionne tous les éléments qui ont des animations CSS
    const animatedElements = document.querySelectorAll('.idea-card, .timeline-item, .shopping-category, .participant-card');
    
    // Observe chaque élément
    animatedElements.forEach(el => observer.observe(el));
}

// ============================================
// COMPTEUR ANIMÉ DES PARTICIPANTS
// ============================================

/**
 * Anime le compteur de participants de 0 au nombre total
 * Crée un effet de comptage progressif
 */
function animateCounter() {
    // Récupère l'élément qui affiche le nombre
    const countElement = document.getElementById('participant-count');
    if (!countElement) return; // Si l'élément n'existe pas, on arrête
    
    // Compte le nombre de cartes participant (exclut les cartes "add-new")
    const participantCards = document.querySelectorAll('.participant-card:not(.add-new)');
    const targetCount = participantCards.length; // Nombre total à atteindre
    
    let currentCount = 0; // Compteur actuel
    const increment = targetCount / 30; // Incrément pour arriver au total en 30 étapes
    
    // Intervalle qui met à jour le compteur toutes les 50ms
    const counter = setInterval(() => {
        currentCount += increment; // Augmente le compteur
        
        // Si on a atteint ou dépassé le total
        if (currentCount >= targetCount) {
            countElement.textContent = targetCount; // Affiche le nombre exact
            clearInterval(counter); // Arrête l'intervalle
        } else {
            // Affiche le nombre entier (arrondi vers le bas)
            countElement.textContent = Math.floor(currentCount);
        }
    }, 50); // Toutes les 50ms
}

// ============================================
// PARTICULES DORÉES EN ARRIÈRE-PLAN
// ============================================

/**
 * Crée des particules dorées qui pulsent en arrière-plan
 * Désactivé sur mobile pour de meilleures performances
 */
function createGoldenParticles() {
    // Pas de particules sur mobile
    if (isMobile) return;
    
    // Crée un container pour les particules
    const particleContainer = document.createElement('div');
    particleContainer.style.position = 'fixed';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '0'; // Derrière tout
    document.body.appendChild(particleContainer);
    
    // Crée 20 particules avec un délai entre chacune
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createGoldenParticle(particleContainer), i * 500);
    }
}

/**
 * Crée une particule dorée qui pulse
 * @param {HTMLElement} container - Le container où ajouter la particule
 */
function createGoldenParticle(container) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '3px';
    particle.style.height = '3px';
    particle.style.backgroundColor = '#FFD700'; // Or
    particle.style.borderRadius = '50%'; // Rond
    particle.style.boxShadow = '0 0 10px #FFD700'; // Lueur
    particle.style.left = Math.random() * 100 + '%'; // Position X aléatoire
    particle.style.top = Math.random() * 100 + '%'; // Position Y aléatoire
    particle.style.opacity = '0'; // Commence invisible
    
    container.appendChild(particle);
    
    // Animation de pulsation infinie
    particle.animate([
        { opacity: 0, transform: 'scale(0)' },      // Commence invisible et petite
        { opacity: 1, transform: 'scale(1)', offset: 0.1 }, // Apparaît rapidement (10%)
        { opacity: 1, transform: 'scale(1)', offset: 0.9 }, // Reste visible (90%)
        { opacity: 0, transform: 'scale(0)' }       // Disparaît à la fin
    ], {
        duration: 3000 + Math.random() * 2000, // Durée entre 3 et 5 secondes
        easing: 'ease-in-out', // Accélère puis ralentit
        iterations: Infinity // Répète indéfiniment
    });
}

// ============================================
// DÉCOMPTE JUSQU'AU NOUVEL AN 2026
// ============================================

/**
 * Initialise et met à jour le décompte jusqu'au 1er janvier 2026 à minuit
 * Affiche les jours, heures, minutes et secondes restants
 */
function initCountdown() {
    // Date cible : 1er janvier 2026 à minuit (heure locale)
    const targetDate = new Date('2026-01-01T00:00:00');
    
    // Récupère les éléments HTML où afficher le décompte
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const countdownTitle = document.getElementById('countdown-title');
    const countdownDisplay = document.getElementById('countdown-display');
    const newYearMessage = document.getElementById('new-year-message');
    
    // Si les éléments n'existent pas (pas sur la page d'accueil), on arrête
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        return;
    }
    
    // Variable pour savoir si on a déjà célébré le Nouvel An
    let hasCelebrated = false;
    
    /**
     * Crée une explosion massive de confettis pour célébrer le Nouvel An
     */
    function celebrateNewYear() {
        if (hasCelebrated) return; // Ne célèbre qu'une seule fois
        hasCelebrated = true;
        
        const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#DC143C'];
        const confettiContainer = document.querySelector('.confetti-container');
        if (!confettiContainer) return;
        
        // Crée plusieurs explosions depuis différents points de l'écran
        const explosionPoints = [
            { x: window.innerWidth / 2, y: window.innerHeight / 2 }, // Centre
            { x: window.innerWidth / 4, y: window.innerHeight / 4 }, // Haut-gauche
            { x: window.innerWidth * 3 / 4, y: window.innerHeight / 4 }, // Haut-droite
            { x: window.innerWidth / 4, y: window.innerHeight * 3 / 4 }, // Bas-gauche
            { x: window.innerWidth * 3 / 4, y: window.innerHeight * 3 / 4 }, // Bas-droite
        ];
        
        // Explosions multiples avec délais progressifs
        explosionPoints.forEach((point, index) => {
            setTimeout(() => {
                // Plus de confettis pour chaque explosion (50 au lieu de 20)
                const burstCount = isMobile ? 30 : 50;
                
                for (let i = 0; i < burstCount; i++) {
                    const confetti = document.createElement('div');
                    const size = Math.random() * 12 + 6; // Taille entre 6px et 18px
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    
                    const angle = (Math.PI * 2 * i) / burstCount;
                    const velocity = Math.random() * 400 + 200; // Vitesse plus élevée
                    
                    confetti.style.position = 'fixed';
                    confetti.style.width = size + 'px';
                    confetti.style.height = size + 'px';
                    confetti.style.backgroundColor = color;
                    confetti.style.left = point.x + 'px';
                    confetti.style.top = point.y + 'px';
                    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
                    confetti.style.pointerEvents = 'none';
                    confetti.style.zIndex = '10000';
                    
                    confettiContainer.appendChild(confetti);
                    
                    const endX = point.x + Math.cos(angle) * velocity;
                    const endY = point.y + Math.sin(angle) * velocity + 150;
                    
                    confetti.animate([
                        { 
                            transform: 'translate(0, 0) rotate(0deg) scale(1)',
                            opacity: 1
                        },
                        { 
                            transform: `translate(${endX - point.x}px, ${endY - point.y}px) rotate(1080deg) scale(0)`,
                            opacity: 0
                        }
                    ], {
                        duration: 2000 + Math.random() * 1000, // Entre 2 et 3 secondes
                        easing: 'ease-out',
                        fill: 'forwards'
                    }).onfinish = () => confetti.remove();
                }
            }, index * 200); // Délai de 200ms entre chaque explosion
        });
        
        // Affiche le message de félicitations
        if (countdownDisplay && newYearMessage) {
            countdownDisplay.style.display = 'none';
            newYearMessage.style.display = 'block';
            
            // Animation d'apparition du message
            newYearMessage.style.opacity = '0';
            newYearMessage.style.transform = 'scale(0.8)';
            setTimeout(() => {
                newYearMessage.style.transition = 'all 0.8s ease-out';
                newYearMessage.style.opacity = '1';
                newYearMessage.style.transform = 'scale(1)';
            }, 100);
        }
        
        // Change le titre
        if (countdownTitle) {
            countdownTitle.textContent = '🎉 Le Nouvel An est arrivé ! 🎉';
        }
    }
    
    /**
     * Fonction qui met à jour l'affichage du décompte
     */
    function updateCountdown() {
        // Date actuelle
        const now = new Date();
        
        // Calcul de la différence en millisecondes
        const difference = targetDate - now;
        
        // Si la date est passée, on célèbre le Nouvel An
        if (difference <= 0) {
            if (!hasCelebrated) {
                celebrateNewYear();
            }
            daysElement.textContent = '0';
            hoursElement.textContent = '0';
            minutesElement.textContent = '0';
            secondsElement.textContent = '0';
            return;
        }
        
        // Calcul des unités de temps
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Met à jour l'affichage avec un format à 2 chiffres (ex: "05" au lieu de "5")
        daysElement.textContent = String(days).padStart(2, '0');
        hoursElement.textContent = String(hours).padStart(2, '0');
        minutesElement.textContent = String(minutes).padStart(2, '0');
        secondsElement.textContent = String(seconds).padStart(2, '0');
    }
    
    // Met à jour immédiatement au chargement
    updateCountdown();
    
    // Met à jour toutes les secondes
    setInterval(updateCountdown, 1000);
}

// ============================================
// INITIALISATION AU CHARGEMENT
// ============================================

/**
 * Fonction principale qui s'exécute quand le DOM est chargé
 * Lance toutes les animations et effets
 */
document.addEventListener('DOMContentLoaded', () => {
    // Lance toutes les fonctions d'animation
    createConfetti();           // Confettis qui tombent
    animateNavCards();          // Apparition des cartes
    addHoverParticles();        // Étincelles au survol (desktop)
    animateTitle();             // Animation du titre (desktop)
    createSnowEffect();         // Flocons de neige
    animateOnScroll();          // Animations au scroll
    animateCounter();           // Compteur des participants
    createGoldenParticles();   // Particules dorées (desktop)
    initCountdown();            // Décompte jusqu'au Nouvel An 2026
    
    // Effet spécial pour l'événement "minuit" dans le programme
    // Fait pulser la carte toutes les 3 secondes
    const midnightItem = document.querySelector('.timeline-item.highlight');
    if (midnightItem) {
        setInterval(() => {
            midnightItem.style.transform = 'scale(1.02)'; // Agrandit légèrement
            setTimeout(() => {
                midnightItem.style.transform = 'scale(1)'; // Revient à la normale après 200ms
            }, 200);
        }, 3000); // Toutes les 3 secondes
    }
    
    // Message dans la console pour confirmer le chargement
    console.log('🎉 Animations festives chargées ! Bonne année 2026 ! 🎉');
});
