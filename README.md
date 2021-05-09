# coverage-360

**Scena 360's end-to-end (E2E) testing setup.**

---

**Join the [Scena 360 Community](http://scena360.com/community)!**

![Discord Shield](https://discordapp.com/api/guilds/751119607179509770/widget.png?style=shield)

## Features

- Works with [A-frame VR](http://aframe.io/) entities (in 'headful' mode)
- Uses [jest-puppeteer](https://github.com/smooth-code/jest-puppeteer/):
  - [Jest](https://jestjs.io/)
  - [Puppeteer](https://developers.google.com/web/tools/puppeteer)
- Run tests in [Github Actions](https://github.com/features/actions) using the [Headful Puppeteer](https://github.com/mujo-code/puppeteer-headful) action

## Use cases

- Learn how to write tests that modify entities programmatically and visually inspect them
- Test VR interactions like hand-controls when you don't have a headset with you
- Set up E2E tests and a CI pipeline for your A-frame projects
- Use this repository for inspiration and make your A-frame projects more reliable!
- Automate and run E2E tests in the cloud using [Github Actions](https://github.com/features/actions)

## Running the Example

1. Make sure that you have the latest stable version of [Yarn](https://yarnpkg.com/) and [Node.JS](https://nodejs.org/en/) installed

2. Run `yarn intsall`
3. Run `yarn test:e2e` to run the example E2E test suite (`e2e/example.test.js`)

## File Structure

```
|_ .github
  |_ workflows/ # the Github Action configuration
|_ e2e
  |_ helpers # helpers/utilties for testing, querying/manipulating entities elements, etc.
  |_ example.test.js # example test suite
  |_ jest.config.js # Jest configuration
|_ .babelrc # Babel configuration so that imports/exports work
|_ index.html # sample Aframe application from aframe.io
|_ jest-puppeteer.config.js # https://github.com/smooth-code/jest-puppeteer/#configure-puppeteer
```

---

- Contributions and forks are welcome!
- Questions, suggestions, etc. can be posted in the [issues tab](https://github.com/scena360/coverage-360/issues) or in the [Scena 360 Community](http://scena360.com/community)
- More examples and resources coming soon!