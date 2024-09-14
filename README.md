This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# CI / CD

## Cpanel deployment by ftp

- Create an ftp account and choose ftp destination folder

- Add the credentials in github actions and update the deploy.yml

- Create a shell file with the associated cron task
  There is a shell file in cpanel to run 'npm rum prod' twice a day if files are detected.

This will update the dev.ecole-st-augustin.fr

- Create a nodejs app , based on the above destinaion folder

## Commands

Remote ssh connexion to cpanel from linux

```bash
ssh -i ~/.ssh/id_rsa -p 22 username@ecole-st-augustin.fr
```

Then to run npm commands , connect with the string provided by the nodejs application

There are 2 branches dev and main . To Push to dev branch

```bash
git push -u cpanel dev

```

# Development

## Getting Started

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font Hello dev.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
