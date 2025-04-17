import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import {SidebarComponent} from './../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

declare var JitsiMeetExternalAPI: any;


@Component({
  selector: 'app-video-room',
  standalone: true,
  imports: [CommonModule,SidebarComponent],
  templateUrl: './video-room.component.html',
  styleUrl: './video-room.component.css'
})
export class VideoRoomComponent {
  role: string | null = null;
  api: any;
  name: string = '';
  showConfirmModal = false;

  constructor(private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.authService.getUser();
    this.role = user?.role ?? 'patient';
    this.name = user?.name ?? 'Guest';
    this.initJitsi();
  }

  initJitsi() {
    const domain = 'meet.jit.si';
    const options = {
      // roomName: 'VideoConsultation_' + Date.now(),
      roomName: 'video_consultation_room_001',
      width: '100%',
      height: 500,
      parentNode: document.querySelector('#jitsi-container'),
      userInfo: {
        displayName: this.name?.toUpperCase(),
      },
      configOverwrite: {},
      interfaceConfigOverwrite: {},
    };

    this.api = new JitsiMeetExternalAPI(domain, options);

    this.api.addEventListener('videoConferenceJoined', () => {
      console.log(`${this.role} has joined the room.`);
    });
  }

  toggleAudio() {
    this.api.executeCommand('toggleAudio');
  }

  toggleVideo() {
    this.api.executeCommand('toggleVideo');
  }

  confirmEndSession() {
    this.showConfirmModal = true;
  }
  
  cancelEndSession() {
    this.showConfirmModal = false;
  }
  
  confirmAndLeave() {
    // this.authService.clearRole();
    this.api?.executeCommand('hangup');
    this.router.navigate(['/']);

  }


  
}
