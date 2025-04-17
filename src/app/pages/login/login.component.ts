import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { UserRole } from '../../core/models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  name: string = '';
  role: UserRole = 'doctor';

  constructor(private auth: AuthService, private router: Router) {}

  selectRole(role: UserRole) {
    this.role = role;
  }

submit() {
  if (!this.name.trim()) return;

  this.auth.setUser({ name: this.name.trim(), role: this.role });
  this.router.navigate(['/consultation/room']);
}

}
