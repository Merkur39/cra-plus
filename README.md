# Overview

cra-plus uses [create-react-app](https://github.com/facebook/create-react-app) with a better architecture and offers several choices to configure your project

# Use cra-plus

Simply use the command in your terminal

- `npm i -g cra-plus`

**Commands:**

- Create New Application.

  - `crap new <appName> [options Application]`

- Create new Component.

  - `crap component|c <component> [options Component]`

- Create new Service.

  - `crap service|s <service> [options Service]`

- If the application was created with the "--class" command, the future components created will no longer be Classes.
  - `crap stop class`

**Options Application:**

- Generate Typescript Application.

  - `--typescript`

- With Preprocessor SASS.

  - `--sass`

- Generate Application with Class components, the future components will be created with Classes.
  - `--class`

**Options Component:**

- Don't create test file for this component.

  - `--skipTests`

- Create Class Component.
  - `--class`

**Options Service:**

- Don't create test file for this service.
  - `--skipTests`

# Soon...

- ~~Typescript choice.~~,
- ~~Auto-commit new architecture.~~
- Add CLI commands (in Progress).
