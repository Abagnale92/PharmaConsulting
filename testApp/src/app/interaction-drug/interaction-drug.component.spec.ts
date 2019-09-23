import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionDrugComponent } from './interaction-drug.component';

describe('InteractionDrugComponent', () => {
  let component: InteractionDrugComponent;
  let fixture: ComponentFixture<InteractionDrugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractionDrugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractionDrugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
