import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { UserFormService } from '../../services/user-form.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl(''),
    displayName: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl(''),
  });
  title$: Observable<string>;
  user$: Observable<{}>;

  constructor(
    private dialogRef: MatDialogRef<UserFormComponent>,
    private userService: UserService,
    private userForm: UserFormService
  ) {}

  ngOnInit() {
    this.title$ = this.userForm.title$;
    this.user$ = this.userForm.user$.pipe(
      tap((user) => {
        if (user) {
          this.form.patchValue(user);
        } else {
          this.form.reset({});
        }
      })
    );
  }

  dismiss() {
    this.dialogRef.close();
  }

  save() {
    const { displayName, email, role, password, uid } = this.form.value;
    this.dialogRef.close({ displayName, email, role, password, uid });
  }
}
