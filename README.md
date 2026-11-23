# E-Cell Frontend

A frontend repository built with [Next.js](https://nextjs.org), for the official website
of [Entrepreneurship Cell, MIT Manipal](https://www.ecellmit.in/)

---

## Table of Contents

1. [Project Organisation](#project-organisation)
2. [First-Time Setup](#first-time-setup)
3. [How to contribute](#how-to-contribute)
4. [Learn more about Next.js](#learn-more-about-nextjs)
5. [Technical Head](#technical-head)

## Project Organisation

| Directory         | Purpose                                            |
|-------------------|----------------------------------------------------| 
| `src/app/`        | React Frontend with Next.js App Router             |
| `src/components/` | Feature modules (e.g., `healthCheck`, `user`)      |
| `src/lib/`        | Shared utilities                                   |
| `src/data/`       | Constant data needed throughout the website        |
| `public/`         | Serve static files in production (Not recommended) |
| `.env.example`    | NA, might needed in future                         |

---

## First-Time Setup

### Dependencies

- Node.js (preferably LTS version)
- pnpm (or NPM/Yarn, but `pnpm` is used by default)

## Setup Steps

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## How to contribute

1. Fork this repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Make your changes, ensure tests pass, if implemented.
4. Follow the existing code style (passing lints `npm run lint` or `pnpm lint`; formatted code `npm run format` or
   `pnpm format`)
5. Commit with clear message and push your branch.
6. Open a pull request describing your change and why it's beneficial.
7. The head will review and merge once CI (if configured) is passing.

---

## Learn More about Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

---

## Technical Head

| Name             | Role           | LinkedIn                                                                                      |
|------------------|----------------|-----------------------------------------------------------------------------------------------|
| Sarthak Chaddha  | Technical Head | [LinkedIn](https://www.linkedin.com/in/sarthak-chaddha-8953b5289/) |

---

Kudos to you for being a frontend contributor for E-Cell. Thanks and hope to see your code powering our technical
infrastructure.
