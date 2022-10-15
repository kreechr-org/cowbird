# Getting started

1. Install the dependencies using `npm`, `yarn` or `pnpm`
1. Run `npm start` or `cowbird build` to start the builder CLI in watch mode
2. Deploy the infrastructure using the CLI or running `cowbird full`
3. Redeploy code changes using the CLI or running `cowbird fast`

## Build

Cowbird expects a certain folder structure. Every serverless function should be in a directory under `src/`. Every folder
should have a `index.ts` file which serves as the entry point.

```
.
├── helloWorld
│   └── index.js
└── helloWorld2
    └── index.jss
```

The build resolves these directories into the output dir (`dist/` by default) and zip's them up. The name of the lambda
is assigned based on the directory name.

If there is just one function tho, the folder name becomes `lambda` as a workaround currently. Everything in the `lib/`
directory is bundled into the functions however is not resolved into a lambda itself.

## Deployment

Before running a successful deployment be sure to configure your IaC properly. For example when using any of to
terraform templates be sure to set the backed config.

### Full deploy


### Fast deploy



### Known issues

1. If you have just one folder in `src` this builds out a single `index.js` and breaks the destination folder hierarchy.
   This then leads to the ZipPlugin silently failing and therefor the watchmode not working. To work around this just
   keep the example `helloWorld2` dir but don't publish it. Chances are you will need another Lambda endpoint anyways.