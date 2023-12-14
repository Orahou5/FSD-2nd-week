# TP 4 : API themoviedb

## Liens utiles

* Le site [TheMovieDB](https://www.themoviedb.org/)
* La [documentation](https://developer.themoviedb.org/reference/intro/getting-started)
* [Gestion des images sur l'API](https://developer.themoviedb.org/docs/image-basics)

## Objectifs

* Envoyer des requêtes HTTP vers une api
* Créer des éléments HTML
* Découper le code en fonctions et classes
* Utiliser les mots-clé *async* et *await*

## Instructions

### 1. Création du compte et de la clé API

Sur le site [TheMovieDB](https://www.themoviedb.org/), se créer un compte puis créer une clé API pour pouvoir envoyer des requêtes vers l'api. Cette clé sera utilisée pour chaque requête envoyée.

### 2. Afficher la liste des films

Créer un formulaire avec un champ de recherche. Lorsque ce formulaire est soumis, récupérer la liste des films correspondant à cette recherche depuis l'api.

Lorsque les résultats ont été récupérés, les afficher dans la page (image, titre, description).

### 3. Afficher le reste des pages de la recherche

Une recherche contient en général plusieurs pages. Lorsqu'une recherche a été soumise, il faut afficher la liste de toutes les pages (page 1, page 2, page 3...) au-dessus de l'affichage des résultats. Lorsque je clique sur un numéro de page, ça envoie une requête vers l'api et on récupère les résultats de la page correspondante puis on met à jour l'affichage des films.

### 4. Refactoriser

Essayer de créer des fonctions et des classes dans des fichiers séparés pour rendre le code le plus réutilisable possible.

### BONUS. Ajout en favori

Ajouter un lien sur un film (une icône en forme de coeur par exemple). Lorsque l'on clique dessus, on envoie une requête vers l'api pour ajouter le film en favori (les favoris seront rajoutés au niveau de votre compte themoviedb).