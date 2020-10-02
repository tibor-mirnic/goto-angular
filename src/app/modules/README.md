## Feature Modules

All of the feature modules are located in `src/app/modules` folder.

Components, directives, etc that belong to a module should have a prefix, for example component in `feature-module` has `fm` prefix.

There are basicly three types of modules

#### Feature Modules
These modules are self contained and are responsible only for their own business logic.

Feature modules should contain references to other feature modules, but they can reference `shared` and `core` modules.

Feature modules can either be `eager` or `lazy`. If they are `eager` they should follow `Angulars` proposed way of importing modules with a `forRoot` pattern. On the other side `lazy` modules cannot have a `forRoot`, it is implemented like that, so everything that is required by the module has to be provided in the `root` module of the application.

#### Shared Modules
Shared modules contain logic that is shared between feature modules. An example would be when we need to use the api of some other module, in that case we can create an abstract `shered` service, implement it in a feature module and provide it in the `root` module.

## Structure

```
feature-module/
  components/
  models/
  scss/
  services/
  feature-module-routing.module.ts
  feature-module.module.ts
  index.ts
```

A module does not necessarly need to have a routing module.

#### index.ts

In here we declare everything that is public for this module. Apart from the encapsulation, we are also doing this to add module to a path in the `tsconfig.base.json`.

A portion of the file

```
export * from './feature-module.module.ts';
export * from './feature-module-routing.module.ts';

export * from './models/some-model';
```

## Imports and paths

To avoid too many and too long import lines we can add a path in the `tsconfig.base.json` that points to our modules folder. Also, we can add a path to the environments.

A portion of the file

```
"paths": {
  "@environment": ["src/environments/environment"],
  "@modules/*": ["src/app/infrastructure/*", "src/app/modules/*"]
}
```
