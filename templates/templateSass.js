const addImportSCSS = (name, dir) => `\n@import '../${dir}/${name}/${name}.style.scss';`;

const indexSCSS = `body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', 'Oxygen', 'Helvetica Neue', sans-serif;
}

@import '../components/Container/ExampleContainer/ExampleContainer.style.scss';
@import '../components/Content/Example/Example.style.scss';
`;

const appSCSS = `.app {
  text-align: center;
}
`;

const exampleContainerSCSS = `.exemple-container {
  background: #fff;
}
`;

const exampleSCSS = `.exemple-container {
  background: #000;
}
`;

const newComponentSCSS = (name) => `.${name.toLowerCase()} {
  text-align: center;
}
`;

module.exports = { addImportSCSS, indexSCSS, appSCSS, exampleContainerSCSS, exampleSCSS, newComponentSCSS };
