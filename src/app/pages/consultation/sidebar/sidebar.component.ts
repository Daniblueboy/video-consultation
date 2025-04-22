import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {

///  sidebar component to show user details and session time
  ///  this component is used in video room component
  ///  it shows the user name, role and session time
  ///  it also shows the status of the user
  
  @Input() role: string = '';
  @Input() name: string = '';

  sessionTime = signal('00:00');
  private startTime!: number;
  status = signal('In Consultation');

//  status is set to in consultation by default

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
