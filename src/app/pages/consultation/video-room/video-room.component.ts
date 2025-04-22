import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { SidebarComponent } from './../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

// This is a workaround to avoid TypeScript errors for the JitsiMeetExternalAPI
// since it is not defined in the TypeScript definitions.


declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-video-room',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './video-room.component.html',
  styleUrl: './video-room.component.css',
})
export class VideoRoomComponent {
  //  video room component to handle jitsi video call
  //  this component is used to handle jitsi video call
  //  it handles the jitsi video call and the user details
  //  it also handles the jitsi video call events
  //  it also handles the jitsi video call commands

  role: string | null = null;
  api: any;
  name: string = '';
  showConfirmModal = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    //  get user details from auth service
    //  set user details to role and name
    //  if user is not logged in, redirect to login page
    //  if user is logged in, set user details to role and name
    const user = this.authService.getUser();
    this.role = user?.role ?? 'patient';
    this.name = user?.name ?? 'Guest';
    this.initJitsi();
  }


  // jitsi payload is set up to handle jitsi video call
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

  // jitsi event listeners to handle audio, video and end session

  toggleAudio() {
    this.api.executeCommand('toggleAudio');
  }

  toggleVideo() {
    this.api.executeCommand('toggleVideo');
  }

  

  confirmEndSession() {
    this.showConfirmModal = true;
  }

  //  this method is used to handle the end session
  //  it shows a confirmation modal to the user
  //  if user confirms, it ends the session
  //  if user cancels, it closes the modal
  //  it also clears the user details from auth service
  //  it also redirects to the login page
  //  it also clears the local storage
  //  it also clears the user details from auth service

  cancelEndSession() {
    this.showConfirmModal = false;
  }

  confirmAndLeave() {
    // this.authService.clearRole();
    this.api?.executeCommand('hangup');
    this.router.navigate(['/']);
  }
}
