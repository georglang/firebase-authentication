import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from '../users/services/user.service';
import { UserFormService } from '../users/services/user-form.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  userForm = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl(''),
    displayName: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl(''),
  });
  title$: Observable<string>;
  user$: Observable<{}>;

  constructor(
    private matDialog: MatDialog,
    private dialogRef: MatDialogRef<UserFormComponent>,
    private userService: UserService,
    private userFormService: UserFormService
  ) {}

  ngOnInit() {
    this.title$ = this.userFormService.title$;
    this.user$ = this.userFormService.user$.pipe(
      tap((user) => {
        if (user) {
          debugger;
          this.userForm.patchValue(user);
        } else {
          this.userForm.reset({});
        }
      })
    );
  }

  dismiss() {
    this.matDialog.closeAll();
  }

  save() {
    debugger;
    const { displayName, email, role, password, uid } = this.userForm.value;
    this.dialogRef.close({ displayName, email, role, password, uid });
  }
}
