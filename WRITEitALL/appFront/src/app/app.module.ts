import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { DetailUserComponent } from './components/users/detail-user/detail-user.component';
import { TextsListComponent } from './components/texts/texts-list/texts-list.component';
import { DetailTextComponent } from './components/texts/detail-text/detail-text.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    DetailUserComponent,
    TextsListComponent,
    DetailTextComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
