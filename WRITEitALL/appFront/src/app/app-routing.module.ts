import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailTextComponent } from './components/texts/detail-text/detail-text.component';
import { TextsListComponent } from './components/texts/texts-list/texts-list.component';
import { DetailUserComponent } from './components/users/detail-user/detail-user.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';

const routes: Routes = [
  { path: 'users', component: UsersListComponent },
  { path: 'users/:id', component: DetailUserComponent },
  { path: 'texts', component: TextsListComponent },
  { path: 'texts/:id', component: DetailTextComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
