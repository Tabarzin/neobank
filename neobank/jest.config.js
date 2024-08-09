// export default {
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom',
//   extensionsToTreatAsEsm: ['.ts', '.tsx'],
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/src/$1',
//     '^@assets/(.*)$': '<rootDir>/src/assets/$1',
//     '^@components/(.*)$': '<rootDir>/src/components/$1',
//     '^@App/(.*)$': '<rootDir>/src/App/$1',
//     '^@configs/(.*)$': '<rootDir>/src/configs/$1',
//     '^@styles/(.*)$': '<rootDir>/src/styles/$1',
//     '^@utils/(.*)$': '<rootDir>/src/utils/$1',
//     '^@store/(.*)$': '<rootDir>/src/store/$1',
//     '^@customHooks/(.*)$': '<rootDir>/src/customHooks/$1',
//     '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
//     '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
//       '<rootDir>/__mocks__/fileMock.js',
//   },
//   transform: {
//     '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: true }],
//     '^.+\\.(js|jsx)$': 'babel-jest',
//   },
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
//   moduleDirectories: ['node_modules', '<rootDir>/src'],
// };

import './__mocks__/fileMock.js';
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: true }],
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(js|jsx)$': ['babel-jest', { useESM: true }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@App/(.*)$': '<rootDir>/src/App/$1',
    '^@configs/(.*)$': '<rootDir>/src/configs/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@customHooks/(.*)$': '<rootDir>/src/customHooks/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
};
