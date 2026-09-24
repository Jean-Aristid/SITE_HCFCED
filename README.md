# Site du Haut Conseil — HCFCED

Site autonome de l’association : présentation, missions, événements et demande d’adhésion. Ce site ne contient aucun lien vers la boutique.

- Site : https://jean-aristid.github.io/SITE_HCFCED/
- Dépôt : https://github.com/Jean-Aristid/SITE_HCFCED

## Fichiers à modifier

| Contenu | Fichier |
| --- | --- |
| Présentation et navigation | `index.html` |
| Page d’adhésion | `adhesion.html` |
| Apparence de l’accueil | `assets/css/main.css` |
| Apparence de l’adhésion | `assets/css/adhesion.css` |
| Menu de navigation | `assets/js/main.js` |
| Bannière des membres | `assets/images/membres_haut_conseil-1.jpeg` |
| Logo | `assets/images/logo_hcfced.jpg` |
| Affichage du logo et de la bannière | `assets/css/identity.css` |
| Lien du Google Form | `assets/js/config.js` |
| Activation du bouton d’adhésion | `assets/js/adhesion.js` |
| Esquisse du formulaire | `docs/FORMULAIRE_ADHESION.md` |
| Contexte et contenu à valider | `docs/CONTEXTE.md` |

Les pages utilisent des styles distincts car elles ont des compositions différentes. Les styles ne sont plus intégrés dans les fichiers HTML.

## Consulter et vérifier

Depuis ce dossier :

```sh
python -m http.server 8000 --bind 127.0.0.1
node scripts/check.cjs
```

Ouvrir http://localhost:8000. Les fichiers HTML peuvent également être ouverts directement dans le navigateur.

## Publication

Le dépôt de ce dossier est relié à `SITE_HCFCED`. Un push sur `main` déclenche `.github/workflows/pages.yml`, qui vérifie le formulaire puis publie uniquement les fichiers HTML et `assets/`, rassemblés dans un dossier temporaire `_public/`.

Dans **Settings → Pages**, sélectionner **GitHub Actions**. Aucun code de la boutique ni document interne n’est publié dans le site associatif.

Le site est indépendant : son déploiement et ses ressources ne dépendent d’aucun autre projet.

## État de la démonstration

Textes, départements, agenda et informations officielles restent à valider. Le formulaire Google n’est pas encore créé ; son esquisse est dans `docs/`. Renseigner son URL publique dans `assets/js/config.js` pour activer le bouton. Les réponses sont conservées dans Google Forms, jamais dans Git.
