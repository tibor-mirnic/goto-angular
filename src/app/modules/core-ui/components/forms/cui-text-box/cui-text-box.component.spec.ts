import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuiTextBoxComponent } from './cui-text-box.component';

describe('CuiTextBoxComponent', () => {
  let component: CuiTextBoxComponent;
  let fixture: ComponentFixture<CuiTextBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuiTextBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuiTextBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
