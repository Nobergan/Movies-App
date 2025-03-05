import { ChangeDetectionStrategy, Component, inject, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Store } from '@ngrx/store';
import texts from '@mm/texts';
import { ReversePipe } from '@mm/shared/pipes';
import { ButtonDirective } from '@mm/shared/ui/button';
import { SpinnerDirective } from '@mm/shared/ui/spinner';
import { MainState } from '@mm/shared/state';
import { AuthPopupType } from '@mm/auth/models';
import { LoginComponent, RegisterComponent } from '@mm/auth/components';

import { FilmComment } from '../../models';
import { FilmDetailsActions } from '../../store';

@Component({
    selector: 'mm-film-comments',
    imports: [CommonModule, ReactiveFormsModule, ButtonDirective, SpinnerDirective, ReversePipe, LoginComponent, RegisterComponent],
    templateUrl: './film-comments.component.html',
    styleUrl: './film-comments.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmCommentsComponent implements OnInit {
  id = input<number>();
  comments = input<FilmComment[]>();
  isLoading = input<boolean>();
  isLoggedIn = input<boolean>();
  isLoginPopupOpen = input<AuthPopupType>();
  isRegisterPopupOpen = input<AuthPopupType>();

  openLoginClicked = output<void>();
  openRegisterClicked = output<void>();

  form: FormGroup;
  isButtonDisabled: boolean = true;
  displayedCommentsCount: number = 3;
  commentsText = texts.filmDetails.comments;
  authPopupType = AuthPopupType;

  private _store = inject(Store<MainState>);
  private _fb = inject(FormBuilder);

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this._fb.group({
      comment: ['', [Validators.required, Validators.email]],
    });

    this.form.valueChanges.subscribe(() => {
      this.isButtonDisabled = !this.form.get('comment').value;
    });
  }

  addComment() {
    const comment = this.form.value;
    this._store.dispatch(
      FilmDetailsActions.addFilmComment({
        filmId: this.id(),
        comment,
      }),
    );

    this.form.reset();
  }

  showMoreComments() {
    this.displayedCommentsCount += 3;
  }
}
