import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmFiltersComponent } from './film-filters.component';

describe('FilmFiltersComponent', () => {
  let component: FilmFiltersComponent;
  let fixture: ComponentFixture<FilmFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilmFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
