import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { User } from '../../models/users';
import { UserService, UpdateUserRequest } from '../../services/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserFormService } from '../../services/user-form.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  user$: Observable<User>;

  // constructor(auth: AngularFireAuth) {}
  dialogRef: MatDialogRef<UserFormComponent>;

  constructor(
    public auth: AngularFireAuth,
    private userService: UserService,
    private dialog: MatDialog,
    private userFormService: UserFormService
  ) {}

  ngOnInit() {
    this.users$ = this.userService.users$;
    this.user$ = this.auth.user.pipe(
      filter((user) => !!user),
      switchMap((user) => {
        return this.userService.user$(user?.uid as string);
      })
    );
  }

  create() {
    this.userFormService.create();
    this.dialogRef = this.dialog.open(UserFormComponent);

    this.dialogRef.afterClosed().subscribe((user) => {
      debugger;
      this.userService.create(user).subscribe((_) => {
        console.log('user created');
      });
    });
    // .catch((err) => {});
  }

  edit(userToEdit: User) {
    this.userFormService.edit(userToEdit);
    const dialogRef = this.dialog.open(UserFormComponent);
    // once user form pop up is closed, we get the value as a result
    dialogRef.afterClosed().subscribe((user: UpdateUserRequest) => {
      debugger;
      this.userService.edit(user).subscribe((_) => {
        console.log('user edited');
      });
    });
    // .catch((err: Error) => {});
  }
}
