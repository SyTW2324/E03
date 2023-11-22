import { Component, inject, signal } from '@angular/core';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {

    arrUsers = signal<any[]>([]);
    usersService = inject(UsersService);

    async ngOnInit() {
      const users = await this.usersService.getAll();
      this.arrUsers.set(users);
    }
}
