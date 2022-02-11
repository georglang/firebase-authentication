import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { User } from './models/users';
import { UserService, UpdateUserRequest } from './services/user.service';
import { UserFormService } from './services/user-form.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  readonly snackBarDuration = 5000;
  users$: Observable<User[]>;
  user$: Observable<User>;

  dialogRef: MatDialogRef<UserFormComponent>;

  constructor(
    public auth: AngularFireAuth,
    private userService: UserService,
    private dialog: MatDialog,
    private userFormService: UserFormService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.users$ = this.userService.users$;
    this.user$ = this.auth.user.pipe(
      filter((user) => !!user),
      switchMap((user) => {
        debugger;
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
    dialogRef.afterClosed().subscribe((user: UpdateUserRequest) => {
      this.userService.edit(user).subscribe((data) => {
        console.log('Data', data);

        this.openSnackBar('User successfully updated');
        console.log('user edited');
      });
    });
    //catch ((err: Error) => { });
  }

  delete(userToDelete: User) {
    this.userService.delete(userToDelete)
      .subscribe((data) => {
        debugger;
      })
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: this.snackBarDuration,
    });
  }

  private createDialogConfig(): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '500px';
    return dialogConfig;
  }
}
