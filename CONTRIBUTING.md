# Contributing

Thanks for helping improve KeySense.

## Setup

```bash
nvm use
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Before You Open A Pull Request

Run:

```bash
npm run lint
npm run build
```

## Project Notes

- This project uses Next.js 16 App Router. Before changing framework APIs, metadata conventions, or routing behavior, read the relevant local docs in `node_modules/next/dist/docs/`.
- Keep UI changes consistent with the existing compact, product-focused dark interface.
- Do not commit real `.env*` files, local IDE settings, generated build output, or dependency folders.
- Keep keyboard metadata in `data/keyboards.ts` aligned with model registrations in `keyboards/_base/registry.ts`.

## Adding A Keyboard

1. Add metadata in `data/keyboards.ts`.
2. Add or reuse a visual model under `keyboards/<brand>/`.
3. Register the model in `keyboards/_base/registry.ts`.
4. Add sounds under `public/sounds/<keyboard-id>/` only when custom samples are needed.
5. Test `/`, `/keyboard/<id>`, `/compare`, and `/typing-test`.
