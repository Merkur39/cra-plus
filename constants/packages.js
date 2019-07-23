const addMaterial = require('../libs/addMaterial');
const addRouter = require('../libs/addRouter');
const addRedux = require('../libs/addRedux');
const addSass = require('../libs/addSass');

const PackagesList = [
  {
    name: 'Material-ui',
    value: 0,
    install: spinner => addMaterial(spinner)
  },
  {
    name: 'Router-dom',
    value: 1,
    install: (spinner, withTS) => addRouter(spinner, withTS)
  },
  {
    name: 'Redux',
    value: 2,
    install: (spinner, withTS) => addRedux(spinner, withTS)
  },
  {
    name: 'Sass',
    value: 3,
    install: (spinner, withTS) => addSass(spinner, withTS)
  }
];

module.exports = PackagesList;
