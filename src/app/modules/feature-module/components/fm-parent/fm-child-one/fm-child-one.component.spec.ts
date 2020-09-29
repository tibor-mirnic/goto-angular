import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionsService } from '@modules/core-ui';

import { FmChildOneComponent } from './fm-child-one.component';
import { FmParentContext } from '../fm-parent.context';

describe('FmChildOneComponent', () => {
  let component: FmChildOneComponent;
  let fixture: ComponentFixture<FmChildOneComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FmChildOneComponent ],
      providers: [FmParentContext, SubscriptionsService]
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
