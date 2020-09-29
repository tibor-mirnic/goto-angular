import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreUIModule } from '@modules/core-ui';

import { FmComplexComponent } from './fm-complex.component';

describe('FmComplexComponent', () => {
  let component: FmComplexComponent;
  let fixture: ComponentFixture<FmComplexComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoreUIModule],
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
