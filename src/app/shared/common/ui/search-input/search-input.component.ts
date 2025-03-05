import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

import { debounceTime, Subject } from 'rxjs';

import { ButtonDirective } from '../button';

@Component({
    selector: 'ui-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgIf, FormsModule, ButtonDirective]
})
export class SearchInputComponent implements OnInit {
  @Input() searchTerm: string = '';
  @Input() placeholder = '';
  @Input() hasSearchButton = false;

  @Output() inputedSearchFilms = new EventEmitter<string>();

  private searchTermSubject = new Subject<string>();
  private _destroyRef = inject(DestroyRef);

  ngOnInit() {
    if (!this.hasSearchButton) {
      this.searchTermSubject.pipe(debounceTime(300), takeUntilDestroyed(this._destroyRef)).subscribe(searchTerm => {
        if (this.searchTerm.length >= 3) {
          this.inputedSearchFilms.emit(searchTerm);
        }
      });
    }
  }

  onSearchTermsChange(): void {
    if (!this.hasSearchButton) {
      this.searchTermSubject.next(this.searchTerm);
    }
  }

  onButtonClick(): void {
    if (this.searchTerm.length > 3) {
      this.inputedSearchFilms.emit(this.searchTerm);
    }
  }
}
