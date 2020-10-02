## Control Value Accessor

If you want to use your custom component with `ngModel` directive then you need to implement `ControlValueAccessor` and `Validator` interfaces.

As already mentioned in the `Components` your component should have `OnPush` change detection and `None` view encapsulation.

#### ControlValueAccessor

You need to provide `NG_VALUE_ACCESSOR` token
```
providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CuiTextBoxComponent),
    multi: true
  }
  ...
]
```

and you need to implemenet these methods
```
writeValue(value: string): void { ... }

registerOnChange(fn: any): void { ... }

registerOnTouched(fn: any): void { ... }

setDisabledState?(isDisabled: boolean): void { ... }
```

#### Validator

You need to provide `NG_VALIDATORS` token
```
providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => CuiTextBoxComponent),
    multi: true
  }
  ...
]
```

and you need to implement theese methods
```
validate(c: AbstractControl): ValidationErrors | null { ... }

registerOnValidatorChange(fn: () => void): void { ... }
```

#### Constructor

You need to import these services
```
constructor(
  private _changeDetectorRef: ChangeDetectorRef,
  private _injector: Injector,
  private _ngZone: NgZone,
  @Optional() private parentForm: NgForm,
  @Optional() private parentFormGroup: FormGroupDirective
) { ... }
```

We are providing `Injector` to be able to inject `NgControl`. Reson for this is because `NgControl` is not available for injection until `Onit` lifecycle method.

```
ngOnInit(): void {
  this._control = this._injector.get<NgControl>(NgControl, null);

  if (this._control) {
    this._control.valueAccessor = this;
  }
}
```

#### Change Detection

Event though we have set change detection to `OnPush`, which is sort of manual, angular still marks component for detection when
- @Inputs() have changed
- Any User invoked action from template, click, scroll etc...
- Manual invokation of `markForCheck` or `detectChanges` methods

When you call `markForCheck` angular will then go up the component tree and mark all of them for detection, most of the time you do not need this. Good thing here is that this is a `safe` method, meaning it will not throw an error if the component was destroyed while the change detection is in process.

When you call `detectChanges` angull will then mark component itself and go down the three and mark children. If a component is destroyed while detection cycle is in progress you will get an error. To avoid this you need a safeguard
```
export const safeDetectChanges = (cDR: ChangeDetectorRef): void => {
  const vr = cDR as ViewRef;

  if (!vr.destroyed) {
    vr.detectChanges();
  }
};
```

To achive best performance is to work in `detached` mode, but then you lose all the angular goodies. So to have best of both worlds is to use `NgZone` and `runOutsideAngular`.

All the work inside of the `runOutsideAngular` method will not trigger change detection. And if you wish to trigger change detection you use `run` method.

With a simple directive you can pass an config to listen to different events

```
this.inputEvents = [{
  name: 'keydown',
  callback: this.onKeyDown.bind(this)
}];

// Methods
private onKeyDown(event: KeyboardEvent): void {
  if (event.key === 'Enter' && !this.disabled && !this.readonly) {
    this._suppressBlur = true;

    this.inputField.nativeElement.blur();

    this._ngZone.run(() => {
      this._onControlTouched();
      this.didKeyDownEnter.next();
    });
  }
}
```

