# Versioning

To solve the problems with caching files in the browser and to avoid contacting api for application version we can use the advantage of the javascript and generate `uuid` for each application build, apply the `uuid` by replacing `APPLICATION_BUILD_VERSION_HASH` in the application and store it in `assets/version.json`.

The only this left is to create some service that will pull the `version.json` every second and compare that version with the one in the application. If the hashes do not match then prompt user to reaload the window.

#### Note

For this to work properly you need to add `<meta http-equiv="Cache-Control" content="no-store" >` tag to `index.html`. Reason for this is that browser will not do a cache clean reload when you call `window.location.reload()`.

## Dependencies

Run `npm install --save-dev @types/uuid` to install type definitions for `uuid`.

## Build

Run `npm build:scripts` to generate `scripts/*/*.js`.

Run `npm run apply:version` to generate generate `dist/build/assets/version.json` and apply application version.

## version.json

```
{"hash":"unique id"}
```