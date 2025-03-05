import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTvComponent } from './search-tv.component';

describe('SearchTvComponent', () => {
  let component: SearchTvComponent;
  let fixture: ComponentFixture<SearchTvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchTvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
