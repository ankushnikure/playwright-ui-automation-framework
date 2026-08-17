# Playwright UI Automation - Setup Guide

Quick reference for setting up the Playwright UI automation project from scratch.

## 1. Create Project

```bash
cd ~/Documents
mkdir playwright-ui-automation
cd playwright-ui-automation
```

## 2. Initialize npm:

```bash
npm init -y
```

## 3. Install Playwright

```bash
npm install -D @playwright/test
npx playwright install
```

## 4. Install TypeScript

```bash
npm install -D typescript @types/node
npx tsc --init
```

## 5. Install Environment Configuration

```bash
npm install dotenv
```

## 6. Create the basic structure
```bash
mkdir -p src/pages
mkdir -p src/fixtures
mkdir -p src/testdata
mkdir -p tests
```