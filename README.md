# Mini-ATS
# Documentation Officielle

1. Présentation du Projet

Mini ATS est une application web interne de suivi des candidatures (Applicant Tracking System).
Elle permet aux recruteurs de centraliser et gérer efficacement le processus de recrutement.

Fonctionnalités principales :

- Gestion des profils des candidats

- Stockage et consultation des CV

- Suivi de l’évolution des candidats dans un pipeline de recrutement

- Centralisation des candidats rejetés dans une banque de CV

L’application vise à offrir une interface claire, moderne et performante pour un usage professionnel interne.

2. Stack Technique
Frontend

- React.js (Vite)

- Tailwind CSS (UI)

- Redux Toolkit (gestion de l’état global)

- React Router DOM (navigation)

- Axios (communication API)


Backend

- Node.js

- Express.js

- MongoDB

- Mongoose

- JWT (authentification)

- Multer (upload de fichiers)

Architecture

- Architecture MERN (MongoDB, Express, React, Node)

- Séparation claire Frontend / Backend

- API REST sécurisée

# Installation du Projet
3. Installation
3.1 Prérequis

- Node.js version 18 ou supérieure

- MongoDB (MongoDB Atlas)

- npm ou yarn

3.2 Installation Backend
- cd backend
- npm install
- npm run dev

3.3 Créer un fichier .env dans le dossier backend :
- PORT=5000
- MONGO_URI=votre mongo_uri
- JWT_SECRET= votre_code
- JWT_REFRESH_SECRET = votre_code
  
- Le backend fonctionne sur http://localhost:5000
  
3.4 Installation Frontend
- cd frontend
- npm install
- npm run dev
- L’application frontend se lancera par défaut sur http://localhost:5173


4. Fonctionnement de l’Application
4.1 Authentification

- Connexion via email et mot de passe

- Génération d’un access token JWT

- Rafraîchissement automatique du token

- Gestion de l’authentification via Redux

4.2 Gestion des Candidats

- Création, modification et suppression de candidats

- Upload et remplacement des CV

- Affichage structuré sous forme de liste

4.3 Pipeline de Recrutement

- Visualisation des candidats par statut

- Organisation en colonnes

- Déplacement par Drag & Drop

- Mise à jour automatique du statut du candidat

4.4 Banque de CV

- Centralisation des candidats rejetés

- Filtrage par date

- Suppression définitive des profils

5. Gestion de l’État (Redux)

- Authentification (utilisateur, tokens, statut)

- Gestion des candidats

- État global partagé entre les composants

- Redux Toolkit est utilisé pour assurer :

  Une architecture prévisible

  Un code maintenable

  Une meilleure gestion des flux de données

6. Design et Interface

- Interface basée sur Tailwind CSS

- Sidebar fixe avec menu burger sur mobile

- Navigation fluide

- Séparation claire entre layout et contenu

- Expérience utilisateur orientée usage professionnel
