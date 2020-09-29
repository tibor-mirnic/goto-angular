import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmSimpleComponent } from './fm-simple.component';

describe('FmSimpleComponent', () => {
  let component: FmSimpleComponent;
  let fixture: ComponentFixture<FmSimpleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FmSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
