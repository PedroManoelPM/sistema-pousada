const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Fornece o caminho para o seu aplicativo Next.js
  dir: './',
})

// Configurações personalizadas do Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testTimeout: 10000,
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Para lidar com caminhos absolutos (se você usar @/...)
    '^@/(.*)$': '<rootDir>/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
