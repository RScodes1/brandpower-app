# Shopify App – Setup & Run Guide
## Overview

### This is a Shopify embedded app built using:

-Node.js
-Shopify App Bridge
Theme App Extension
Deployed backend on Render

### The app supports:

OAuth authentication
Webhook handling (app/uninstalled)
App Embed via Theme Extension

### Prerequisites

Make sure you have:

Node.js (v20+ recommended)
Shopify Partner account
Shopify development store
Shopify CLI installed

A Render account (for production deployment)
 Installation (Local Development)
Clone the repository:
```bash
git clone <your-repo-link>
cd <project-folder>
```
Install dependencies:

```bash
npm install
```
 Environment Variables

Create a .env file in the root directory and add:
```bash
SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_SECRET=your_api_secret
SHOPIFY_APP_URL=https://your-app-url
SCOPES=write_products
NODE_ENV=development
```
For production (Render), set the same variables in Render Dashboard → Environment.

 Run Locally

Start development server:
```bash
shopify app dev
```

This will:

Create a tunnel
Install app on development store
Register webhooks automatically
