const indexCSS = `body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', 'Oxygen', 'Helvetica Neue', sans-serif;
}
`;

const appCSS = `.app {
  text-align: center;
}
`;

const exampleContainerCSS = `.exemple-container {
  background: #fff;
}
`;

const exampleCSS = `.exemple {
  background: #000;
}
`;

const newComponentCSS = (name) => `.${name.toLowerCase()} {
  text-align: center;
}
`;

module.exports = { indexCSS, appCSS, exampleContainerCSS, exampleCSS, newComponentCSS };
