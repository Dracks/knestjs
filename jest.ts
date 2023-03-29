import type { Config } from 'jest'

const config : Config = {
    collectCoverageFrom: [
      "**/*.(t|j)s"
    ],
    coverageDirectory: "./coverage",
    coverageReporters: [
        "text",
        "cobertura"
    ],
    projects: ['packages/*/jest.ts']
}
export default config;
