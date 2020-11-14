import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCharacterPageComponent } from './selected-character-page.component';

describe('SelectedCharacterPageComponent', () => {
  let component: SelectedCharacterPageComponent;
  let fixture: ComponentFixture<SelectedCharacterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedCharacterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedCharacterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
