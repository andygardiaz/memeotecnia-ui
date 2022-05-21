import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionAFuncionamientoComponent } from './section-a-funcionamiento.component';

describe('SectionAFuncionamientoComponent', () => {
  let component: SectionAFuncionamientoComponent;
  let fixture: ComponentFixture<SectionAFuncionamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionAFuncionamientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionAFuncionamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
