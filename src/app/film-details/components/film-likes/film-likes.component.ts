import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { IconComponent } from '@mm/shared/ui/icon';

import { AddVotes } from '../../models';

@Component({
    selector: 'mm-film-votes',
    templateUrl: './film-likes.component.html',
    styleUrl: './film-likes.component.scss',
    imports: [IconComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmLikesComponent {
  id = input<number>();
  likes = input<number>();
  dislikes = input<number>();
  isLiked = input<boolean>();
  isDisliked = input<boolean>();

  clickedAddVotes = output<AddVotes>();

  vote: AddVotes;

  addLike(): void {
    if (!this.isLiked()) {
      this.vote = {
        likes: this.likes() + 1,
        dislikes: this.dislikes() && this.isDisliked() ? this.dislikes() - 1 : this.dislikes(),
        isLiked: true,
        isDisliked: false,
      };
      this.clickedAddVotes.emit(this.vote);
    }
  }

  addDislike(): void {
    if (!this.isDisliked()) {
      this.vote = {
        dislikes: this.dislikes() + 1,
        likes: this.likes() && this.isLiked() ? this.likes() - 1 : this.likes(),
        isLiked: false,
        isDisliked: true,
      };
      this.clickedAddVotes.emit(this.vote);
    }
  }
}
