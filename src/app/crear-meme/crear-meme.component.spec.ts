import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearMemeComponent } from './crear-meme.component';

describe('CrearMemeComponent', () => {
  let component: CrearMemeComponent;
  let fixture: ComponentFixture<CrearMemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearMemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearMemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
