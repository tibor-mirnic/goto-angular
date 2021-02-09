import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, forwardRef, Input, Output,
  EventEmitter, ChangeDetectorRef, Injector, Optional, HostBinding, NgZone, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, NgControl, NgForm,
  FormGroupDirective, AbstractControl, ValidationErrors } from '@angular/forms';

import { safeDetectChanges } from './../../../util/angular';
import { IRunOutsideAngularEvent } from './../../../models/run-outside-angular-event';

export type TextBoxInputType = 'text' | 'password';

@Component({
  selector: 'cui-text-box',
  templateUrl: './cui-text-box.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CuiTextBoxComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => CuiTextBoxComponent),
    multi: true
  }]
})
export class CuiTextBoxComponent implements ControlValueAccessor, Validator, OnInit {

  @HostBinding('class.cui-text-box')
  private _baseClass = true;

  @HostBinding('class.cui-text-box--invalid')
  private get _isInvalid(): boolean {
    return !this.disabled && !this.readonly && this._invalid;
  }

  private _tabIndex: number;
  private _innerValue: string;

  private _focused: boolean;
  private _suppressBlur: boolean;

  private _control: NgControl;
  private _onValueChange: (value: any) => void;
  private _onControlTouched: () => void;
  private _onValidatorChange: () => void;

  private get _invalid(): boolean {
    const isInvalid = this._control && this._control.invalid;
    const isSubmitted = (this._parentFormGroup && this._parentFormGroup.submitted) || (this._parentForm && this._parentForm.submitted);

    return !!(isInvalid && (this._touched || isSubmitted));
  }

  private get _touched(): boolean {
    return this._control && this._control.touched;
  }

  @ViewChild('inputField') inputField: ElementRef<HTMLElement>;

  @Input() name: string;
  @Input() type: TextBoxInputType;
  @Input() placeholder: string;

  @Input() disabled: boolean;
  @Input() readonly: boolean;

  @Output() didBlur: EventEmitter<void>;
  @Output() didFocus: EventEmitter<void>;
  @Output() didKeyDownEnter: EventEmitter<void>;
  @Output() didClear: EventEmitter<void>;

  @Input()
  set tabIndex(value: number) {
    this._tabIndex = value;
  }

  get tabIndex(): number {
    return this.disabled || this.readonly ? -1 : this._tabIndex;
  }

  get innerValue(): string {
    return this._innerValue;
  }

  set innerValue(value: string) {
    this._innerValue = value;

    this.touchControl();

    this._onValueChange(this._innerValue);
  }

  @HostBinding('class.cui-text-box--clearable')
  get clearVisible(): boolean {
    return this.innerValue && !this.readonly && !this.disabled;
  }

  inputEvents: IRunOutsideAngularEvent[];
  clearEvents: IRunOutsideAngularEvent[];

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _injector: Injector,
    private _ngZone: NgZone,
    @Optional() private _parentForm: NgForm,
    @Optional() private _parentFormGroup: FormGroupDirective
  ) {
    this._focused = false;
    this._suppressBlur = false;

    this.name = `cui-text-box-${Math.random() * 1000}`;
    this.type = 'text';
    this.placeholder = '';

    this.disabled = false;
    this.readonly = false;
    this.tabIndex = 0;

    this.didBlur = new EventEmitter();
    this.didFocus = new EventEmitter();
    this.didClear = new EventEmitter();
    this.didKeyDownEnter = new EventEmitter();

    this._onValueChange = (value: any) => {};
    this._onControlTouched = () => {};
    this._onValidatorChange = () => {};

    this.inputEvents = [{
      name: 'focus',
      callback: this.onFocus.bind(this)
    }, {
      name: 'blur',
      callback: this.onBlur.bind(this)
    }, {
      name: 'keydown',
      callback: this.onKeyDown.bind(this)
    }];

    this.clearEvents = [{
      name: 'click',
      callback: this.onClear.bind(this)
    }];
  }

  ngOnInit(): void {
    this._control = this._injector.get<NgControl>(NgControl, null);

    if (this._control) {
      this._control.valueAccessor = this;
    }
  }

  // ControlValueAccessor START
  writeValue(value: string): void {
    // trim white space
    if (value) {
      value = value.toString().trim();
    }

    this._innerValue = value;

    safeDetectChanges(this._changeDetectorRef);
  }

  registerOnChange(fn: any): void {
    this._onValueChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onControlTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._changeDetectorRef.detectChanges();
  }
  // ControlValueAccessor END

  // Validator START
  validate(c: AbstractControl): ValidationErrors | null {
    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this._onValidatorChange = fn;
  }
  // Validator END

  private touchControl(): void {
    if (!this._touched && !this.disabled && !this.readonly) {
      this._onControlTouched();
    }
  }

  private onFocus(): void {
    if (!this.disabled && !this.readonly) {
      this._focused = true;
      this._ngZone.run(() => this.didFocus.next());
    }
  }

  private onBlur(): void {
    if (!this.disabled && !this.readonly && !this._suppressBlur) {
      this._focused = false;
      this._ngZone.run(() => {
        this._onControlTouched();
        this.didBlur.next();
      });
    }
    else {
      this._suppressBlur = false;
    }
  }

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

  private onClear(): void {
    if (!this.disabled && !this.readonly) {
      this.innerValue = null;

      this._ngZone.run(() => {
        safeDetectChanges(this._changeDetectorRef);

        this.didClear.next();
      });
    }
  }
}
