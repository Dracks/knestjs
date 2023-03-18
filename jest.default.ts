import type { Config } from 'jest'

const config: Config = {
  moduleFileExtensions: [
    "js",
    "json",
    "ts"
  ],
  rootDir: "src",
  roots: ["<rootDir>", '../tests'],
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  testEnvironment: "node"
}

export default config
