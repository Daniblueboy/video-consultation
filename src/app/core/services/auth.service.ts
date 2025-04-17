import { Injectable, signal } from '@angular/core';
import { UserRole } from '../models/user.model';

export interface User {
  role: UserRole;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user = signal<User | null>(null);

  setUser(user: User) {
    this._user.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User | null {
    return this._user() ?? JSON.parse(localStorage.getItem('user') || 'null');
  }

  clearUser() {
    this._user.set(null);
    localStorage.removeItem('user');
  }
}
