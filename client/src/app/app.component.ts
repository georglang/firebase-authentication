import { Auth, authState } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit() {}

  signIn() {
    this.dialog.open(SignInComponent);
  }

  async signOut() {
    // await this.afAuth.signOut();
    await this.router.navigateByUrl('/');
  }
}
