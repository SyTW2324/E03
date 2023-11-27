import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { DeleteTextComponent } from './components/texts/delete-text/delete-text.component';
import { DetailTextComponent } from './components/texts/detail-text/detail-text.component';
import { EditTextComponent } from './components/texts/edit-text/edit-text.component';
import { NewTextComponent } from './components/texts/new-text/new-text.component';
import { TextsListComponent } from './components/texts/texts-list/texts-list.component';
import { DetailUserComponent } from './components/users/detail-user/detail-user.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';

const routes: Routes = [
  //Home
  { path: 'home', component: HomePageComponent },
  //Usuarios
  { path: 'users', component: UsersListComponent },
  { path: 'users/:id', component: DetailUserComponent },
  //Textos
  //Read
  { path: 'texts', component: TextsListComponent },
  //Create
  { path: 'texts/new', component: NewTextComponent },
  //Update
  { path: 'texts/edit/:id', component: EditTextComponent},
  //Delete
  { path: 'texts/delete/:id', component: DeleteTextComponent},
  //Read One
  { path: 'texts/:id', component: DetailTextComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
