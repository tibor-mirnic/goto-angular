import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmChildTwoComponent } from './fm-child-two.component';

describe('FmChildTwoComponent', () => {
  let component: FmChildTwoComponent;
  let fixture: ComponentFixture<FmChildTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FmChildTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmChildTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
