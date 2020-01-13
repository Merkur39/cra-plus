# Overview

cra-plus uses [create-react-app](https://github.com/facebook/create-react-app) with a better architecture and offers several choices to configure your project

# Use cra-plus

Simply use the command in your terminal

```
npm i -g cra-plus
```

Commands:

```
crap new <name> [options App]                     // Create New Application
crap component|c <component> [options Component]  // Create new Component
crap service|s <service> [options Service]  // Create new Service
```

Options Application:

```
--typescript    // Generate Typescript Application
--sass          // With Preprocessor SASS
```

Options Component:

```
--skipTests    // Don't create test file for this component
--class        // Create Class Component
```

Options Service:

```
--skipTests    // Don't create test file for this service
```

# Soon...

- ~~Typescript choice~~,
- ~~Auto-commit new architecture~~
- Add CLI for create another ~~components~~, ~~services~~, interfaces etc (in Progress)
