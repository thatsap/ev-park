import { makeAutoObservable } from 'mobx';

interface User {
  fullName: string;
  email: string;
  password: string;
}

export class AuthManager {
  private _email: string = '';
  private _password: string = '';
  private _fullName: string = '';
  private _isLogin: boolean = true;
  private _isAuthenticated: boolean = false;
  private users: User[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadUsers();
    this.checkSession();
  }

  // Load users from localStorage or fallback to default
  loadUsers() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    } else {
      this.users = [
        {
          fullName: 'John Doe',
          email: 'default@example.com',
          password: 'defaultPassword',
        },
      ];
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  // Save users to localStorage
  saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  setEmail(email: string) {
    this._email = email;
  }

  setPassword(password: string) {
    this._password = password;
  }

  setFullName(fullName: string) {
    this._fullName = fullName;
  }

  // Use an arrow function to correctly bind 'this'
  toggleForm = () => {
    this._isLogin = !this._isLogin;
    this.clearForm();
  };

  clearForm() {
    this._email = '';
    this._password = '';
    this._fullName = '';
  }

  get isAuthenticated() {
    return this._isAuthenticated;
  }

  get isLogin() {
    return this._isLogin;
  }

  get fullName() {
    return this._fullName;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  // User Login
  login() {
    const user = this.users.find(
      (u) => u.email === this._email && u.password === this._password,
    );
    if (user) {
      this._isAuthenticated = true;
      this.setSession();
      this.clearForm();
      return true;
    }
    return false;
  }

  // User Signup
  signup() {
    const userExists = this.users.some((u) => u.email === this._email);
    if (userExists) {
      return false;
    }

    const newUser: User = {
      fullName: this._fullName,
      email: this._email,
      password: this._password,
    };
    this.users.push(newUser);
    this.saveUsers();
    this._isAuthenticated = true;
    this.setSession();
    this.clearForm();
    return true;
  }

  logout() {
    this._isAuthenticated = false;
    this.clearSession();
  }

  // Session Management
  private setSession() {
    localStorage.setItem('auth', 'true');
  }

  private clearSession() {
    localStorage.removeItem('auth');
  }

  private checkSession() {
    if (localStorage.getItem('auth') === 'true') {
      this._isAuthenticated = true;
    }
  }
}
