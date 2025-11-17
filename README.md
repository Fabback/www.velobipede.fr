# :bike: [Le Velobipede](https://www.velobipede.fr) :bike:

Atelier ambulant de réparation de cycles sur Le Mans. Réparation, entretiens, montages complets ou partiels, coaching pour vous accompagner dans votre pratique du vélo

## Objet

Réintégration du site depuis simple site vitrine html/CSS vers framework React ([Next.js](https://nextjs.org) via [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app))

### Startup template

- Next.js (version évolutive)
- Typescript
- ESLint
- TailwindCSS

### Objectifs

#### 0.0

- [x] Initial commit / empty
- [x] Définition objectifs initiaux

#### 0.9

- [x] Transformation ancienne trame en composants React

#### 1.0

- [ ] Ajout formulaire de contact
  - [ ] Validation formulaire
    - [x] Securisation appel formulaire (ex: captcha)
    - [ ] Interaction DB pour enregistrement saisie
    - [ ] Envoi formulaire par email

#### 1.1

- [ ] Définition droits (roles / actions)
- [ ] Ajout back
  - [ ] Route privée
    - [ ] Login / Logout...
    - [ ] Dashboard initial layout
  - [ ] Gestion appels authentifiés (API, Server Actions)
  - [ ] Gestion media / upload bucket S3 (Backblaze) avec preauth
  - [ ] Gestion produit
  - [ ] \(OPTIONNEL) Gestion catalogue ?
- [ ] Ajout front
  - [ ] Catalogue (vélo seuls pour commencer)
  - [ ] Menu navigation
