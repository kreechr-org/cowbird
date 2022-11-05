# Cowbird 🐄 🐦 [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/facebook/create-react-app/blob/main/CONTRIBUTING.md)

Create a serverless REST Api backend system in minutes with

- minimal configuration
- fast development cycles
- an opinionated way of building modern backend systems

Cowbird currently works on macOS and Linux. Windows has not been tested yet.

# Creating an App 🔨

**You'll need to have Node 16 or higher.**

## npx

```npx cowbird init <projectName>```

This will create a new project in a new directory based on the project name. This project will contain a new `Readme.md`
which we recommend reading. It will explain all the details on how to use this library and what not. If you want to read it before you start, you can find it [here](templates/core/README.md).

# Feature ideas 💡

## Higher configurability

As this project started due to my own needs I am adding flexibility as I see fit. However, if there becomes demand for
particular configuration options I will add them.

## Build in type checking

Currently, the builds run esbuild to have fast development cycles. This means that for your CI/CD builds you should run
a
separate `tsc` build to get type checking.

# Smaller ToDo's

If you want to join in on this project but don't know where to start, fixing a bug is always a good idea. If there is
not an open issue then, feel free to pick any of these items:

- [ ] Validate project name (no spaces, no special characters)
- [ ] setup testing

# Contributing

The easiest way is to clone this repo. Install dependencies and run `npm run dev`. This should start producing the build
for you of this library. Then you can link this lib using `npm link` to play around with it locally in another dir by
running the various commands.

Once you are done with you changes, open a PR and we/I will review it. I set out some conventions in the `.husky`
commit-message hook. Please follow them. It would be nice if the branches followed
similar [naming patterns](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716) `feature/xxx`
, `fix/xxx`, `chore/xxx` etc.

# License

Cowbird is open source software licensed as MIT.

