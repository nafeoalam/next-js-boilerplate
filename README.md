# Next.js E-commerce Boilerplate

Take a look at the [DEMO](https://nextjs-ecom-boilerplate.vercel.app/)

## Tech Stack

- Frontend

  - React
  - Next.js
  - TypeScript
  - Redux Toolkit
  - Material UI

- Testing

  - Jest
  - React Testing Library

- Deployment
  - Github Actions
  - Vercel

## Initial Setup

- Clone the repo
- Run `yarn install` to install dependencies
- Run `yarn dev` to start the development server

## Step by Step Guide to deploying to Vercel

Since we are going to create our own CI/CD pipeline using Github Actions, we need to create an `access token` for Vercel. This is because we are going to use the Vercel CLI to deploy our app to Vercel. Also, we will be needing the `Project ID` and `User ID` from Vercel.

### Let's get started.

Before jumping into the deployment, let's first create a new github repository and push our code to it.

- Create a new repository in Github
- Copy the remote url
- Run `git remote set-url origin <remote url>`
- Run `git push -u origin development`
- Create a new branch `production` and push it to Github as well for Production deployments

#### Collect necessary SECRETS

- Create a new Vercel account and go to the dashboard
- Create a new project
- Connect your Github account in vercel to access your repositories
- Select the repository
- Set the `Install command` to `yarn install` under `Build and Output Settings`
- Set the environment variables
- Deploy
- Create an `Access token` by going to `account settings > Tokens > Create Token`
- Collect the `Project ID` from the `project setting > General > Project ID`
- Collect your `User ID` from `account settings > General > Your ID`

#### Github setup

- Go to `Project Settings > Secrets and variables > Actions > New repository secret`
- Create the following secrets
  - `VERCEL_ORG_ID` - Your user ID
  - `VERCEL_PROJECT_ID` - Project ID
  - `VERCEL_TOKEN` - Access token

Congratulations! You have successfully setup your Github Actions and Vercel. Now every time you push to the production branch, your app will be deployed to Vercel production. And every time you push to the development branch, your app will be deployed to Preview. You can see the deployment status in the `Actions` tab in your Github repository and vercel deployment status in the `Deployments` tab in your Vercel project.

## Additional Notes

- If you are in a UNIX based system (ex: `Mac OS`), you might need to run `chmod ug+x .husky/*` in your project directory terminal to make the husky script executable.
