import { Component, OnDestroy, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-workshop-details-timer',
  imports: [],
  templateUrl: './workshop-details-timer.component.html',
  styleUrl: './workshop-details-timer.component.scss'
})
export class WorkshopDetailsTimerComponent implements OnInit, OnDestroy {
  @Input() targetDate!: string | Date;

  timeLeft: any = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  isExpired = false;
  private intervalId: any;

  ngOnInit() {
    this.startCountdown();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private startCountdown() {
    this.updateCountdown();
    
    this.intervalId = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  private updateCountdown() {
    const target = new Date(this.targetDate).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      this.isExpired = true;
      this.timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      return;
    }

    this.isExpired = false;
    
    // حساب الوقت المتبقي
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    this.timeLeft = {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }

}
