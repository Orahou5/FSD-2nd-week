# TP 3 : AJAX et API REST

## Objectif

Apprendre/Approfondir l'envoi de requêtes HTTP vers des API REST au travers de divers exercices.

Pour chaque exercice, créer un nouveau dossier (tp3.1, tp3.2, tp3.3...) avec un fichier *index.html* et un fichier *main.js*.

## Instructions

### TP3.1 : api kaamelott

[Documentation API](https://github.com/A3lfyr/kaamelott-api)

Créer un bouton "Afficher une citation aléatoire". Lorsque l'on clique sur ce bouton, on envoie une requête vers l'api et on récupère une citation aléatoire. Lorsque la citation est récupérée, on affiche le contenu de la citation dans un élément *p* sur la page web ainsi que le personnage.

### TP3.2 : api découpage administratif

[Documentation API](https://geo.api.gouv.fr/decoupage-administratif)

Créer sur la page web 2 menus déroulants "Régions" et "Départements", 1 bouton "Afficher les villes" et 1 liste non ordonnée.

Lors du chargement de la page, envoyer une requête vers l'api pour récupérer la liste de toutes les régions. Lorsque les régions sont récupérées, mettre à jour le menu déroulant "Régions" avec les données récupérées.

Lorsque l'on sélectionne une région dans le menu déroulant, envoyer une requête vers l'api pour récupérer la liste de tous les départements de la région sélectionnée. Lorsque les départements sont récupérés, mettre à jour le menu déroulant "Départements" avec les données récupérées.

Lorsque l'on clique sur le bouton "Afficher les villes", envoyer une requête vers l'api pour récupérer toutes les villes du département sélectionné. Lorsque les villes sont récupérées, les afficher dans une liste html.

### TP3.3 : api adresse

[Documentation API](https://adresse.data.gouv.fr/api-doc/adresse)
[Géolocalisation](https://developer.mozilla.org/fr/docs/Web/API/Geolocation_API)

Créer un bouton "Afficher mon adresse". Lorsque l'on clique sur ce bouton, géolocaliser l'utilisateur avec les fonctions natives du js, lorsque l'on a récupéré la latitude et la longitude de l'utilisateur, envoyer une requête vers l'api pour récupérer l'adresse correspondant à cette latitude et longitude. Afficher ensuite l'adresse dans un paragraphe html.

Avec cette latitude et longitude, envoyer également une requête vers l'api [Découpage administratif](https://geo.api.gouv.fr/decoupage-administratif/communes) pour récupérer des informations sur la ville (nom, codes postaux, population municipale, surface en hectare) de l'utilisateur géolocalisé.

### TP3.BONUS: api pokemon

[Documentation API](https://pokeapi.co/docs/v2)

Au chargement de la page, récupérer la liste de tous les pokemons (nom, image, types) avec une pagination (page 1 : 20 premiers, page 2 : 20 suivants...).