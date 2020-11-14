import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavsPageComponent } from './favs-page.component';

describe('FavsPageComponent', () => {
  let component: FavsPageComponent;
  let fixture: ComponentFixture<FavsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
