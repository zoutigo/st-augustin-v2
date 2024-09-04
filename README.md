This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# CI / CD

## Cpanel deployment

- Create a Git version control repository
  The destination folder must be located in /repositories

- Add the remote repository

```bash
git remote add cpanel ssh://username@username.odns.fr/home/username/repositories/project-name
```

- Create final folder repositry to host files

```bash
mkdir ecole-st-augustin-v2-dev
```

- Update the hook located in repositories/project-name/.git/hooks

```bash
  nano post-receive
```

```
read oldrev newrev refname
branch=$(echo $refname | cut -d/ -f3)

if [ "$branch" = "dev" ]; then
    echo "Deploying to development environment..."
    GIT_WORK_TREE=/home/username/dev git checkout -f dev
elif [ "$branch" = "main" ]; then
    echo "Deploying to production environment..."
    GIT_WORK_TREE=/home/username/prod git checkout -f main
else
    echo "Branch $branch not configured for deployment."
    exit 0
fi

# Vérifier si la branche reçue est bien celle qui est actuellement déployée
if [ "x$refname" == "xrefs/heads/$branch" ]; then
    echo "Received update on the checked-out branch, queueing deployment."
    (cd /home/username/repositories/project-repo && /usr/bin/uapi VersionControlDeployment create repository_root=$PWD)
else
    echo "Ref $refname does not match the deployment branch."
fi
```

## Commands

Remote ssh connexion to cpanel from linux

```bash
ssh -i ~/.ssh/id_rsa -p 22 username@ecole-st-augustin.fr
```

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
