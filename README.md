# Portfolio — Abderrahmane Bouleknadel

Portfolio personnel en React + Vite + Tailwind CSS v4.

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvre l'URL affichée (en général http://localhost:5173).

## Build de production

```bash
npm run build
```

Le site statique est généré dans le dossier `dist/`.

## Héberger gratuitement (recommandé : Vercel)

### Option 1 — Vercel (le plus simple)
1. Va sur https://vercel.com et connecte-toi avec GitHub.
2. Pousse ce projet sur un repo GitHub (`git init`, `git add .`, `git commit -m "init"`, `git push`).
3. Sur Vercel, clique "Add New Project", sélectionne ton repo.
4. Vercel détecte automatiquement Vite — clique "Deploy".
5. En ~1 minute tu as une URL du type `ton-portfolio.vercel.app` à mettre dans tes candidatures.

### Option 2 — Netlify
1. Va sur https://app.netlify.com
2. "Add new site" → "Deploy manually" → glisse-dépose le dossier `dist/` (après avoir fait `npm run build`).
3. Tu obtiens une URL immédiatement.

### Option 3 — GitHub Pages
1. `npm install -D gh-pages`
2. Ajoute dans `package.json` : `"homepage": "https://<ton-user>.github.io/<repo>"` et un script `"deploy": "gh-pages -d dist"`.
3. `npm run build && npm run deploy`.

## Pages

Le site est un build Vite **multi-pages** (pas de routeur côté client) : chaque URL est un vrai fichier HTML statique, donc aucune règle de réécriture n'est nécessaire chez l'hébergeur.

| URL                | Fichier HTML                  | Contenu |
|--------------------|-------------------------------|---------|
| `/`                | `index.html`                  | Page principale concise : hero 3D, about (+ 4 certifications phares), expérience, 4 projets en études de cas, « Comment je construis des produits IA », stack, contact |
| `/projects/`       | `projects/index.html`         | Archive de **tous** les projets (tableau, chaque ligne s'ouvre sur l'étude de cas complète) |
| `/certifications/` | `certifications/index.html`   | Les 12 certifications avec leurs liens de vérification |

Chaque HTML déclare sa page via `<div id="root" data-page="...">` ; `src/main.jsx` charge la page correspondante à la demande (les pages secondaires n'embarquent pas Three.js). Pour ajouter une page : créer `<nom>/index.html`, l'ajouter dans `build.rollupOptions.input` de `vite.config.js` et dans l'objet `pages` de `src/main.jsx`.

Les CV téléchargeables sont dans `public/cv/` (menu « Download CV » dans la navbar et la section Contact).

## Images & icônes

- **Photo de profil** : une seule image source, `public/profile.jpg` (carré 512 px), référencée via `profilePhoto` dans `src/data.js` et affichée par `components/ProfilePhoto.jsx` (navbar + section About). Pour la changer, remplace simplement le fichier.
- **Favicon** : `public/favicon.svg` (monogramme « AB »), `public/favicon.ico` (16/32/48 px) et `public/apple-touch-icon.png` (180 px), référencés dans les 3 fichiers HTML.
- **Logos des technologies et des organismes** : package `react-icons` (Simple Icons en priorité ; Font Awesome / Grommet / Remix pour Java, AWS, Oracle et OpenAI, retirés de Simple Icons). Le mapping est dans `skillItems` et `issuers` (`src/data.js`) ; une entrée sans `icons` affiche son badge texte `short` (RAG, LangSmith, ChromaDB, OpenClassrooms, MOOC Gestion de Projet).

## Personnaliser le contenu

Tout le contenu (nom, projets, certifications, compétences, liens) est centralisé dans `src/data.js` — modifie ce fichier pour mettre à jour le site sans toucher aux composants.

- **Projets** : ajouter une entrée dans `projectMeta` (titre, année, stack, `repo` ou `null` si code privé, `featured`) + son texte dans `en.projects` / `fr.projects` (problème, rôle, décisions, résultat). Seuls les projets `featured: true` (5 max) apparaissent sur l'accueil ; tous apparaissent dans `/projects/`.
- **Certifications** : ajouter une entrée dans `certificationList` (date au format `AAAA-MM`, `url` optionnelle). Le champ `featured` (1, 2, 3…) définit celles affichées sur l'accueil et leur ordre.

## Structure

```
index.html                 → page principale
projects/index.html        → archive des projets
certifications/index.html  → toutes les certifications
public/cv/                 → CV PDF téléchargeables
public/profile.jpg         → photo de profil
public/favicon.*           → favicon (svg + ico) et apple-touch-icon.png
src/
  main.jsx                 → choisit la page selon data-page
  App.jsx                  → page principale (assemble les sections)
  data.js                  → tout le contenu (profil, projets, certifications, skills...)
  components/
    Layout.jsx             → navbar + footer communs à toutes les pages
    Navbar.jsx
    ProfilePhoto.jsx       → photo ronde (source unique public/profile.jpg)
    BrandMark.jsx          → pastille logo officiel / initiales (skills, certifications)
    CvMenu.jsx             → bouton « Download CV » avec les 2 variantes
    Hero.jsx / Scene3D.jsx → section d'accueil avec la scène 3D (laptop + cartes)
    About.jsx
    Experience.jsx
    Projects.jsx           → projets phares + lien vers l'archive
    ProjectCaseStudy.jsx   → bloc problème → rôle → décisions → résultat (accueil + archive)
    AiApproach.jsx         → « Comment je construis des produits IA »
    Skills.jsx
    Contact.jsx
    Footer.jsx
  pages/
    PageHeader.jsx         → en-tête commun des pages secondaires
    ProjectArchive.jsx
    CertificationsPage.jsx
```
