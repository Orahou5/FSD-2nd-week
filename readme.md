# TP 1 : Liste de tâches

## Rendu

* Déposer le code de l'exercice sur l'ide
* Ou bien créer un dépôt github pour l'exercice
* Remplir le google docs avec l'url de votre ide ou l'url de votre github

[Lien google doc]()

### Dépôt du code sur l'ide

* Si ce n'est pas déjà fait, démarrer l'ide en ligne (https://pseudo3WA.ide.3wa.io/ide.html ou aller sur https://home.3wa.io/wecode puis cliquer sur "Démarrer")
* Créer un dossier "tp1" dans le dossier "sites"

## Instructions

### 1. Tableau des tâches

* Créer un tableau d'objets *tasks* contenant les propriétés suivantes : title et priority
* Au chargement de la page, afficher toutes ces tâches dans une liste html
* Chacune des tâches affichera le titre, la priorité et contiendra une checkbox
* Lorsque la priorité de la tâche est 1 (haute) le titre de la tâche s'affiche en rouge
* Lorsque la prioriété de la tâche est 2 (normale) le titre de la tâche s'affiche en bleu
* Lorsque la priorité de la tâche est 3 (faible) le titre de la tâche s'affiche en vert

### 2. Ajouter une nouvelle tâche

Créer un formulaire pour ajouter une nouvelle tâche au tableau. Lorsque l'on valide le formulaire, la tâche créée est ajoutée au tableau des tâches et on mettra à jour la liste dans le html à partir du tableau contenant la nouvelle tâche.

### 3. Cocher une tâche

Lorsque la tâche a été cochée, il faut que le texte de cette dernière soit barré.

### 4. Suppression de toutes les tâches

Créer un bouton "Supprimer toutes les tâches terminées". Lorsque l'on clique sur ce bouton, toutes les tâches qui sont cochées doivent être supprimées du tableau et on mettra à jour la liste html avec le tableau. Une notification apparaîtra en haut de la liste pour indiquer le nombre de tâches qui ont été supprimées.

### BONUS. Persistance des tâches

Lorsque l'on réactualise, toutes les tâches créées sont supprimées. Utiliser le *localstorage* pour conserver les tâches créées.