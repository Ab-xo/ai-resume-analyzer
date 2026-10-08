# SiraMap

SiraMap is an AI-powered resume intelligence workspace. Upload a PDF, add the role context, and get focused ATS, content, structure, tone, and skills feedback.

## Product direction

- **Brand:** SiraMap — a clear map from your current resume to your next opportunity.
- **Visual system:** warm paper surfaces, deep teal navigation, lime action color, Manrope display type, and compact mono labels.
- **Analysis flow:** `mapOpportunity` uploads the source, generates a preview, requests structured AI feedback, persists the result, and returns to the workspace.

## Run locally

```bash
npm install
npm run dev
```

Validate the application with:

```bash
npm run typecheck
npm run build
```

## Deployment

Build output is generated with `npm run build` and can be served with:

```bash
npm run start
```

The Puter runtime is loaded by the app shell and provides authentication, file storage, AI feedback, and key-value persistence.
