import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailUserComponent } from './components/users/detail-user/detail-user.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';

const routes: Routes = [
  { path: 'users', component: UsersListComponent },
  { path: 'users/:id', component: DetailUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
