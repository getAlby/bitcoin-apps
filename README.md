# Bitcoin Apps Directory

Open-source directory of apps, websites, and services that let people connect Lightning and Bitcoin wallets.

This repository contains the standalone website for the directory. It is a static client app built to be hosted on GitHub Pages or any other static host.

## What’s inside

- Search and faceted filters for apps
- Featured apps section
- Wallet subcategories
- Platform, protocol, and Alby-product tags
- Custom card layout, hover motion, and hero/footer imagery

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn-style UI primitives
- Vitest
- Playwright

## Local development

```bash
npm install
npm run dev
```

Open the URL shown by Vite.

## Build and preview

```bash
npm run build
npm run preview
```

## Tests

```bash
npm run test
npm run test:e2e
```

## How the data works

The app data is fully local and typed. The main source of truth lives in:

- `src/data/apps.json`
- `src/data/apps.ts`
- `src/types/discover.ts`

Selector and filtering logic lives in:

- `src/lib/discover.ts`

Assets live in:

- `public/images/discover`
- `public/images/icons`

## Contributing

This is an open-source project. The workflow is:

1. Fork the repository.
2. Create a branch for your change.
3. Add or update app entries in `src/data/apps.json`.
4. If needed, add icons or imagery to `public/images/discover` or `public/images/icons`.
5. Run the checks:
   ```bash
   npm run build
   npm run test
   npm run test:e2e
   ```
6. Open a pull request.

### Adding or updating an app

Each app entry can include:

- `title`
- `description`
- `url`
- `categories`
- `platforms`
- `protocols`
- `products`
- `walletSubcategory`
- `image`

Use the existing app records as examples. Keep URLs correct, descriptions short, and tags aligned with the app’s actual capabilities.

If an app uses:

- `NWC`, tag it with `nwc`
- `WebLN`, tag it with `webln` or set it as a web app so the derived rule applies
- `Bitcoin Connect`, tag it with `bitcoin_connect`
- `Alby Hub`, `Alby Extension`, `Alby Go`, or `Alby Account`, add the appropriate product tag

### Adding a new app image

If you add a new image, place it in the appropriate folder and point the app record’s `image` field to it. Prefer static assets over remote image URLs.

## Deployment

The site is configured for GitHub Pages with a relative base path. The deployment workflow lives in:

- `.github/workflows/deploy-pages.yml`

## Notes

- There is no backend or API.
- Search, filters, and results are all client-side.
- The goal is to keep the directory fast, static, and easy to contribute to.
