import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { DetailUserComponent } from './components/users/detail-user/detail-user.component';
import { TextsListComponent } from './components/texts/texts-list/texts-list.component';
import { DetailTextComponent } from './components/texts/detail-text/detail-text.component';
import { NewTextComponent } from './components/texts/new-text/new-text.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditTextComponent } from './components/texts/edit-text/edit-text.component';
import { DeleteTextComponent } from './components/texts/delete-text/delete-text.component';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    DetailUserComponent,
    TextsListComponent,
    DetailTextComponent,
    NewTextComponent,
    EditTextComponent,
    DeleteTextComponent,
    HomePageComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
