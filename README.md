# Cowbird 🐄 🐦 [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/facebook/create-react-app/blob/main/CONTRIBUTING.md)

Create a serverless REST Api backend system in minutes with

- minimal configuration
- fast development cycles
- an opinionated way of building modern backend systems

Cowbird currently works on macOS and Linux. Windows has not been tested yet.

# Prerequisites

1. Terraform
2. AWS account configured on your machine
3. NodeJS

# Creating an App 🔨

**You'll need to have Node 16 or higher.**

## npx

```npx cowbird init <projectName>```

This will create a new project in a new directory based on the project name. This project will contain a new `Readme.md`
which we recommend reading. It will explain all the details on how to use this library and what not. If you want to read
it before you start, you can find it [here](templates/core/README.md).

# Getting started

To get started and learn how to configure your cowbird environment
follow [the guide](https://github.com/kreechr-org/cowbird/blob/master/templates/core/README.md) that comes with your new
project
instance.

# Feature ideas 💡

## Higher configurability

As this project started due to my own needs I am adding flexibility as I see fit. However, if there becomes demand for
particular configuration options I will add them.

## Built in type checking

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

## Debug

To run debug commands run

```shell
export COWBIRD_DEBUG=true
```

# Troubleshooting

## Cowbird is not recognised

Be sure to check your `package.json` and make sure that the cowbird version is set, and you run install. By default the
version is set to `*`.

## Cannot deploy one function

This is a missing feature - sorry! If you just need a single function, just create another directory and `index.ts` but
dont include it in terraform. (I knooow...ugly hack! Do you want to implement this feature? 😇) The issue is that Esbuild
then compiles a different output and I didnt have the time yet to make it work. If you have no idea what I mean, check
your `dist/` folder after running build with one function and then with two.

# License

Cowbird is open source software licensed as MIT.

