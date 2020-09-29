import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmParentComponent } from './fm-parent.component';

describe('FmParentComponent', () => {
  let component: FmParentComponent;
  let fixture: ComponentFixture<FmParentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FmParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
