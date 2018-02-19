# 🔥 Playlit 🔥

### Prérequis
- Git [Windows](http://www.git-scm.com/book/en/Getting-Started-Installing-Git#Installing-on-Windows), [Mac](http://www.git-scm.com/book/en/Getting-Started-Installing-Git#Installing-on-Mac), [Linux](http://www.git-scm.com/book/en/Getting-Started-Installing-Git#Installing-on-Linux)
- [Node.js](https://nodejs.org/en/) (version LTS recommandé)

Vérifier que Node est installé avec la commande:
```bash
node -v
```
Vérifier que Node est installé avec la commande:
```bash
npm -v
```
### Installation
```bash
npm install
```
### Utilisation
```bash
npm start
```
### Team ubeat-a17-06

| Prénom | Nom | Matricule | IDUL |
|--------|-----|-----------|------|
| Alexandre | Brillant | 111 134 114 | ALBRI51 |
| Pierre-Antoine | Boutin-Panneton | 111 129 079 | PABOP3 |
| Ian | Bouchard | 111 154 958 | IABOU5 |
| Ian | Letourneau | 111 040 409 | IALET |
| Simon | Dulude | 111 100 228 | SIDUL|
| Simon | Thiboutôt | 111 115 417 | SITHI28 |

### Fonctionnement

#### Routes

* `/home` ou `/` - Page d'accueil avec une liste d'artistes à découvrir
* `/artist/<artistId>` - Page d'un artiste. Exemple: `/artist/1093360`
* `/albums` - Page de recherche d'un album
* `/album/<collectionId>` - Page d'un album. Exemple: `/album/1207509583`
* `/album/<collectionId>/buy` - Page d'achat d'un album. Exemple: `/album/1207509583/buy`
* `/artists` - Page de recherche d'un artiste
* `/playlists` - Page des playlists de l'utilisateur
* `/playlists/new` - Page de création d'une playlist de l'utilisateur
* `/playlists/<playlistId>` - Détails d'une playlist. Exemple: `/playlists/5a090b3a24fb190004ee16d0`
* `/playlists/<playlistId>/edit` - Modification du nom d'une playlist. Exemple: `/playlists/5a090b3a24fb190004ee16d0/edit`
* `/settings` - Page avec les informations de l'utilisateurs
* `/signup` - Page de création de compte utilisateur
* `/login` - Page d'authentification de l'
* `/logout` - Route qui redirige au login
* `/search` - Route qui permet la recherche d'un element
* `/tracks` - Page de recherche d'une chanson
* `/users` - Page de recherche d'un utilisateur


#### Navigation

- Le menu de navigation peut être dévoilé/caché en cliquant sur le bouton bouton en haut à gauche de l'application.
Il contient des liens pour aller sur la page d'accueil, de playlists et les settings.
- Une barre de recherche se trouve dans le haut du site.
- La page de profil et le bouton pour se déconnecter se trouve en haut à droite du site, en cliquant sur l'avatar de l'utilisateur.
- Fonctionnalitées avancées: Gravatar, recherche auto-complétion et meilleur prix pour achat
