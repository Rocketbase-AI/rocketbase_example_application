# RocketBase Example Application

## Requirements

In order to use run this application on your device(s) you will require the following:

* Node.JS >= v10.0
* NPM or Yarn
* Expo

## Installation

Clone this repository:

```
git clone git@gitlab.com:mirage-technologies/rocketbase-example-application
```

Move into the cloned folder and create folder for Node Modules named `node_modules`:

```
cd rocketbase-example-application
mkdir node_modules
```

Since the RocketBase NPM package has not yet been published to the NPM Index, we need to add it manually.
For that, move into the newly created `node_modules` folder and clone the *rocketbase-npm* package with:

```
cd node-modules
git clone git@gitlab.com:mirage-technologies/rocketbase-npm
```
We can now return to the App's main folder and install all dependencies and modules:

```
yarn install
```

## Run the App

Return to the repository's main folder and run the app:

```
yarn run buildAndStart
```