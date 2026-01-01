# 🏛️ Land Registry DApp - Frontend

Interface utilisateur moderne pour le système de Cadastre Décentralisé basé sur la Blockchain Ethereum.
Cette application permet aux utilisateurs d'enregistrer des terrains, de visualiser leurs titres fonciers et de transférer des propriétés en toute sécurité.

---

## 📋 Fonctionnalités

* **Authentification Sécurisée** : Inscription et Connexion (JWT) avec adaptation des champs pour le backend existant.
* **Tableau de Bord (Dashboard)** : Visualisation des titres fonciers sous forme de cartes avec image, localisation et propriétaire.
* **Dépôt de Dossier** : Formulaire complet pour soumettre un nouveau terrain (Upload d'image, description, géolocalisation).
* **Transfert de Propriété** : Interface modale pour initier un transfert de propriété vers un autre portefeuille.
* **Vérification** : Outil de recherche pour vérifier l'authenticité d'un titre foncier.
* **Design Responsive** : Interface adaptée (Thème Gris/Bleu) conforme aux maquettes visuelles.
* **Feedback Utilisateur** : Modales de succès (Vert) et d'échec (Rouge) pour les transactions.

---

## 🛠️ Stack Technique

* **Framework** : [React.js](https://reactjs.org/) (Vite)
* **Langage** : JavaScript (ES6+)
* **Routing** : React Router DOM
* **Requêtes HTTP** : Axios
* **Style** : CSS3 (Variables CSS, Flexbox)
* **Gestion d'état** : React Context API (AuthContext)

---

## 🚀 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

1.  **Node.js** (v14 ou supérieur)
2.  **npm** (ou yarn)
3.  **Le Backend API** doit être lancé sur le port `3002`.

---

## 📦 Installation

1.  **Cloner le projet** (si ce n'est pas déjà fait) :
```bash
    git clone https://github.com/votre-repo/land-registry-frontend.git
    cd land-admin-frontend
```

2.  **Installer les dépendances** :
```bash
    npm install
```
    *Cela installera `react`, `react-router-dom`, `axios`, `jwt-decode`, etc.*

---

## ⚙️ Configuration

L'application est configurée pour se connecter à l'API locale par défaut.

Si vous devez changer l'adresse du backend, modifiez le fichier :
📂 **`src/utils/api.js`**

```javascript
// Modifiez cette ligne si votre backend est hébergé ailleurs
const API_URL = "http://localhost:3002";
```

## ▶️ Démarrage

Pour lancer l'application en mode développement :
Bash

npm run dev

L'application sera accessible sur : http://localhost:5173 (ou le port indiqué par Vite).
## 📂 Structure du Projet
```plaintext
src/
├── assets/          # Images et ressources statiques
├── components/      # Composants réutilisables
│   ├── Navbar.jsx   # Barre de navigation (Gestion état connecté/déconnecté)
│   └── Footer.jsx   # Pied de page (Copyright & Smart Contract)
├── context/         # Gestion globale de l'état
│   └── AuthContext.jsx # Gestion du Token JWT et User
├── pages/           # Pages principales de l'application
│   ├── Home.jsx     # Accueil & Recherche
│   ├── Login.jsx    # Formulaire de connexion
│   ├── Register.jsx # Formulaire d'inscription (Mapping DB)
│   ├── Dashboard.jsx# Liste des terrains & Transfert
│   ├── Depot.jsx    # Création de titre foncier
│   └── Verification.jsx # Page de recherche dédiée
├── utils/           # Utilitaires
│   └── api.js       # Configuration Axios (Intercepteurs)
├── App.css          # Styles globaux (Thème Gris/Bleu)
├── App.jsx          # Router principal & Layout
└── main.jsx         # Point d'entrée React

```