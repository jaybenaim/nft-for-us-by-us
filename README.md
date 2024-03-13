## Table of Contents

- [Demo](https://patient-dashboard-delta.vercel.app)
- [Tech Stack](#tech-stack)
- [How it works](#how-it-works)
- [Getting Started Locally](#getting-started-locally)
- [Api Helpers](#api-helpers)
- [Interfaces](#interfaces)
- [Types](#types)
- [Auth Class](#auth-class)
  - [Class Structure](#class-structure)
  - [Auth Class Methods](#auth-class-methods)
    - [handleError](#handleerror-err)
    - [loginWithEmail](#loginwithemail-email-password)
    - [loginWithProvider](#loginwithprovider)
    - [createUserWithEmail](#createuserwithemail-email-password)
    - [signup](#signup-provider-google--email-email-password)
    - [signOut](#signout)
    - [get](#get-id)
    - [create](#create-id-email-extrafields-iuser)
- [Patient Class](#patient-class)
  - [Class Structure](#class-structure-1)
  - [Patient Class Methods](#patient-class-methods)
    - [set](#set-patient-ipatient)
    - [get](#get-id-string)
    - [create](#create-patientdata-ipatient)
    - [update](#update-patientdata-ipatient)
    - [delete](#delete-patientdata-ipatient)
    - [list](#list)
- [TODO](#todo)
  - [Features](#features)

## Demo

View the [Demo](https://patient-dashboard-delta.vercel.app)

## Tech Stack

The NFT Marketplace is built using the following technologies:

### Front-end

- [Next.js](https://nextjs.org/): A React framework for building server-side rendered and statically generated web applications.
- [TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript that adds static types to the language.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework that provides a set of pre-designed styles and classes for building responsive user interfaces.

### Authentication

- [Thirdweb Authentication](https://portal.thirdweb.com/connect/auth): Thirdwebs's authentication service that provides easy-to-use authentication for our web app. This allows you to connect your MetaMask wallet with a click of a button.

### Deployment

- [Vercel](https://vercel.com/): A platform for deploying and hosting web applications. We use Vercel to deploy the Patient Management Dashboard.

View the [Demo](https://patient-dashboard-delta.vercel.app)

### Version Control

- [Git](https://git-scm.com/): A distributed version control system used for tracking changes in our codebase and collaborating with multiple developers.

## How it works

1. Connect your wallet [Here](https://patient-dashboard-delta.vercel.app)
2. Head over to [Mint](https://patient-dashboard-delta.vercel.app/mint) to mint your own NFT [preview](/mint-preview.png)
3. Once completed you can now create a direct listing below the minted NFT [preview](dl-preview.png)
4. You can now view your listing along with all the other market listed NFT's in the [Market](https://patient-dashboard-delta.vercel.app/market)
5. You can also view your own listings in the [My NFT's Tab](https://patient-dashboard-delta.vercel.app/my-nfts)

## Getting Started Locally

First, install the dependencies:

```bash
yarn
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Next add your firebase config to your .env.local file:

```sh
NEXT_PUBLIC_NATIVE_TOKEN_ADDRESS=""
NEXT_PUBLIC_CONTRACT_ADDRESS=""
NEXT_PUBLIC_THIRD_WEB_CLIENT_ID=""
NEXT_PUBLIC_THIRD_WEB_SECRET_KEY=""

NEXT_PUBLIC_MARKETPLACE_ADDRESS=""
NEXT_PUBLIC_NFT_COLLECTION_ADDRESS=""
```

Start the project:

```bash
yarn dev
```

### TODO

- Implement auctioning
- Allow other markets to be listed
- Setup shopping cart to add NFT's to a cart and checkout
