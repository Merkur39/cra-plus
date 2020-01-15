const addImportSCSS = (name, dir) => `\n@import '../${dir}/${name}/${name}.style.scss';`;

const indexSCSS = `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
}

@import '../pages/App/App.style.scss';
@import '../components/Header/Header.style.scss';`;

const appSCSS = `.app {
  text-align: center;
}
`;

const headerSCSS = `.app-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;

  .app-logo {
    height: 40vmin;
    pointer-events: none;
  }

  .app-link {
    color: #61dafb;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .app-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`;

const newComponentSCSS = name => `.${name.toLowerCase()} {
  text-align: center;
}
`;

module.exports = { addImportSCSS, indexSCSS, appSCSS, headerSCSS, newComponentSCSS };
