import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitPrensaComponent } from './kit-prensa.component';

describe('KitPrensaComponent', () => {
  let component: KitPrensaComponent;
  let fixture: ComponentFixture<KitPrensaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KitPrensaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KitPrensaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
