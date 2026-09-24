# HCFCED — site associatif et boutiques

Le projet rassemble le site du Haut Conseil des Femmes Cheffes d’Entreprise de la Diaspora et les vitrines de ses entrepreneures.

## Organisation

- `site/index.html` : accueil de l’association, missions, événements et accès aux boutiques.
- `site/boutiques/index.html` : catalogue commun et vitrines filtrées par entrepreneure.
- `site/adhesion.html` : parcours d’adhésion, prêt à recevoir le lien Google Forms.
- `site/assets/catalogue.js` : produits et marques fictifs de démonstration.
- `site/assets/config.js` : lien du futur Google Form.
- `docs/FORMULAIRE_ADHESION.md` : esquisse des questions et étapes de création du formulaire.
- `docs/CONTEXTE.md` : périmètre, source publique et informations à confirmer.
- `.github/workflows/pages.yml` : publication automatique du dossier `site/`.
- `Code_source_HCFCED/` et `Code_source_Boutique_HCFCED/` : exports originaux conservés ; travailler désormais dans `site/`.

## Consulter localement

Depuis la racine du projet :

```sh
python -m http.server 8000 --directory site --bind 127.0.0.1
```

Ouvrir `http://localhost:8000`. Les fichiers HTML peuvent aussi être ouverts directement dans un navigateur.

## Boutiques

Chaque marque du catalogue possède une adresse partageable, par exemple :

`boutiques/index.html?boutique=Amina%20Cr%C3%A9ations#catalogue`

Pour ajouter une marque à la démonstration, ajouter ses produits dans `site/assets/catalogue.js` avec un identifiant numérique unique, son nom dans `seller`, une catégorie existante et un prix numérique. La liste des boutiques se met à jour automatiquement. Garder exactement le même nom pour les produits d’une marque.

Il s’agit de vitrines statiques : pas encore de compte vendeuse, de création autonome de boutique, de gestion des stocks ni de paiement. Les noms, produits et prix sont des exemples hérités de la maquette. La vente réelle sera un chantier distinct, avec les modalités de chaque entrepreneure ; des liens vers leurs boutiques existantes pourront aussi être ajoutés.

## Google Forms

Le formulaire doit être créé dans le compte Google choisi par l’association à partir de l’esquisse. Coller ensuite son lien public HTTPS dans `adhesionFormUrl` de `site/assets/config.js`. Tant que ce lien n’est pas renseigné, la page indique clairement que les inscriptions ne sont pas ouvertes. Ne jamais déposer les réponses dans ce dépôt.

## GitHub Pages

Dépôt indiqué : https://github.com/Jean-Aristid/SITE_HCFCED

Dans **Settings → Pages → Build and deployment**, sélectionner **GitHub Actions**. Le workflow publie uniquement `site/` après chaque push sur `main`, ou sur lancement manuel depuis l’onglet Actions.

Adresse attendue après un premier déploiement réussi : https://jean-aristid.github.io/SITE_HCFCED/

Les modifications locales deviennent visibles en ligne après leur envoi sur GitHub et la fin du déploiement ; ce n’est pas une synchronisation instantanée du dossier de l’ordinateur. Les documents internes et exports originaux ne font pas partie du site publié, mais resteraient visibles dans un dépôt public.

Documentation : https://docs.github.com/fr/get-started/start-your-journey/deploying-your-website-automatically

## Vérification

```sh
python scripts/check_site.py
node scripts/check_ui.cjs
```

Le contrôle des chemins, images et ancres est aussi exécuté avant publication.
