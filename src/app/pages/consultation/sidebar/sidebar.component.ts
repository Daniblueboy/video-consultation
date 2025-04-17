import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() role: string = '';
  @Input() name: string = '';

  sessionTime = signal('00:00');
  private startTime!: number;
  status = signal('In Consultation');

  ngOnInit() {
    this.startTime = Date.now();

    setInterval(() => {
      const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
      const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
      const seconds = String(elapsed % 60).padStart(2, '0');
      this.sessionTime.set(`${minutes}:${seconds}`);
    }, 1000);
  }

}
