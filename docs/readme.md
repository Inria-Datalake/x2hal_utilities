Vous trouverez ici des outils pour préparer l'import via x2Hal (x2hal.inria.fr)
1. Une page web pour faire la vérification de la structure bibteX et des champs obligatoires à cette adresse : https://inria-datalake.github.io/x2hal_utilities/. Vous pouvez également télécharger les fichiers suivants dans un même répertoire :
- structure_bib.js : contrôle la conformité du bibteX - lancé par le bouton "Vérifier structure"
- champ_oblig_x2hal.js : contrôle des champs obligatoire (javascript) - lancé par le bouton "Vérifier champs"
- docTypeUi.js : info sur les champs obligatoires par types de doc (javascript) - actionné par sélection de la liste déroulante sur la droite sous "Pour votre information"
- x2hal_utilities.css : met en forme la page html
- index.html : la page principale à partir de laquelle s'effectuent toutes les actions
Une fois les fichiers téléchargés, ouvrez "index.html" et vous pourrez fonctionner sans connexion internet.

4. script (Obsolète. Télécharger depuis : https://github.com/Inria-Datalake/x2hal_utilities/blob/main/Verif4x2Hal.ipynb , mettre à jour et lancer sur un Jupyter Notebook) qui vérifie la structure du .bib, les champs obligatoires et les ajoute (il faudra ensuite compléter avec les bonnes valeurs). Attention, le script n'est plus mis à jour depuis avril 2026.

