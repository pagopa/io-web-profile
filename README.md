
# io-web-profile

``io-web-profile`` is the IO web platform that allows citizens to logout from the IO App session.

This repository contains the code that composes the io-web-profile front-end.


## Technologies
[![My Skills](https://skillicons.dev/icons?i=ts,react,next)](https://skillicons.dev)

This is Next.js 13 with app route project
## Prerequisites
### Env
In order to run the ``io-web-profile`` front-end locally you need the following tool installed on your machine.

- ``Node.js 18.16.1``
- ``yarn 1.22``

The preferred way to set up the local environment is using nodenv to manage Node.js installation and corepack (included with Node.js) to manage the installation of yarn.

### Login SP

Given that the login for io-web-profile relies on the JWT generated by hub-spid-login, it is necessary to run hub-spid-login-ms service in the background. In order to enable JWTs we recommend following this part of the documentation.

You can find the hub-spid-login project at this GitHub repository: https://github.com/pagopa/hub-spid-login-ms

To ensure proper execution of the service, please follow the documentation provided by hub-spid-login. Additionally, make the following modifications to the default values within the hub-spid-login .env file:

``ENDPOINT_ERROR=http://localhost:3000/accedi/errore``
``ENDPOINT_SUCCESS=http://localhost:3000/it/accedi
``
``
ENABLE_JWT=true``

This will help align the necessary settings for successful integration.

Note: The port used here is the same one used to expose the web app.

# Structure

io-web-profile/
- src/
    -  dictionaries/
    -  app/[locale]/
        - (pages)/
        - _component/
        - _enums/
        - _hooks/
        - _icons/
        - _model/
        - _redux/
        - _utils/ 


``src/``: This is the root folder of the source code, where all the application code resides.

``dictionaries/``: This folder contain files related to localization or dictionaries used to provide translations or language-specific content in the application.

``[locale]/``: This is a placeholder representing a specific locale (language) code, such as it for it for Italian, etc. This folder is used for internationalization (i18n) purposes.

``/(pages)/``: Pages folder contains folders for different routes. 

``/_component/``: This folder is used to store shared global components. 

``/_enums/``: This folder contains enum declarations or constant values that are used across different parts of the application.

``/_hooks/``: This folder contains custom hooks.

``/_icons/``: Here, you can find icon files (e.g., SVGs) that are specific to this project.

``/_model/``: This folder contains data models or types.

``/_redux/``: This folder store Redux-related files, such as actions, reducers and store configurations.

``/_utils/``: This folder contain utility functions.

## Installation

To test the webapp locally:

Install the project (if you haven't already). Run from the root folder the following commands.

```bash
# to install the dependencies
yarn install
```
    
## Run

To run the webapp locally:

```bash
# to run in dev mode
yarn run dev

```
The application will be running in development mode, you can access it locally by visiting: http://localhost:3000
 in your web browser.

```bash
# to build
yarn run build

#to run build solution
yarn run start

```
You can access the application in production mode by visiting: http://localhost:3000 in your web browser.
