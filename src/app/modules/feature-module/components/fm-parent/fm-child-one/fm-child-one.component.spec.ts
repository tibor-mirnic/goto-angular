import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmChildOneComponent } from './fm-child-one.component';

describe('FmChildOneComponent', () => {
  let component: FmChildOneComponent;
  let fixture: ComponentFixture<FmChildOneComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FmChildOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmChildOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
