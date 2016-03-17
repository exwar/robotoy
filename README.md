# Toy Robot Simulator

Web implementation of the test task of REA Group.

Robot can be controlled in two ways: interactive and programmable.

When robot has been controlled in interactive way, user should firstly place robot on imaginary tabletop.
After that, the user opens the opportunity to control the robot using buttons with initially defined commands.

When robot has been controlled in programmable way, user should enter text scenario in INPUT field.
In accordance with the conditions, robot should be placed with PLACE command firstly.
After that, any sequence of commands can be issued.
Application is not stopping on wrong commands, but is showing warning notification when it happens.
There are some handy presets defined for programmable way.

Result of the REPORT command shows with notification in Interactive mode, and puts it in OUTPUT field in programmable mode.

Internally both ways of robot control are using same data structure.
For both ways, implemented checks, that avoids robot falling.

The application is hosted on GitHub pages: https://exwar.github.io/robotoy/

## Setup

```bash
$ npm install
```

## Usage

Start development server:

```bash
$ npm start
```

Build production version:

```bash
$ npm run build
```

Run javascript (ESLint):

```bash
$ npm run lint
```

Run karma tests:

```bash
$ npm test
```
* The application is developed using React and accompanied by tests (based on Jasmine, Mocha, Expect.js)
* Webpack used for assembly
* The application was developed using the ES2015 standard with features of the ES7 (e.g. Array/Object Spread)
* Implemented syntax checking on the basis of ESLint
