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

  // This service is responsible for managing the authentication state of the user.
  // It provides methods to set, get, and clear the user object.
  // The user object contains the user's name and role.
  // The user object is stored in the local storage and is used to authenticate the user.
  // The user object is also used to display the user's name in the UI.
  // The user object is also used to restrict access to certain routes and functionalities based on the user's role.
  // The user object is also used to define the user object in the AuthService.
  setUser(user: User) {
    this._user.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  // This method returns the user object from the local storage.
  // If the user object is not found in the local storage, it returns null.
  // The user object is used to authenticate the user.
  // The user object is also used to display the user's name in the UI.
  // The user object is also used to restrict access to certain routes and functionalities based on the user's role.
  // The user object is also used to define the user object in the AuthService.

  getUser(): User | null {
    return this._user() ?? JSON.parse(localStorage.getItem('user') || 'null');
  }

  // This method clears the user object from the local storage and sets the user object to null.  

  clearUser() {
    this._user.set(null);
    localStorage.removeItem('user');
  }
}
