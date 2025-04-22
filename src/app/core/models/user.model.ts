// user role model
// This model defines the user roles in the application.
// It is used to restrict access to certain routes and functionalities based on the user's role.
// It is also used to define the user object in the AuthService.
// The user object contains the user's name and role.
// The user object is stored in the local storage and is used to authenticate the user.
// The user object is also used to display the user's name in the UI.

export type UserRole = 'doctor' | 'patient';
