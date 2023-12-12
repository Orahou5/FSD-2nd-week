# TP 2 : Painter

## Objectif

Réaliser une application permettant de dessiner avec canvas. Il faudra essayer de découper au mieux l'application en différents fichiers, fonctions et classes.

## Rendu

* Déposer le code de l'exercice sur l'ide
* Ou bien créer un dépôt github pour l'exercice
* Remplir le google docs avec l'url de votre ide ou l'url de votre github

[Lien google doc]()

### Dépôt du code sur l'ide

* Si ce n'est pas déjà fait, démarrer l'ide en ligne (https://pseudo3WA.ide.3wa.io/ide.html ou aller sur https://home.3wa.io/wecode puis cliquer sur "Démarrer")
* Créer un dossier "tp2" dans le dossier "sites"

## Instructions

### 1. Mise en place de la page web

Créer un fichier *index.html* qui contiendra un élément *canvas* de 800 par 600. Créer des éléments (div ou span) de différentes couleurs (cf painter.png), un input type range et un bouton pour effacer.

### 2. Dessin sur le canvas

Lorsque l'on se déplace sur le canvas on va créer plusieurs segments qui vont permettre de réaliser un tracé. Il faudra récupérer la position de la souris par rapport au canvas pour pouvoir dessiner au bon endroit. Le dessin doit se faire uniquement si l'on appuie sur la souris. Si l'on n'appuie pas le tracé s'arrête.

### 3. Modification de la couleur et de l'épaisseur

Lorsque l'on clique sur une "pastille de couleur" on modifie la couleur pour le prochain tracé. Lorsque l'on change la valeur de l'input on modifie l'épaisseur du prochain tracé.

### 4. Suppression du dessin

Lorsque l'on clique sur le bouton "Effacer", cela efface tout le canvas.

### BONUS. Ajouter des rectangles

Création une option qui permet de changer de mode (on ne réalise plus des tracés mais on génère des rectangles à l'endroit où l'on clique)

### BONUS 2. Enregistrement du dessin

Ajouter un bouton qui permet d'enregistrer le dessin effectué.

### BONUS++. Envoi du dessin en ajax

Envoyer le dessin qui a été effectué vers le serveur à l'aide d'une requête HTTP. Lorsque l'on va sur la page du serveur, cela affiche une galerie de toutes les images sauvegardées.