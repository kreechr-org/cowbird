# Getting started

1. Install the dependencies using `npm`, `yarn` or `pnpm`
1. Run `npm run dev` or `cowbird build -w` to start the builder CLI in watch mode
2. Deploy the infrastructure using the CLI or running `cowbird deploy`
3. Redeploy code changes using the CLI or running `cowbird update`
    1. _Be sure to have your AWS credentials set up in your environment as this by-passes terraform_

## Build

Cowbird expects a certain folder structure. Every serverless function should be in a directory under `src/`. Every
folder
should have a `index.ts` file which serves as the entry point. The `index.ts` file should export a function
called `handler`.

```
.
├── helloWorld
│   └── index.js
└── helloWorld2
    └── index.jss
```

The build resolves these directories into the output dir (`dist/`) and zip's them up. The name of the lambda
is assigned based on the directory name.

## Deployment

Before running a successful deployment be sure to configure your terraform backend config.

### Full deploy

If you run `cowbird deploy` it will deploy the infrastructure with **automatic approval**. However, if you run this
using the build CLI in watch mode you first need to run a plan by pressing `p` and then deploy by pressing `d`.

### Fast deploy

If you run `cowbird update` after you already created the infrastructure this will only update the code of the lambdas.
This allows you to iterate quickly on your code changes.

## CI/CD

To run this in CD you can use terraform directly. Feel free to extend it, add other products to it just don't forget
to maintain the source code folder structure for the lambdas to compile properly. Running the build command
without watch mode will minify the code. This is recommended for production builds.

Also, don't forget to run a proper type check in your CI using `tsc`. This is slower than `esbuild`, however `esbuild`
does not support typechecking. So your CI/CD should look something like

1. tsc
2. cowbird build
3. tf plan & tf apply / cowbird deploy

# Config

Currently, there is very limited configurability of this tool. If you have suggestions to improve, please do reach out!

## Change a name of the function

If you want to deploy another instance of your function (e.g. `helloWorld` being the prod and `helloWorld-local` being
the one you are messing around) all you need to do is add an output to your terraform file called the same way your
default name is.

The default name is derived from the name of the directory your function lives in. This produces a zip
with the same name and this is then used as a name of the function. To override this name place it into your outputs
like so:

```terraform
output "helloWorld" {
   value = module.hello_world.name
}
```