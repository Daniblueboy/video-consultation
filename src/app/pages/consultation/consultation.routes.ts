import { Routes } from '@angular/router';
import { VideoRoomComponent } from './video-room/video-room.component';
import { authGuard } from '../../core/guards/auth.guard';

export const routes: Routes = [
  { path: 'room', component: VideoRoomComponent,canActivate: [authGuard], },
];