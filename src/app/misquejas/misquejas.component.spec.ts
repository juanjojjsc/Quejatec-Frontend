import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisquejasComponent } from './misquejas.component';

describe('MisquejasComponent', () => {
  let component: MisquejasComponent;
  let fixture: ComponentFixture<MisquejasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisquejasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisquejasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
