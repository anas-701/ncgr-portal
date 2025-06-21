import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
countdownInterval: any;

startCountdown(targetDateStr: string) {
  const targetDate = new Date(targetDateStr).getTime();

  this.countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      clearInterval(this.countdownInterval);
      this.updateCountdownDisplay(0, 0, 0, 0);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    this.updateCountdownDisplay(days, hours, minutes, seconds);
  }, 1000);
}

updateCountdownDisplay(days: number, hours: number, minutes: number, seconds: number) {
  document.getElementById("cd-d")!.textContent = days.toString();
  document.getElementById("cd-h")!.textContent = hours.toString();
  document.getElementById("cd-m")!.textContent = minutes.toString();
  document.getElementById("cd-s")!.textContent = seconds.toString();
}
ngOnDestroy() {
  if (this.countdownInterval) {
    clearInterval(this.countdownInterval);
  }
}
ngOnInit() {
  // Example target date, replace with your actual date
  const targetDate = "2025-06-31T23:59:59";
  this.startCountdown(targetDate);
}
}
