const addImportSCSS = (name, dir) => `\n@import '../${dir}/${name}/${name}.style.scss';`;

const indexSCSS = `body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', 'Oxygen', 'Helvetica Neue', sans-serif;
}

@import '../components/Container/Home/Home.style.scss';
@import '../components/Content/Header/Header.style.scss';
`;

const homeSCSS = `.exemple-container {
  background: #fff;
}
`;

const headerSCSS = `.app-logo {
  height: 40vmin;
  pointer-events: none;
}

.app-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: calc(10px + 1.5vmin);
  color: white;
}

.app-link {
  color: #61dafb;
  text-decoration: none;
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

const newComponentSCSS = (name) => `.${name.toLowerCase()} {
  text-align: center;
}
`;

module.exports = { addImportSCSS, indexSCSS, headerSCSS, homeSCSS, newComponentSCSS };
