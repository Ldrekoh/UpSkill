⚡️ SkillSwap Project

Bienvenue sur la plateforme d'échange de compétences nouvelle génération. Ce projet est propulsé par Next.js 16, Drizzle ORM et Better Auth.
🚀 Démarrage Rapide

1. Installation

Clone le dépôt et installe les dépendances :
Bash

git clone <https://github.com/Ldrekoh/UpSkill.git>
cd <UpSkill>
npm install

2. Configuration de l'environnement

Crée un fichier .env.local à la racine du projet et ajoute les variables suivantes :
Extrait de code

# Database Neon

DATABASE_URL="votre_url_de_base_de_donnees"

# Better Auth Configuration

BETTER_AUTH_SECRET="votre_secret_généré"
BETTER_AUTH_URL="http://localhost:3000"

# Autres variables (si nécessaire)

# NEXT_PUBLIC_APP_URL="http://localhost:3000"

    Note : Vous pouvez générer un secret pour BETTER_AUTH_SECRET en utilisant la commande openssl rand -base64 32.

3. Base de données

Préparez votre base de données avec Drizzle :
Bash

npx drizzle-kit push # Pour pousser le schéma directement

# ou

npx drizzle-kit generate
npx drizzle-kit migrate

4. Lancement

Lancez le serveur de développement :
Bash

npm run dev

Ouvrez http://localhost:3000 pour voir le résultat.
🛠 Stack Technique

    Framework : Next.js 15 (App Router)

    Auth : Better Auth

    ORM : Drizzle ORM

    Styling : Tailwind CSS + Shadcn/UI

    Validation : Zod + React Hook Form

📖 Fonctionnalités Clés

    Système d'Escrow : Les tokens sont sécurisés jusqu'à la fin de la session.

    Validation Mentor : Le mentor doit accepter manuellement les demandes.

    Auto-Release : Protection du mentor si l'élève oublie de valider la session.

    UI Adaptive : Design soigné avec gestion des états connectés/déconnectés.

🏗 Structure du projet

    /app : Routes et pages Next.js.

    /components : Composants UI réutilisables (Client & Server).

    /db : Schémas Drizzle et configuration de la base de données.

    /server : Server Actions pour la logique métier (Bookings, Skills, Users).

    /lib : Utilitaires et schémas de validation Zod.

🌐 Déploiement

La façon la plus simple de déployer est d'utiliser la plateforme Vercel :

    Poussez votre code sur GitHub.

    Importez le projet sur Vercel.

    Configurez les mêmes variables d'environnement que dans votre .env.local.
