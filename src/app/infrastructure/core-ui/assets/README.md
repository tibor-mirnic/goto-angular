## Assets

Here we define additional assets that are required by `Core UI` module.

By default `angular-cli` will include the assets from `src/assets`. You can find more details [here](https://angular.io/guide/workspace-config#asset-config).

To include additional assets you have to add paths to `angular.json` at `arhitect:build:options:assets`.

Be sure to add them to `arhitect:test:options:assets` as well.

Path can either be an `string` or an configuration object

```
{
  "glob": "**/*",
  "input": "src/app/infrastructure/core-ui/assets",
  "output": "/assets/"
}
```

By using configuration object instead of an `string` you can then access assets by providing the relative path, starting with the provided path defined at the `output` field.

A portion of the `index.html`
```
<link rel="stylesheet" href="assets/fonts/some-font.css">
```