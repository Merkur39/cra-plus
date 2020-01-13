const indexTSX = withSass => `import React from 'react';
import ReactDOM from 'react-dom';
${withSass ? "import './styles/index.scss';" : "import './styles/index.css';"}
import App from './components/App/App.component';
import * as serviceWorker from './config/serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
`;

const appTSX = withSass => `import React from 'react';
import logo from '../../assets/logo.svg';
${withSass ? '' : "import './App.style.css';\n"}
const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <p>
          Edit <code>src/components/App/App.component.tsx</code> and save to reload.
        </p>
        <a
          className="app-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
`;

const appClassTSX = withSass => `import React from 'react';
import logo from '../../assets/logo.svg';
${withSass ? '' : "import './App.style.css';\n"}
class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <header className='app-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            Edit <code>src/components/App/App.component.tsx</code> and save to reload.
          </p>
          <a
            className='app-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
`;

const appTestTSX = `import React from 'react';
import { render } from '@testing-library/react';
import App from './App.component';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
`;

const newComponentTS = (name, withSass) => `import React from 'react';
${withSass ? '' : `import './${name}.style.css';\n`}
const ${name}: React.FC = () => {
  return (
    <div className="${name.toLowerCase()}">
      ${name} component
    </div>
  );
}

export default ${name};
`;

const newComponentClassTS = (name, withSass) => `import React from 'react';
${withSass ? '' : `import './${name}.style.css';\n`}
class ${name} extends React.Component {
  render() {
    return (
      <div className="${name.toLowerCase()}">
        ${name} component
      </div>
    );
  }
}

export default ${name};
`;

const newComponentTestTS = name => `import React from 'react';
import { render } from '@testing-library/react';
import ${name} from './${name}.component';

test('renders learn react link', () => {
  const { getByText } = render(<${name} />);
  const linkElement = getByText(/${name} component/);
  expect(linkElement).toBeInTheDocument();
});
`;

const newServiceTS = name => `export const ${name} = (): string => {
  return 'Hello service ${name}!';
};
`;
const newServiceTestTS = name => `import { ${name} } from './${name}.service';

test('Return string', () => {
  expect(${name}()).toEqual('Hello service ${name}!');
});
`;

const reactAppEnvTS = `/// <reference types="react-scripts" />`;

const serviceWorkerTS = `// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

export function register(config?: Config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(
      process.env.PUBLIC_URL,
      window.location.href
    );
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = \`${process.env.PUBLIC_URL}/service-worker.js\`;

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });
      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl: string, config?: Config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl: string, config?: Config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' }
  })
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
`;

const setupTestsTS = `// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
`;

const tsconfigJSON = `{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react"
  },
  "include": [
    "src"
  ]
}
`;

module.exports = {
  indexTSX,
  appTSX,
  appTestTSX,
  appClassTSX,
  newComponentTS,
  newComponentClassTS,
  newComponentTestTS,
  newServiceTS,
  newServiceTestTS,
  serviceWorkerTS,
  setupTestsTS,
  reactAppEnvTS,
  tsconfigJSON
};
