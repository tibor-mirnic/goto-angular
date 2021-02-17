## Components

Contains all components that belong to a module.

#### Prefix

Components that belong to a module should always have a prefix. Prefix is crated using the first letters of a module name. For `feature-module` components would start with `fm` prefix, for `shared` they would start with `s`.

#### Components with children

If a component has child components, those child component should reside under the parent component
```
  parent/
    child-one/
    child-two/
    parent.component.ts
```

#### Modals

If a component operates with modals, modals should be created as a separate child components component. Also, modals should have a `modal` sufix in both their file and `class` name. Modals should not be a part of a template and should be instatiated via modal service.

## imports

The order of your imports should be `angular`, then external libraries, then from the application and finally from the `module`

```
import { OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { SharedService } from '@module/shared';

import { FeatureModuleService } from './services/feature-module.service';
```

## Component decorator

All components should be defined with `OnPush` change detection and `None` view encapsulation.

```
@Component({
  selector: 'fm-simple',
  templateUrl: './fm-simple.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FmSimpleComponent {
  ...
}
```

## ChangeDetectorRef

Use `markForCheck` to detect changes up the component tree.
Use `detectChanges` to detect changes on the caller and down the component tree.

## Fields

All field initialization should be in the component `constructor`. However, there a few exceptions, one is for various subscriptions that should be subscribed in `ngOnInit` lifecycle method and the other is when we are using `@HostBinding` to apply `class` or some `attrs`.

By default fields are `public` so you can ommit the keyword.

Private fields should always have a `_` prefix. Fields, getters, setters, method order should be defined like this

```
export class ExampleComponent implements OnInit, OnDestroy {

  // Private Getters, Setters and fields should always be defined at the top of the file
  @HostBinding('class.cui-widget')
  private _isWidget = true;
  
  @HostBinding('class.flex-widget')
  private get _isFlexWidget(): boolean {
    return !this._isWidget;
  }

  private _privateField: string;

  publicField: number;

  get privateField(): string {
    return this._privateField;
  }

  constructor() {
    this._privateField = 'private';
    this.publicField = 12;
  }

  // Component Lifecycle and internal methods
  ngOnInit(): void {
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {}

  onButtonClick() {}

  ngOnDestroy() {}

  // Private methods should always be defined at the bottom of the file
  private privateMethod(): boolean {
    return true;
  }

}
```

## Constructor

First import `private` and then `public` dependencies in the constructor. Order of the dependencies should be `angular`, then external libraries, then application libraries and finally from the module. Each dependency should be defined in new line
```
constructor(
  private _changeDetectorRef: ChangeDetectorRef,
  private _elementRef: ElementRef,
  private _externalService: ExternalLibraryService,
  private _otherModuleService: OtherModuleService,
  private _serviceOne: ServiceOne,
  private _serviceTwo: ServiceTwo
) {
  this._somePrivateField = null;
}
```

## Events

We can define different types of events, from template, from `EventEmitter` and so on.

#### Template

Events declared in the template should have `on` prefix.

```
<button type="button"
  (click)="onButtonClicked()">
  Click Me!
</button>

<some-cmp (didSaveForm)="onFormSaved($event)">
</some-cmp>
```

#### Outputs

Generaly there are two types of outputs that are emitted from a component

- Events fired after some component logic. These events have `did` prefix.
- Events that invoke some logic. These events have `do` prefix.

```
@Output didSaveForm: EventEmitter<void>; // Form saved in the components
@Output doSaveForm: EventEmitter<IForm>; // Form model published to subscriber
```

## Subscriptions

Always define subscriptions in `ngOnit`.

To avoid declaring a field for every subscription just create an array of `Subscription` and in `ngOnDestroy` unsubscribe by looping trough the array.

```
private _subscriptions: Subscription[];

ngOnInit() {
  this._subscriptions = [
    this._observable.subscribe()
  ];
}

ngOnDestroy() {
  this._subscriptions.forEach(a => a.unsubscribe());
}
```

