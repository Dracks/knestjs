
export default {
  moduleFileExtensions: [
    "js",
    "json",
    "ts"
  ],
  rootDir: "lib",
  roots: ["<rootDir>", '../tests'],
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  collectCoverageFrom: [
    "**/*.(t|j)s"
  ],
  coverageDirectory: "../coverage",
  testEnvironment: "node"
}
