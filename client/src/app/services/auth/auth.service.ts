import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../components/auth/users/models/users';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSource = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSource.asObservable();

  userData: User;

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userData = user as User;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') as string);
        this.router.navigate(['']);
        this.changeIsAuthenticated(true);
      } else {
        localStorage.setItem('user', '');
        JSON.parse(localStorage.getItem('user') as string);
        this.changeIsAuthenticated(false);
      }
    });
  }

  async signIn(email: string, password: string) {
    try {
      console.log(email);
      await this.auth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['']);
    } catch (err) {
      console.log(err);
    }
  }

  async signOut(): Promise<void> {
    await this.auth.signOut();
    await this.router.navigate(['sign-in']);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') as string);
    return user !== null ? true : false;
  }

  changeIsAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticatedSource.next(isAuthenticated);
  }
}
