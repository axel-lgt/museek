# :musical_note: Bienvenue sur le dépot de Museek ! :notes:
🚀 Version 1.0 ([English](https://github.com/axel-lgt/museek/blob/master/README.md), [Français](https://github.com/axel-lgt/museek/blob/master/README.fr.md))

Museek est un petit projet qui vous permet de rechercher les paroles de vos musiques préférées ! Entièrement conçu avec **JavaScript** et alimenté par l'**API de Genius** et **Node.js**, j'ai réalisé ce petit projet en cinq jours.

![Size](https://github-size-badge.herokuapp.com/axel-lgt/museek.svg)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) 
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

## Technologies
Afin de pouvoir créer ce projet, j'ai utilisé les technologies suivantes:


### Front-end
- HTML
- CSS
- JavaScript
- Axios
- API Genius de [Rapidapi](https://rapidapi.com/brianiswu/api/genius)

### Back-end
- NPM
- Node.js
- Express
- Cors
- JSDOM
- Dotenv
- Heroku

## Hiérarchie des fichiers
Le front-end et le back-end sont déployés séparément. Le front-end est hébergé via [Github Pages](https://pages.github.com) tandis que le back-end est déployé sur [Heroku](https://www.heroku.com).

### Front-end
Les fichiers à la racine sont les fichiers front-end. Dans **index.js**, vous pouvez voir l'entièreté du code front-end qui gère la barre de recherche, les requêtes à l'API et comment afficher les données. J'ai fait attention d'ajouter quelques commentaires dans mon code afin qu'il soit plus lisible et compréhensible.

Tout l'affichage a été réalisé en CSS pure dans le fichier **index.css**. J'ai aussi fait le design responsive avec une media query. L'affichage a été fait en **mobile first** et la media query a géré une viewport de bureau.

### Back-end
Dans le dossier **server**, le fichier **server.js** gère toutes les données. Utiliser un serveur Express a été très simple même si je n'y étais pas habitué. Le front-end envoie une requête au serveur avec deux paramètres (l'URL de l'API et la recherche utilisateur ou l'ID de la chanson). Le serveur reçoit et gère la requête avant d'envoyer une autre requête à l'API de Genius grâce aux paramètres passés par la requête front-end. Même si je pouvais gérer la plupart des requêtes dans le fichier du front-end, j'ai dû créer un serveur afin de pouvoir contourner les rejets de CORS.

Afin de faires les requêtes des paroles et des descriptions du site de Genius, j'ai utilisé le module JSDOM qui m'a permis d'analyser les éléments HTML dans Node.js

## Résolution de problèmes
En faisant ce projet entièrement seul, j'ai rencontré quelques difficultés. J'ai pris le temps de les écrire dans un [fichier Notion](https://blue-tank-59c.notion.site/Journal-30c9adb8e2ed429eb0f87f2148156cad)(en anglais).

Merci d'avoir regardé mon travail, ce n'est que le début... 👀