## HTML template

Attributes on `DOM` and `component` elements should always be set in new line. Order of the logical parts applied to an element should be `angular structural directives` then `native element attributes` or `component inputs` then `directives` with their inputs and outputs and finnaly `events`

```
<button *ngIf="true"
  type="button"
  class="onsa-button">
  Click Me!
<button/>

<div class="flex flex-row"
  someDirective
  [someDirectiveInput]="input"
  (someDirectiveEvent)="onEvent($event)">
</div>

<my-component [user]="user"
  (didSave)="onSave()">
</my-component>
```

## Styles

Component `*.scss` files are located in `module/scss/components` folder. All component should always have a `class` set on the `root` element. We apply the styles to the `root` element using `@HostBinding()` attribute. Name of the component class should be the same as the name of the component selector.

```
export class SimplePanelComponent {
 ...
 @HostBinding('class.simple-panel')
 private _baseClass = true;
 ...
}
export class ComplexPanelComponent {
 ...
 // If you need to set multiple classes on a root element
 @HostBinding('class')
 private _baseClass = 'complex-panel cui-widget flex-box';
 ...
}

```

## eslint

As of Angular 11 `tslint` is deprecated in favor of `eslint`.

You can either update current project or create new with `eslint` configuration. More details can be found [here](https://github.com/angular-eslint/angular-eslint).

Add every component prefix to both `@angular-eslint/component-selector` and `@angular-eslint/directive-selector`
```
"@angular-eslint/component-selector": [
  "error",
  {
    "type": "element",
    "prefix": [
      "app",
      "fm",
      "cui"
    ],
    "style": "kebab-case"
  }
]

"@angular-eslint/directive-selector": [
  "error",
  {
    "type": "attribute",
    "prefix": [
      "app",
      "fm",
      "cui"
    ],
    "style": "camelCase"
  }
]
```

Add this configuration to monitor order of class members
```
"@typescript-eslint/member-ordering": [
  "error",
  {
    "default": [
      "private-static-field",
      "private-decorated-field",
      "private-instance-field",
      "private-abstract-field",

      "protected-static-field",
      "protected-decorated-field",
      "protected-instance-field",
      "protected-abstract-field",
      "protected-field",

      "public-static-field",
      "public-decorated-field",
      "public-instance-field",
      "public-abstract-field",

      "public-constructor",
      
      "public-static-method",
      "public-decorated-method",
      "public-instance-method",
      "public-abstract-method",

      "protected-static-method",
      "protected-decorated-method",
      "protected-instance-method",
      "protected-abstract-method",

      "private-static-method",
      "private-decorated-method",
      "private-instance-method",
      "private-abstract-method"
    ]
  }
]
```

Add `enumMember` override to `@typescript-eslint/naming-convention` to enable `UPPER_CASE` enum memebers.
```
"@typescript-eslint/naming-convention": [
  "error",
  {
    "selector": "enumMember",
    "format": ["UPPER_CASE"]
  }
]
```

To require `_` for private fields add
```
{
  "selector": "memberLike",
  "modifiers": ["private"],
  "format": ["camelCase"],
  "leadingUnderscore": "require"
},
{
  "selector": "method",
  "modifiers": ["private"],
  "format": ["camelCase"],
  "leadingUnderscore": "forbid"
}
```


Add `allowAfterThis` override to `no-underscore-dangle` to 
enable `_` in member names.
```
"no-underscore-dangle": [
  "error",
  {
    "allowAfterThis": true
  }
]
```

To prevent `no-shadow` bug add
```
"no-shadow": "off",
"@typescript-eslint/no-shadow": ["error"]
```

To allow `no-unused-expressions` add
```
"no-unused-expressions": "off",
"@typescript-eslint/no-unused-expressions": [
  "error",
  {
    "allowShortCircuit": true,
    "allowTernary": true
  }
]
```