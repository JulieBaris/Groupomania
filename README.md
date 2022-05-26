# p7_groupomania_120422
 reseau_social

//_____________________Connexion au serveur_________________//
1) sur le dossier frontend, avec la commande - npm start ;
2) sur le dossier sequelize-app, avec la commande - nodemon app ;
Peut être y aura-t-il besoin de faire un "npm init" pour que les modules puissent se lancer

3) accès à base de donnée MySql pour la chargée de communication  
userName : communication_groupomania ;
password : ************ (voir avec le développeur).

4) Login personnalisé pour l'administrateur
userName : AdminGroupomania
email : groupomania@admin.com
password : AdminGroupomania22

// ______________ Inscription et connexion au réseau social_____________//
1) Signup : remplir tous les champs pour créer un utilisateur ;
2) Login : remplir les champs pour se connecter à son compte.
Pour faciliter la démonstration, un utilisateur a été créé : 
userName : Démo
email : demo@test.com
password : DeMo01

// __________________Page HOME_____________//
1) Icone dans le header pour se déconnecter :
2) Lien vers la page Contacts ;
3) Lien vers la page Articles ;
3) Lien vers la page Compte.

  //____ Page "Contacts" ____//
  L'utilisateur voit les fiches profils de ses collègues : 
    - possibilité de consulter l'ensemble des profils ;
  
  // ____Page "Articles" ____//
  L'utilisateur voit l'ensemble des articles publiés classés du plus récents au plus ancien :
    - possibilité de faire une recherche via la barre de recherche pour trouver un article grâce à son titre ;
    - possibilité pour l'auteur de la publication de modifier son article en cliquant sur l'icône stylo ;
    - depuis la page modification, l'auteur est en capacité de supprimer son article et les commentaires qui y son liés.
  
  // ____Page "Compte"____//
    - Possibilité d'accèder à son profil
    - de configurer son profil
    - de supprimer son profil. 



 __ impossibilité pour le moment d'afficher les commentaires liés aux articles ou de commenter l'article
 __ impossibilité pour le moment de cacher la possibilité de modifier un article aux utilisateurs qui ne l'ont pas créé
 __ impossibilité de faire fonctionner les boutons like et dislike --> suppression du modèle, des routes etc.
 _ impossibilité de modifier les articles en cliquant sur l'icône stylo et en suivant les instructions
