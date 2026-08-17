# Git Repository Setup

## 1. Create the Git repository locally

From the project root:

```bash
git init
```

## 2. Create `.gitignore`

```bash
touch .gitignore
```

Add:

```gitignore
node_modules/
playwright-report/
test-results/
.env
```

## 3. Create the GitHub repository

Repository name:

```text
playwright-ui-automation
```

Recommended settings:

- Public — for portfolio use
- Do not initialize with README
- Do not add `.gitignore`
- Do not add a license

## 4. Connect the local repository to GitHub

```bash
git remote add origin https://github.com/ankushnikure/playwright-ui-automation.git
```

Verify:

```bash
git remote -v
```

Expected:

```text
origin  https://github.com/ankushnikure/playwright-ui-automation.git (fetch)
origin  https://github.com/ankushnikure/playwright-ui-automation.git (push)
```

## 5. Rename the branch to `main`

```bash
git branch -M main
```

## 6. Create the first commit and push

```bash
git status

git add .

git commit -m "setup Playwright UI project"

git push -u origin main
```

## Result

```text
Local Playwright Project
        ↓
     Git Commit
        ↓
      GitHub
        ↓
playwright-ui-automation
```
