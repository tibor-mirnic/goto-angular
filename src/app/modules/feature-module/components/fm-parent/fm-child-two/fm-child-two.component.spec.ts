import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmChildTwoComponent } from './fm-child-two.component';
import { FmParentContext } from '../fm-parent.context';

describe('FmChildTwoComponent', () => {
  let component: FmChildTwoComponent;
  let fixture: ComponentFixture<FmChildTwoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FmChildTwoComponent ],
      providers: [FmParentContext]
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
