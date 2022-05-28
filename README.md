# p7_groupomania_120422
 reseau_social

//_____________________Connexion au serveur_________________//
1) sur le dossier frontend, avec la commande - npm start ;
2) sur le dossier sequelize-app, avec la commande - nodemon app ;
Peut être y aura-t-il besoin de faire un "npm install" pour que les modules puissent se lancer

3) Les identifiants de la base de données MySQL : 
DB_USERNAME='root'
DB_PASSWORD=']-s*U5x7X2Ud'
DB_HOST='localhost'
DB_Name='groupomania'
SECRET_KEY='SECRET_KEY_123'

4) accès à base de données MySql pour la chargée de communication  
userName : communication_groupomania ;
password : ************ (voir avec le développeur).

5) Login personnalisé pour l'administrateur
userName : Admin Groupomania
email : groupomania@admin.com
password : AdminGroupomania22

// ______________ Inscription et connexion au réseau social_____________//
1) Signup : remplir tous les champs pour créer un utilisateur ;
2) Login : remplir les champs pour se connecter à son compte.
Pour faciliter la démonstration, un utilisateur a été créé : 
userName : Démo
email : demo@test.com
password : DeMo01
3) Administrateur : dédié à l'administrateur du site, pour la connexion, se référer aux informations indiquées précédemment.

// __________________Page HOME_____________//
1) Icone dans le header pour se déconnecter :
2) Lien vers la page Contacts ;
3) Lien vers la page Articles ;
3) Lien vers la page Compte.

  //____ Page "Contacts" ____//
  L'utilisateur voit les fiches profils de ses collègues : 
    - possibilité de consulter l'ensemble des profils ;
  L'administrateur est en capacité de supprimer un profil.
  
  // ____Page "Articles" ____//
  L'utilisateur voit l'ensemble des articles publiés, classés du plus récent au plus ancien :
    - possibilité de publier un article via l'onglet "publier";
    - possibilité de commenter un article ;
    - possibilité d'accéder à la page "Mes articles" :
        - possibilité pour l'auteur de la publication de modifier son article en cliquant sur l'icône stylo ;
        - possibilité de supprimer son article ou l'ensemble de ses articles.
  L'administrateur peut supprimer un article.
  
  // ____Page "Compte"____//
    Possibilité d'accéder à son profil :
    - de configurer son profil ;
    - de supprimer son profil ;
    - les articles et commentaires liés seront également supprimés.
