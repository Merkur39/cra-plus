const PackagesList = (withTS) => {
  const package = [{ name: 'react-router-dom', prefix: '' }];

  if (withTS) {
    return [...package, { name: 'react-router-dom', prefix: '@types/' }];
  }

  return package;
};

const PackagesSassList = (withTS) => {
  const package = [{ name: 'node-sass', prefix: '' }];

  if (withTS) {
    return [...package, { name: 'node-sass', prefix: '@types/' }];
  }

  return package;
};
const PackagesTypescriptList = [
  { name: 'typescript', prefix: '' },
  { name: 'jest', prefix: '@types/' },
  { name: 'node', prefix: '@types/' },
  { name: 'react', prefix: '@types/' },
  { name: 'react-dom', prefix: '@types/' },
];

module.exports = { PackagesList, PackagesSassList, PackagesTypescriptList };
