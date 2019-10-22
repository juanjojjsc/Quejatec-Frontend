import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaquejaComponent } from './nuevaqueja.component';

describe('NuevaquejaComponent', () => {
  let component: NuevaquejaComponent;
  let fixture: ComponentFixture<NuevaquejaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaquejaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaquejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
