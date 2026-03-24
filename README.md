# ⚡ SkillSwap

> **La plateforme d'échange de compétences nouvelle génération.**
> Connecte mentors et apprenants via un système de tokens sécurisé, une validation manuelle et une UI pensée pour l'expérience.

---

## 🛠 Stack Technique

| Couche           | Technologie              |
| ---------------- | ------------------------ |
| Framework        | Next.js 15 (App Router)  |
| Authentification | Better Auth              |
| ORM              | Drizzle ORM              |
| Base de données  | Neon (PostgreSQL)        |
| Styling          | Tailwind CSS + shadcn/ui |
| Validation       | Zod + React Hook Form    |

---

## 🚀 Démarrage Rapide

### 1. Cloner le dépôt

```bash
git clone https://github.com/Ldrekoh/UpSkill.git
cd UpSkill
npm install
```

### 2. Variables d'environnement

Crée un fichier `.env.local` à la racine du projet :

```env
# Base de données (Neon)
DATABASE_URL="postgresql://..."

# Better Auth
BETTER_AUTH_SECRET="votre_secret_généré"
BETTER_AUTH_URL="http://localhost:3000"

# (Optionnel)
# NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

> 💡 Génère un secret sécurisé avec : `openssl rand -base64 32`

### 3. Base de données

```bash
# Option A — Push direct du schéma
npx drizzle-kit push

# Option B — Génération + migration
npx drizzle-kit generate
npx drizzle-kit migrate
```

### 4. Lancer le serveur

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur.

---

## 📦 Structure du projet

```
UpSkill/
├── app/          → Routes et pages Next.js (App Router)
├── components/   → Composants UI réutilisables (Client & Server)
├── db/           → Schémas Drizzle et configuration BDD
├── server/       → Server Actions (Bookings, Skills, Users)
└── lib/          → Utilitaires et schémas de validation Zod
```

---

## 🔑 Fonctionnalités Clés

### 🔒 Système d'Escrow

Les tokens sont mis en séquestre dès la réservation et libérés uniquement à la fin de la session validée. Aucun paiement sans accord des deux parties.

### ✅ Validation Mentor

Le mentor doit accepter manuellement chaque demande de session. Pas de surprise, pas d'imposition.

### ⏱ Auto-Release

Si l'apprenant oublie de valider la session, un mécanisme de libération automatique protège le mentor et garantit sa rémunération.

### 🎨 UI Adaptive

Interface soignée avec gestion des états connecté / déconnecté, composants réactifs et design cohérent sur tous les écrans.

---

## 🌐 Déploiement

La manière la plus simple de déployer est via [Vercel](https://vercel.com) :

1. Pousse ton code sur GitHub
2. Importe le projet sur [vercel.com](https://vercel.com)
3. Configure les variables d'environnement identiques à ton `.env.local`
4. Déploie 🚀

---

## 📄 Licence

Ce projet est open source. Voir [LICENSE](./LICENSE) pour plus de détails.
