import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerquejaComponent } from './verqueja.component';

describe('VerquejaComponent', () => {
  let component: VerquejaComponent;
  let fixture: ComponentFixture<VerquejaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerquejaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerquejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
