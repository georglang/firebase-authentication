import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserModule } from './components/auth/users/user.module';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { AuthTokenHttpInterceptorProvider } from './components/auth/http-interceptors/auth-token.interceptor';
import { UsersComponent } from './components/auth/users/components/users/users.component';
import { UserFormComponent } from './components/auth/users/components/user-form/user-form.component';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { AuthService } from './services/auth/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './components/header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignInComponent,
    UsersComponent,
    UserFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatToolbarModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    UserModule,
  ],
  providers: [
    AuthTokenHttpInterceptorProvider,
    AuthService,
    LocalStorageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
