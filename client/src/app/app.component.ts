import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loggedIn$: Observable<boolean>;
  loggedOut$: Observable<boolean>;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private auth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.loggedIn$ = this.auth.authState.pipe(map((user) => !!user));
    this.loggedOut$ = this.loggedIn$.pipe(map((loggedIn) => !loggedIn));
  }


  signIn() {
    this.dialog.open(SignInComponent);
  }

  async signOut() {
    await this.auth.signOut();
    await this.router.navigateByUrl('/');
  }
}
