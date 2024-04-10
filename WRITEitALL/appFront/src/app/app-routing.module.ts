import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { DeleteTextComponent } from './components/texts/delete-text/delete-text.component';
import { DetailTextComponent } from './components/texts/detail-text/detail-text.component';
import { EditTextComponent } from './components/texts/edit-text/edit-text.component';
import { NewTextComponent } from './components/texts/new-text/new-text.component';
import { TextsListComponent } from './components/texts/texts-list/texts-list.component';
import { DetailUserComponent } from './components/users/detail-user/detail-user.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { loginGuard } from './guards/login.guard';

const routes: Routes = [
  //Home
  { path: 'home', component: HomePageComponent, canActivate: [loginGuard] },
  //Usuarios
  { path: 'users', component: UsersListComponent },
  { path: 'users/register', component: RegisterComponent},
  { path: 'users/login', component: LoginComponent},
  { path: 'users/:id', component: DetailUserComponent },
  //Textos
  //Read
  { path: 'texts', component: TextsListComponent, canActivate: [loginGuard] },
  //Read By User
  { path: 'texts/user/:token', component: TextsListComponent, canActivate: [loginGuard] },
  //Create
  { path: 'texts/new', component: NewTextComponent, canActivate: [loginGuard]},
  //Update
  { path: 'texts/edit/:id', component: EditTextComponent, canActivate: [loginGuard]},
  //Delete
  { path: 'texts/delete/:id', component: DeleteTextComponent, canActivate: [loginGuard]},
  //Read One
  { path: 'texts/:id', component: DetailTextComponent, canActivate: [loginGuard]},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
