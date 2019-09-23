import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormativaComponent } from './normativa.component';

describe('NormativaComponent', () => {
  let component: NormativaComponent;
  let fixture: ComponentFixture<NormativaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormativaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
