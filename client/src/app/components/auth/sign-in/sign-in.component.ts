import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  @Input() error: string | null;

  signInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  hide = true;

  constructor(public dialog: MatDialog, private authService: AuthService) {}

  get emailInput() {
    return this.signInForm.get('email');
  }

  get passwordInput() {
    return this.signInForm.get('password');
  }

  submit() {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      this.authService.signIn(email, password);
    }
  }

  ngOnInit() {}

  dismiss() {
    this.dialog.closeAll();
  }
}
