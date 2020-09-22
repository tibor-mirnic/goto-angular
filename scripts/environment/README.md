# Environment

By default Angular's approach to environments is not flexible enough. You need to set sensitive data in `environment.env.ts` files, also for each environment you have to rebuild the application.

We can use the advantage of the javascript and after the build apply the enviroment info by replacing unique strings that serve as a placeholders.

Placeholders are set in `environment.prod.ts` but can be anywhere in the application.

## Dependencies

Run `npm install --save-dev @fs-extra` to install `fs-extra` package.

Run `npm install --save-dev @types/fs-extra` to install type definitions for `fs-extra`.

## Build

Update the `arhitect:build:options:outputPath` in `angular.json` to `dist/angular`;

Run `npm run build:angular` to generate build in `dist/angular` folder. The `build` script needs to target `--prod` enviroment.

Run `npm build:scripts` to generate `scripts/*/*.js`.

Run `npm run apply:environment` to copy contents of `dist/angular` to `dist/build` and apply environment variables.

`npm run build` script will first run `build:angular` and then `build:scripts` and then `apply:environment`.

## Variables

Te ensure that you do not replace something important in generated `*.js` files use longer environment variable names.

See the example in the `environment.prod.ts`;