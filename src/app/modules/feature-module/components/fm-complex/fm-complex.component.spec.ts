import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmComplexComponent } from './fm-complex.component';

describe('FmComplexComponent', () => {
  let component: FmComplexComponent;
  let fixture: ComponentFixture<FmComplexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FmComplexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmComplexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
