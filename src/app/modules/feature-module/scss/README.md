## Styles

Contains all styles that belogn to a module.

## Structure
```
feature-module/
  scss/
    components/
      fm-panel/
        _fm-panel.components.scss
        _fm-panel-child.component.scss
      _fm-simple.components.scss
    _index.ts
```
Folder structure should be the same as one with the components.

## Sass

All style files should have a `_` prefix. This is a `sass` feature that treats those files as `partials`.

With [@use](https://sass-lang.com/documentation/at-rules/use) which is a new `sass` feature for loading modules, we can now safely declare variables inside the module.

Private variables, functions and mixins are declared by adding `-` or `_` as a name prefix.

To support theming, each file, which is a module itself, should be defined as a `@mixin`.

`scss/components/_fm-simple.component.scss`

```
@mixin -fm-simple($background-color) {
  .fm-simple {
    background-color: $background-color;
  }
}
```

## _index.scss

In here we declare everything that is public for this module. Every `_index.scss` file should have a `load` mixin.

```
@import "components/fm-simple.component";

@mixin load(
  $background-color: red,
  $border-color: yellow
) {
  @include -fm-simple($background-color: $background-color);
}
```