# Playwright Homework Project

NodeJs 24.14.0 required.

After cloning repository make sure to install node modules with npm install.

### To run tests:

- **API:** `npm run api`
- **UI:** `npm run ui`

### To check report:

- `npm run report`

### Code Quality:

Eslint and Prettier were used for code formating and quality checking:

- `npm run check`

---

**Project Structure:**

- `tests/api` for api tests
- `tests/e2e` for ui tests and their components

![Playwright Tests](https://github.com/MildaKazi/PlaywrightProject/actions/workflows/playwright.yml/badge.svg)


**Notes**
- Api tests are working stable
- E2E tests due to issues with ebay (captchas, maintenance pages) failing often on pipeline, also there is issue with memory in github actions. 
- Pipeline runs every 6hours and after every commit every pipeline run can be seen in Github Actions: https://github.com/MildaKazi/PlaywrightProject/actions/workflows/playwright.yml