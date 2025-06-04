import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-shared-rate',
  imports: [],
  templateUrl: './shared-rate.component.html',
  styleUrl: './shared-rate.component.scss'
})
export class SharedRateComponent {
  @Input() rating: number = 0;
  @Input() maxStars: number = 5;
  @Input() readonly: boolean = false;
  @Output() ratingChange = new EventEmitter<number>();

  hoverRating: number = 0;

  onStarClick(starIndex: number): void {
    if (!this.readonly) {
      this.rating = starIndex;
      this.ratingChange.emit(this.rating);
    }
  }

  onStarHover(starIndex: number): void {
    if (!this.readonly) {
      this.hoverRating = starIndex;
    }
  }

  onMouseLeave(): void {
    this.hoverRating = 0;
  }

  isStarFilled(index: number): boolean {
    return index <= (this.hoverRating || this.rating);
  }

  getStarsArray(): number[] {
    return Array.from({ length: this.maxStars }, (_, i) => i + 1);
  }

  resetRating(): void {
    if (!this.readonly) {
      this.rating = 0;
      this.ratingChange.emit(this.rating);
    }
  }
}
