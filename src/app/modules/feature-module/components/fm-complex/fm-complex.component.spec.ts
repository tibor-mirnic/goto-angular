import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CoreUIModule } from '@modules/core-ui';

import { FmComplexComponent } from './fm-complex.component';
import { FEATURE_MODULE_API_URL } from '../../models/tokens';

describe('FmComplexComponent', () => {
  let component: FmComplexComponent;
  let fixture: ComponentFixture<FmComplexComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoreUIModule, HttpClientTestingModule],
      declarations: [ FmComplexComponent ],
      providers: [{
        provide: FEATURE_MODULE_API_URL,
        useValue: 'feature-module-api-url'
      }]
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
