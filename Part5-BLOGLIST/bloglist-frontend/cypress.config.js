import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'msfd2q',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:5173'
  },
  env: {
    BACKEND: 'http://localhost:3003/api'
  }
})
