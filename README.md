# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

##icones
https://icon-sets.iconify.design/mdi-light/


## commandes migration
```
npx prisma migrate dev --name [nom de la migration ex: add-product]

exemple: 
npx prisma migrate dev --name add_product

## Mettre à jour l'ORM après la migration
```npx prisma generate```

##Lancer le docker localement
docker compose up -d