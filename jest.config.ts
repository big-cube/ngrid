const { getJestProjects } = require('@nx/jest');

export default {
  projects: [
    ...getJestProjects(),
    '<rootDir>/apps/ngrid-docs-app/',
    '<rootDir>/libs/ngrid-cypress',
  ],
};
