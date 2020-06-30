# Proxy Configuration

With [webpack-dev-server.proxy](https://webpack.js.org/configuration/dev-server/#devserverproxy) you can easily configure a proxy to solve CORS, cookie, and much more, issues when working in `local` environment.

The dev server uses the powerful [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware).

For the angular project you can follow the instructions on [proxying to a beckend server](https://angular.io/guide/build#proxying-to-a-backend-server).

## Dependencies

Run `npm install --save-dev @types/http-proxy-middleware` to install type definitions for `http-proxy-middleware`.

Run `npm install --save-dev tough-cookie` to install `tough-cookie` package.

Run `npm install --save-dev @types/tough-cookie` to install type definitions for `tough-cookie`.

Run `npm install --save-dev npm-run-all` to install `npm-run-all` package.

## Build

Run `npm build:proxy-config` to generate `proxy/config.js`.

Because `webpack-dev-server` can only accept compiled `javascript` files and we do not want to deal with the generated files a `.gitignore` was added with `*.js` in it.

## Serve

Run `npm serve:proxy-config` to run `webpack-dev-server` with `proxy/config.js`.

## Run

`start` script will first run `build:proxy-config` and then `serve:proxy-config`.

## Config

Config itself will take care of the redirects to backend server and fixing the cookie domain so that `set-cookie` header can apply the cookie to `localhost`.